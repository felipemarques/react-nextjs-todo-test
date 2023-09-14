"use client";

import { Tasks } from "@prisma/client";
import { useEffect } from "react";
import { DeleteTaskButton } from "./delete-task-button";
import { useTasks } from "~/context/tasks-context";
import { CompleteTaskButton } from "./complete-task-button";
import { completedBg } from "~/utils/tasks/completed-bg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Toaster } from "react-hot-toast";

export function TaskList({ serverTasks }: { serverTasks: Tasks[] | null }) {
  const {
    tasks,
    setTasks,
    onDeleteTask,
    onSwitchTaskCompleteStatus,
    editingTask,
    onDragEnd,
  } = useTasks();

  useEffect(() => {
    setTasks(serverTasks);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toaster />
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks?.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={`task-${task.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex w-96 relative ${completedBg(
                      task.completed
                    )} p-2 rounded-md cursor-pointer`}
                  >
                    <p
                      className={`${
                        task.completed ? "line-through" : ""
                      } flex-grow`}
                      contentEditable={editingTask?.id === task.id}
                    >
                      {task.title}
                    </p>
                    <CompleteTaskButton
                      onCompleteTask={() =>
                        onSwitchTaskCompleteStatus(task.id, task.completed)
                      }
                    />
                    <DeleteTaskButton
                      onDeleteTask={() => onDeleteTask(task.id)}
                    />
                    {/* <EditTaskButton id={task.id} oldTitle={task.title} /> */}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
