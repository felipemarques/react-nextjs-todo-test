import { CountTasks } from "~/components/count-tasks";
import { Tasks } from "~/components/tasks";
import { AddButton } from "~/components/ui/add-button";
import { Input } from "~/components/ui/input";
import { PageTitle } from "~/components/ui/page-title";
import { addTodo } from "~/server-actions/add-todo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex">
        <PageTitle>Tasks</PageTitle>
        <CountTasks />
      </div>
      <form action={addTodo}>
        <Input
          placeholder="New task"
          name="title"
          rightElement={<AddButton />}
        />
      </form>
      <Tasks />
    </main>
  );
}
