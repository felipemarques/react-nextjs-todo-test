"use server";

import { Tasks } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { api } from "~/services/api";

export async function addTodo(formData: FormData) {
  const title = formData.get("title");

  await api.post<Tasks[]>("/tasks", {
    dropdown_order: 0,
    title,
  });

  revalidatePath("/");
}
