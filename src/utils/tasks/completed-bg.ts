export function completedBg(completed: boolean) {
  return completed
    ? "bg-green-800 hover:bg-green-900 bg-silver-light-todo-completed hover:bg-silver-light-todo-pending"
    : "bg-slate-800 hover:bg-slate-900 bg-silver-light-todo-pending hover:bg-silver-light-todo-completed";
}
