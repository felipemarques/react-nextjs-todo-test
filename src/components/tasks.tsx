import { Tasks as TasksType } from "@prisma/client";
import { api } from "~/services/api";
import { ListTasks } from "./list-tasks";

export async function Tasks() {
  const tasks = await api.get<TasksType[]>("/tasks");

  return (
    <div className="space-y-4">
      {tasks && <ListTasks serverTasks={tasks} />}
    </div>
  );
}
