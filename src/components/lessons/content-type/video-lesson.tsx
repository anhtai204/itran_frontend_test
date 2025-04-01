"use client";

import { useState } from "react";

interface VideoLessonProps {
  content: {
    videoUrl: string;
    duration: string;
    description: string;
  };
}

export default function VideoLesson({ content }: VideoLessonProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6">
      <div className="ml-auto mr-auto aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <iframe
          src={content.videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
