import * as React from "react";
import { cn } from "@/shared/lib/utils";

// Тонкая горизонтальная линия-разделитель.
function Divider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-white/20", className)}
      {...props}
    />
  );
}

export { Divider };
