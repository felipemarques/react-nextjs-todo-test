"use client";

import { Tasks } from "@prisma/client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { api } from "~/services/api";

interface ContextValues {
  tasks: Tasks[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Tasks[] | null>>;
  onDeleteTask: (id: number) => void;
  onSwitchTaskCompleteStatus: (id: number, oldStatus: boolean) => void;
  onOrderByCompletedStatus: (status: boolean) => void;
  editingTask: {
    id: number;
    title: string;
  } | null;
  onEditTask: (id: number, oldTitle: string) => void;
}

const TasksContext = createContext({} as ContextValues);

export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Tasks[] | null>(null);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
  } | null>(null);

  function onDeleteTask(id: number) {
    const newTasks = tasks?.filter((task) => task.id !== id);

    if (!newTasks) return;

    setTasks(newTasks);
    deleteTaskOnDb(id);
  }

  function deleteTaskOnDb(id: number) {
    return api.delete(`/tasks/${id}`);
  }

  async function onSwitchTaskCompleteStatus(id: number, oldCompleted: boolean) {
    const newTasks = updateTaskCompletedStatus(id);

    if (!newTasks) return;

    setTasks(newTasks);
    updateCompletedOnDb(id, !oldCompleted);
  }

  function updateCompletedOnDb(id: number, completed: boolean) {
    return api.patch("/tasks", {
      id,
      completed,
    });
  }

  function updateTaskCompletedStatus(id: number) {
    if (!tasks) return;

    const newTasks = tasks.map((task) => {
      const isTaskToUpdate = task.id === id;

      if (!isTaskToUpdate) return task;

      return {
        ...task,
        completed: !task.completed,
      };
    });

    return newTasks;
  }

  function onOrderByCompletedStatus(status: boolean) {
    if (!tasks) return;

    const newTasks = [...tasks].sort((a, b) => {
      if (status === true) {
        return Number(b.completed) - Number(a.completed);
      }

      return Number(a.completed) - Number(b.completed);
    });

    setTasks(newTasks);
  }

  function onEditTask(id: number, oldText: string) {
    setEditingTask({ id, title: oldText });
  }

  const memoizedValues = useMemo(
    () => ({
      tasks,
      setTasks,
      onDeleteTask,
      onSwitchTaskCompleteStatus,
      onOrderByCompletedStatus,
      onEditTask,
      editingTask,
    }),
    [tasks]
  );
  return (
    <TasksContext.Provider value={memoizedValues}>
      {children}
    </TasksContext.Provider>
  );
}
