import { NextResponse } from "next/server";
import { CreateTaskDTO } from "~/entities/task/dto/create-task.dto";
import { db } from "~/infra/database/prisma/db";

export async function GET() {
  const todos = await db.tasks.findMany();

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

  return NextResponse.json(todo);
}
