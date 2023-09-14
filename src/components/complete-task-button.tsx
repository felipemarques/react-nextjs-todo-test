"use client";

import { Check } from "lucide-react";

export function CompleteTaskButton({
  onCompleteTask,
}: {
  onCompleteTask: () => void;
}) {
  return (
    <button
      className="absolute inset-y-0 right-10 bg-teal-500 flex items-center px-2 hover:bg-teal-600 text-white"
      onClick={onCompleteTask}
    >
      <Check />
    </button>
  );
}
