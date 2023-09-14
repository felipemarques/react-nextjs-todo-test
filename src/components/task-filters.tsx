"use client";

import { useTasks } from "~/context/tasks-context";

export function TaskFilters() {
  const { onOrderByCompletedStatus } = useTasks();

  return (
    <select className="w-72 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 mb-4">
      <option value="">Filters select</option>
      <option onClick={() => onOrderByCompletedStatus(true)}>Completed</option>
      <option onClick={() => onOrderByCompletedStatus(false)}>To do</option>
    </select>
  );
}
