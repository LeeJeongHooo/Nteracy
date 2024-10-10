import React, { ReactNode } from "react";
import { ResponseType } from "../../../DigitalLiteracy";

interface ReponsesProps {
  responses: ResponseType;
}

const ProgressBar = ({ responses }: ReponsesProps) => {
  const yesPercent = (
    (Number(responses.y) / Number(responses.total)) *
    100
  ).toFixed(2);
  const noPercent = (100 - Number(yesPercent)).toFixed(2);

  const isYesShow = yesPercent !== "0.00";
  const isNoShow = noPercent !== "0.00";
  return (
    <div className="w-full border-[1px] border-solid border-mainBlue bg-gray-100 rounded-lg h-10 overflow-hidden relative">
      <div
        className={`bg-lightBlue h-10 border-solid border-mainBlue flex items-center relative ${
          !isYesShow || !isNoShow ? "" : "border-r-[1px]"
        }`}
        style={{ width: `${yesPercent}%` }}
      >
        {isYesShow && (
          <span className="absolute top-2 left-1">{`${yesPercent}% (${responses.y}명)`}</span>
        )}
      </div>
      {isNoShow && (
        <span className="absolute top-2 right-1">{`${noPercent}% (${responses.n}명)`}</span>
      )}
    </div>
  );
};

export default ProgressBar;
