import { ChangeEvent, forwardRef, InputHTMLAttributes, useRef } from "react";

import { Input } from "../input";
import { Message } from "./Message";
import { LengthCounter, LengthCounterRef } from "./LengthCounter";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
  error?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { defaultValue, message, error, maxLength, onChange, ...restProps } =
      props;

    const lengthCounterRef = useRef<LengthCounterRef>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      lengthCounterRef.current?.handleLengthCounter(
        Number(event.target.value.length)
      );

      if (onChange) onChange(event);
    };

    return (
      <div className="flex flex-col">
        <Input
          ref={ref}
          defaultValue={defaultValue}
          maxLength={maxLength}
          error={error}
          onChange={handleChange}
          {...restProps}
        />
        <div className="flex justify-between">
          {message && <Message message={message} error={error} />}
          {maxLength && (
            <LengthCounter
              initialLength={defaultValue?.toString().length}
              maxLength={maxLength}
              ref={lengthCounterRef}
            />
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";
