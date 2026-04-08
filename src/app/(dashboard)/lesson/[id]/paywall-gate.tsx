"use client";

import { useEffect, useState } from "react";
import { Lesson } from "@/types";
import { hasProSubscription } from "@/lib/paywall";
import { LessonPlayer } from "@/components/lesson-player";
import { PaywallModal } from "@/components/paywall-modal";

interface Props {
  lesson: Lesson;
  nextLessonId?: string;
}

export function LessonPaywallGate({ lesson, nextLessonId }: Props) {
  const [isPro, setIsPro] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPro(hasProSubscription());
  }, []);

  // Loading state while checking localStorage
  if (isPro === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Загрузка...</div>
      </div>
    );
  }

  if (!isPro) {
    return <PaywallModal lessonTitle={lesson.title} />;
  }

  return <LessonPlayer lesson={lesson} nextLessonId={nextLessonId} />;
}
