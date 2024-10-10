import React from "react";

interface InputRadioProps {
  id?: string;
  label?: string;
  setValue?: (val: any) => void;
  data?: string;
  value?: string;
}

const InputRadio = ({ id, label, data, value, setValue }: InputRadioProps) => {
  const checkRadioHandler = () => {
    // 만약 현재 클릭 되어 있는 상태인 경우
    if (data === value) {
      setValue("");
    } else {
      setValue(value);
    }
  };
  return (
    <div
      className={`flex-1 border-[1px] border-solid border-mainBlue rounded-lg  flex gap-1 ${
        data === value ? "bg-mainBlue text-white" : ""
      }`}
    >
      <input id={id} type="radio" className="ir" onClick={checkRadioHandler} />
      <label
        className="flex w-full px-10 py-2 items-center justify-center"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
