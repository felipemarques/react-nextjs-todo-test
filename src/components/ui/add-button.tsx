import { Plus } from "lucide-react";

export function AddButton() {
  return (
    <button
      type="submit"
      className="bg-blue-500 active:scale-105 border-gray-50 flex hover:bg-blue-600 text-white font-bold py-2 px-4 "
    >
      <Plus />
      <span>Add</span>
    </button>
  );
}
