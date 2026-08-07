import * as React from "react";

import { cn } from "@/lib/utils";

type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive";

type BubbleAlign = "start" | "end";

const bubbleVariantClass: Record<BubbleVariant, string> = {
  default:
    "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-violet-50 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/90",
  secondary:
    "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-white " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary/90",
  muted:
    "*:data-[slot=bubble-content]:bg-slate-100 *:data-[slot=bubble-content]:text-slate-800 " +
    "dark:*:data-[slot=bubble-content]:bg-slate-800/70 dark:*:data-[slot=bubble-content]:text-slate-100 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-200 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-700",
  tinted:
    "*:data-[slot=bubble-content]:bg-primary/10 *:data-[slot=bubble-content]:text-slate-900 " +
    "dark:*:data-[slot=bubble-content]:bg-primary/20 dark:*:data-[slot=bubble-content]:text-slate-50 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/15",
  outline:
    "*:data-[slot=bubble-content]:border-slate-200 *:data-[slot=bubble-content]:bg-white " +
    "dark:*:data-[slot=bubble-content]:border-slate-700 dark:*:data-[slot=bubble-content]:bg-slate-950 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-50 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-900",
  ghost:
    "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent " +
    "*:data-[slot=bubble-content]:p-0 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-100 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-slate-800/50",
  destructive:
    "*:data-[slot=bubble-content]:bg-danger/10 *:data-[slot=bubble-content]:text-danger " +
    "dark:*:data-[slot=bubble-content]:bg-danger/20 " +
    "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-danger/20",
};

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  );
}

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: BubbleVariant;
  align?: BubbleAlign;
}) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(
        "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1",
        "group-data-[align=end]/message:self-end data-[align=end]:self-end",
        "data-[variant=ghost]:max-w-full",
        bubbleVariantClass[variant],
        className
      )}
      {...props}
    />
  );
}

function BubbleContent({
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  // Padding lives on the painted surface so text never kisses the radius.
  // box-border + wrap utilities keep long lines inside the fill.
  const classes = cn(
    "box-border w-fit max-w-full min-w-0 rounded-xl border border-transparent",
    "px-4 py-2.5 text-sm leading-relaxed sm:px-5 sm:py-3",
    "break-words [overflow-wrap:anywhere] [word-break:break-word]",
    "group-data-[align=end]/bubble:self-end",
    "[button]:text-left [button,a]:transition-colors",
    "[button,a]:outline-none [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-primary/50",
    className
  );

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className),
      // Preserve slot targeting used by Bubble variant styles.
      ...({ "data-slot": "bubble-content" } as const),
    } as Partial<typeof children.props> & { className?: string });
  }

  return (
    <div data-slot="bubble-content" className={classes} {...props}>
      {children}
    </div>
  );
}

const bubbleReactionsSideClass = {
  top: "top-0 -translate-y-3/4",
  bottom: "bottom-0 translate-y-3/4",
} as const;

const bubbleReactionsAlignClass = {
  start: "left-3",
  end: "right-3",
} as const;

/** Exported for API parity; FloatingChatbot does not use reactions. */
function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: BubbleAlign;
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(
        "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1",
        "rounded-full bg-slate-100 px-1.5 py-0.5 text-sm ring-2 ring-white",
        "dark:bg-slate-800 dark:ring-slate-950 has-[button]:p-0",
        bubbleReactionsSideClass[side],
        bubbleReactionsAlignClass[align],
        className
      )}
      {...props}
    />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions };
export type { BubbleVariant, BubbleAlign };
