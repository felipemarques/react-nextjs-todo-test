"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/services/api";
import { AddButton } from "./ui/add-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTasks } from "~/context/tasks-context";

const addTaskSchema = z.object({
  title: z.string().min(1),
});

type AddTaskType = z.infer<typeof addTaskSchema>;

export function AddTaskForm() {
  const { register, handleSubmit, formState, reset } = useForm<AddTaskType>({
    resolver: zodResolver(addTaskSchema),
  });
  const { setTasks, tasks } = useTasks();

  function onSubmit(data: AddTaskType) {
    const now = new Date().getUTCMilliseconds();
    const id = Math.floor(Math.random() * now);
    const payload = {
      title: data.title,
      dropdown_order: tasks?.length ?? 0,
      id,
    };

    api.post("/tasks", payload);
    updateOptmistic(id, data.title);
    reset();
  }

  function updateOptmistic(id: number, title: string) {
    if (!tasks) return;

    const newDropdownOrder = tasks?.length ?? 0;

    const newTask = {
      title: title,
      completed: false,
      deleted_at: null,
      dropdown_order: newDropdownOrder,
      id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const tasksUpdated = [newTask, ...tasks];

    setTasks(tasksUpdated);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <label className="text-red-800">{formState.errors.title?.message}</label>
      <div className="relative mb-5">
        <input
          {...register("title")}
          className={`w-96 text-black rounded py-2 px-4 pr-10 focus:outline-none focus:border-blue-500 placeholder:text-gray-400`}
          placeholder="New task"
          type="text"
        />
        <div className="absolute inset-y-0 right-0 flex py-2 items-center">
          <AddButton />
        </div>
      </div>
    </form>
  );
}
