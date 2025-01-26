import { cn } from "@utils/cn";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const DEFAULT_MAX = 100;

export interface ProgressProps extends ComponentPropsWithoutRef<"div"> {
  value?: number | null;
  max?: number;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const {
      value: valueProp = null,
      max: maxProp,
      className,
      ...restProps
    } = props;

    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error("Max Prop Error");
    }

    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;

    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined;
    const percent = isNumber(value) ? getPercent(value, max) : undefined;
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gray-200 h-9 rounded",
          className
        )}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuetext={valueLabel}
        aria-valuenow={isNumber(value) ? value : undefined}
        role="progressbar"
        ref={ref}
        {...restProps}
      >
        <div
          className={
            "w-full h-full bg-primary100 transition-transform duration-300"
          }
          style={{ transform: `translateX(-${percent})` }}
        />
      </div>
    );
  }
);

const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

const isValidMaxNumber = (max: any): max is number => {
  return isNumber(max) && !isNaN(max) && max > 0;
};

const isValidValueNumber = (value: any, max: number): value is number => {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
};

const getValueLabel = (value: number, max: number) => {
  return `${Math.round((value / max) * 100)}%`;
};

const getPercent = (value: number, max: number) => {
  return `${100 - Math.round((value / max) * 100)}%`;
};
