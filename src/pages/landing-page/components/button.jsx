// src/components/ui/button.jsx
import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
  },
  size: {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  },
};

export const Button = ({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
