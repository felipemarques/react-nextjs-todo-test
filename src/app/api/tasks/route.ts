import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { CreateTaskDTO } from "~/entities/task/dto/create-task.dto";
import { db } from "~/infra/database/prisma/db";

export async function GET() {
  const todos = await db.tasks.findMany({
    orderBy: {
      dropdown_order: "desc",
    },
  });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body: CreateTaskDTO = await request.json();

  const todo = await db.tasks.create({
    data: {
      dropdown_order: body.dropdown_order,
      title: body.title,
    },
  });

  revalidatePath("/");

  return NextResponse.json(todo);
}

export async function PATCH(request: Request) {
  const body: any = await request.json();

  const updatedData = await db.tasks.update({
    where: {
      id: body.id,
      title: body.title,
    },
    data: {
      completed: body.completed,
    },
  });

  revalidatePath("/");

  return NextResponse.json(updatedData);
}
