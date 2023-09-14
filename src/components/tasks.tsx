import { Tasks as TasksType } from "@prisma/client";
import { api } from "~/services/api";
import { TaskList } from "./task-list";

export async function Tasks() {
  const tasks = await api.get<TasksType[]>("/tasks");

  return (
    <div className="space-y-4">
      <TaskList serverTasks={tasks} />
    </div>
  );
}
