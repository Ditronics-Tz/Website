import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--vermilion)] text-white",
        secondary: "bg-[var(--off-white)] text-[var(--anchor-dark)]",
        success: "bg-[rgba(19,208,171,0.1)] text-[#0d9373]",
        warning: "bg-[rgba(255,196,62,0.1)] text-[#b38600]",
        muted: "bg-[rgba(95,108,114,0.1)] text-[var(--neutral-text)]",
        outline: "border border-current bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
