"use client";

import { Edit } from "lucide-react";
import { useTasks } from "~/context/tasks-context";

export function EditTaskButton({
  id,
  oldTitle,
}: {
  id: number;
  oldTitle: string;
}) {
  const { onEditTask } = useTasks();

  return (
    <button
      onClick={() => onEditTask(id, oldTitle)}
      className="absolute inset-y-0 right-10 bg-blue-800 hover:bg-blue-900 flex items-center px-2"
    >
      <Edit />
    </button>
  );
}
