"use client";

import { Tasks } from "@prisma/client";
import { useEffect } from "react";
import { DeleteTaskButton } from "./delete-task-button";
import { api } from "~/services/api";
import { useTasks } from "~/context/tasks-context";
import { EditTaskButton } from "./edit-task-button";
import { CompleteTaskButton } from "./complete-task-button";
import { completedBg } from "~/utils/tasks/completed-bg";

export function ListTasks({ serverTasks }: { serverTasks: Tasks[] }) {
  const {
    tasks,
    setTasks,
    onDeleteTask,
    onSwitchTaskCompleteStatus,
    editingTask,
  } = useTasks();

  useEffect(() => {
    setTasks(serverTasks);
  }, []);

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div
          key={task.id}
          className={`flex w-96 relative ${completedBg(
            task.completed
          )} p-2 rounded-md cursor-pointer`}
        >
          <p
            className={task.completed ? "line-through" : ""}
            contentEditable={editingTask?.id === task.id}
          >
            {task.title}
          </p>
          <CompleteTaskButton
            onCompleteTask={() =>
              onSwitchTaskCompleteStatus(task.id, task.completed)
            }
          />
          <DeleteTaskButton onDeleteTask={() => onDeleteTask(task.id)} />
          {/* <EditTaskButton id={task.id} oldTitle={task.title} /> */}
        </div>
      ))}
    </div>
  );
}
