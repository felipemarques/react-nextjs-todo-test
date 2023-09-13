import { revalidatePath } from "next/cache";
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
