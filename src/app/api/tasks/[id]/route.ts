import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "~/infra/database/prisma/db";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await db.tasks.delete({
    where: {
      id: Number(params.id),
    },
  });

  revalidatePath("/");

  return new Response(null, {
    status: 204,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: {
    title?: string;
    completed?: boolean;
  } = await request.json();

  const updatedData = await db.tasks.update({
    where: {
      id: Number(params.id),
    },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.completed !== undefined && { completed: body.completed }),
    },
  });

  revalidatePath("/");

  return NextResponse.json(updatedData);
}
