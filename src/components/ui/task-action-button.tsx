"use client";

export function TaskActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="absolute inset-y-0 right-0 bg-red-800 flex items-center px-2 rounded-r-md hover:bg-red-900"
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
