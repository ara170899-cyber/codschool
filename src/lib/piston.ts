const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

export interface PistonResult {
  stdout: string;
  stderr: string;
  code: number;
  signal: string | null;
}

export async function runPython(code: string, stdin: string = ""): Promise<PistonResult> {
  const response = await fetch(PISTON_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: "3.10",
      files: [{ content: code }],
      stdin,
      run_timeout: 5000,
      compile_timeout: 5000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Piston API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    stdout: data.run?.stdout ?? "",
    stderr: data.run?.stderr ?? "",
    code: data.run?.code ?? 1,
    signal: data.run?.signal ?? null,
  };
}
