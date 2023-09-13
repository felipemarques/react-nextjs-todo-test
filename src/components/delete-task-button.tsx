"use client";

import { X } from "lucide-react";
import { api } from "~/services/api";

export function DeleteTaskButton({ taskId }: { taskId: number }) {
  function handleDelete() {
    api.delete(`/tasks/${taskId}`);
  }

  return (
    <button
      className="absolute inset-y-0 right-0 bg-red-800 flex items-center px-2 rounded-r-md hover:bg-red-900"
      type="submit"
      onClick={handleDelete}
    >
      <X className="" />
    </button>
  );
}
