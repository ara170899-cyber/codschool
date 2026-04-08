import { getMathTopicByNumber, allMathTopics } from "@/lib/ege-math";
import { MathPlayer } from "@/components/math-player";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: { number: string };
}

export function generateStaticParams() {
  return allMathTopics.map((t) => ({ number: String(t.taskNumber) }));
}

export default function MathTaskPage({ params }: Props) {
  const taskNumber = parseInt(params.number, 10);
  const topic = getMathTopicByNumber(taskNumber);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <Link href="/course/ege-math" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
          ← Все задания ЕГЭ
        </Link>
      </div>
      <MathPlayer topic={topic} />
    </div>
  );
}
