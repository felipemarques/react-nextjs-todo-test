import { Tasks as TasksType } from "@prisma/client";
import { X } from "lucide-react";
import { api } from "~/services/api";
import { DeleteTaskButton } from "./delete-task-button";

export async function Tasks() {
  const data = await api.get<TasksType[]>("/tasks");

  return (
    <div className="space-y-4">
      {data?.map((task) => (
        <div
          key={task.id}
          className="flex w-96 relative bg-slate-800 p-2 rounded-md"
        >
          <p>{task.title}</p>

          <DeleteTaskButton taskId={task.id} />
        </div>
      ))}
    </div>
  );
}
