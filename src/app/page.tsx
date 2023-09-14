import { AddTaskForm } from "~/components/add-task-form";
import { CountTasks } from "~/components/count-tasks";
import { TaskFilters } from "~/components/task-filters";
import { Tasks } from "~/components/tasks";
import { PageTitle } from "~/components/ui/page-title";
import { TasksProvider } from "~/context/tasks-context";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex">
        <PageTitle>Tasks</PageTitle>
        <CountTasks />
      </div>
      <TasksProvider>
        <AddTaskForm />
        <TaskFilters />
        <Tasks />
      </TasksProvider>
    </main>
  );
}
