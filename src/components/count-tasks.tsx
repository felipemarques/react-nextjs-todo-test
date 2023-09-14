import { api } from "~/services/api";

export async function CountTasks() {
  const countResponse = await api.get<{ count: number }>("/tasks/count");

  return <h1 className="text-4xl">({countResponse?.count})</h1>;
}
