"use client";

import { PropsWithChildren } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTasks } from "~/context/tasks-context";

export function DndContext({ children }: PropsWithChildren<{}>) {
  const { onDragEnd } = useTasks();

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
