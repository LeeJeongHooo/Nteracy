import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@utils/cn";

interface SkeletonProps extends ComponentPropsWithoutRef<"span"> {
  width?: number;
  height?: number;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (props, ref) => {
    const { width, height, className } = props;

    return (
      <span
        ref={ref}
        style={{ display: "block", width, height }}
        className={cn(
          "m-3 rounded bg-gray-300 box-border animate-pulse",
          className
        )}
        tabIndex={-1}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
