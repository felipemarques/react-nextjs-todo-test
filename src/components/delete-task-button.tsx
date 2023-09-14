"use client";

import { X } from "lucide-react";

export function DeleteTaskButton({
  onDeleteTask,
}: {
  onDeleteTask: () => void;
}) {
  return (
    <button
      className="absolute inset-y-0 right-0 bg-red-800 flex items-center px-2 rounded-r-md hover:bg-red-900 text-white"
      type="submit"
      onClick={onDeleteTask}
    >
      <X className="" />
    </button>
  );
}
