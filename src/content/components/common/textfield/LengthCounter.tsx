import { forwardRef, useImperativeHandle, useState } from "react";

export interface LengthCounterRef {
  handleLengthCounter: (val: number) => void;
}

interface LengthCounterProps {
  maxLength?: number;
  initialLength?: number;
}

export const LengthCounter = forwardRef<LengthCounterRef, LengthCounterProps>(
  (props, ref) => {
    const { maxLength, initialLength = 0 } = props;
    const [count, setCount] = useState<number>(initialLength);

    useImperativeHandle(ref, () => ({
      handleLengthCounter: (val) => setCount(val),
    }));

    return <p className="text-grey500">{`${count}/${maxLength}`}</p>;
  }
);

LengthCounter.displayName = "TextField.LengthCounter";
