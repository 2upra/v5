import React from "react";
import { useFormField } from "@/Components/form";
import { cn } from "@/lib/utils"; 

const ButtonCheckbox = ({ className, children, ...props }) => {
  const { name } = useFormField();
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex border items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-2 py-2",
        checked ? "text-zing-400 text-xs/[20px] border-zinc-500 bg-neutral-900/50	" : "text-zinc-500 text-xs/[20px]",
        className
      )}
      onClick={toggleChecked}
      aria-pressed={checked}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonCheckbox;