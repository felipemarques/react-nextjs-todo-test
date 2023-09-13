import { NextResponse } from "next/server";
import { db } from "~/infra/database/prisma/db";

export async function GET() {
  const countTasks = await db.tasks.count();

  return NextResponse.json({
    count: countTasks,
  });
}
