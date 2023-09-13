import { api } from "~/services/api";

export async function CountTasks() {
  const countResponse = await api.get<{ count: number }>("/tasks/count");

  return <span className="text-slate-400">{countResponse?.count}</span>;
}
