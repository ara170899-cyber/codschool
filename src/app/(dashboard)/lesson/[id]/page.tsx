import { getLessonById, getNextLesson, getPrevLesson, getLessonModuleInfo, lessons } from "@/lib/lessons";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/lesson-player";
import { isLessonFree } from "@/lib/paywall";
import { LessonPaywallGate } from "./paywall-gate";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default function LessonPage({ params }: Props) {
  const lesson = getLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  const nextLesson = getNextLesson(params.id);
  const prevLesson = getPrevLesson(params.id);
  const moduleInfo = getLessonModuleInfo(params.id);
  const isFree = isLessonFree(params.id);

  if (!isFree) {
    return <LessonPaywallGate lesson={lesson} nextLessonId={nextLesson?.id} />;
  }

  return (
    <LessonPlayer
      lesson={lesson}
      nextLessonId={nextLesson?.id}
      prevLessonId={prevLesson?.id}
      moduleInfo={moduleInfo}
      nextLessonModule={nextLesson?.module}
    />
  );
}
