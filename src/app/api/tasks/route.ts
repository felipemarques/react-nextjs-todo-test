import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { CreateTaskDTO } from "~/entities/task/dto/create-task.dto";
import { db } from "~/infra/database/prisma/db";

export async function GET() {
  const todos = await db.tasks.findMany({
    orderBy: {
      dropdown_order: "asc",
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
      id: body.id,
    },
  });

  revalidatePath("/");

  return NextResponse.json(todo);
}

export async function PUT(request: Request) {
  const body: {
    newOrder: number[];
  } = await request.json();

  const updateData = body.newOrder.map((taskId, index) => ({
    where: { id: taskId },
    data: { dropdown_order: index },
  }));

  for (const data of updateData) {
    await db.tasks.update(data);
  }

  revalidatePath("/");

  return NextResponse.json({});
}
