/* eslint-disable @typescript-eslint/no-explicit-any */
let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    await loadScript("https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js");
    const win = window as any;
    pyodideInstance = await win.loadPyodide();
    return pyodideInstance;
  })();

  return pyodideLoading;
}

export interface RunResult {
  stdout: string;
  stderr: string;
}

// Runner script — receives _user_code and _stdin_data via globals
const RUNNER = `
import sys, io

_stdin_lines = _stdin_data.split("\\n") if _stdin_data else []
_stdin_idx = [0]

class _In:
    def readline(self):
        if _stdin_idx[0] < len(_stdin_lines):
            line = _stdin_lines[_stdin_idx[0]] + "\\n"
            _stdin_idx[0] += 1
            return line
        return ""
    def read(self):
        remaining = "\\n".join(_stdin_lines[_stdin_idx[0]:])
        _stdin_idx[0] = len(_stdin_lines)
        return remaining

_out = io.StringIO()
_old_stdout = sys.stdout
_old_stdin = sys.stdin
sys.stdout = _out
sys.stdin = _In()
_err = ""

try:
    exec(_user_code)
except Exception as e:
    _err = str(e)
finally:
    sys.stdout = _old_stdout
    sys.stdin = _old_stdin

_result_stdout = _out.getvalue()
_result_stderr = _err
(_result_stdout, _result_stderr)
`;

export async function runPythonInBrowser(code: string, stdin: string = ""): Promise<RunResult> {
  const pyodide = await getPyodide();

  // Pass user code and stdin as Python globals — avoids string escaping issues
  pyodide.globals.set("_user_code", code);
  pyodide.globals.set("_stdin_data", stdin);

  let stdout = "";
  let stderr = "";

  try {
    const result = await pyodide.runPythonAsync(RUNNER);
    stdout = result.get(0) || "";
    stderr = result.get(1) || "";
    result.destroy();
  } catch (err: any) {
    const msg = err.message || String(err);
    // Extract last line (the actual error, not full traceback)
    const lines = msg.split("\n").filter((l: string) => l.trim());
    stderr = lines[lines.length - 1] || msg;
  }

  // Clean up globals
  pyodide.globals.delete("_user_code");
  pyodide.globals.delete("_stdin_data");

  // Remove single trailing newline
  if (stdout.endsWith("\n")) stdout = stdout.slice(0, -1);

  return { stdout, stderr };
}
