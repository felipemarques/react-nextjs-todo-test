"use client";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  rightElement?: JSX.Element;
  error?: string;
}

export function Input({ rightElement, ...props }: InputProps) {
  return (
    <input type="text" name="title" />
    // <div className="relative my-5">
    //   <input
    //     {...props}
    //     className={`w-96 text-black rounded py-2 px-4 pr-10 focus:outline-none focus:border-blue-500 placeholder:text-gray-400`}
    //   />
    //   {rightElement && (
    //     <div className="absolute inset-y-0 right-0 flex py-2 items-center">
    //       {rightElement}
    //     </div>
    //   )}
    // </div>
  );
}
