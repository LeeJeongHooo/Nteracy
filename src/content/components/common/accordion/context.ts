import { createContext, useContext } from "react";

export interface AccordionContextValues {
  value: string[];
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
}

export const AccordionContext = createContext<
  AccordionContextValues | undefined
>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "useAccordionContext는 Accordion 내부에서만 사용 가능합니다."
    );
  }

  return context;
};

/* ----------------------------------------------------------------------------------------------- */

interface AccordionItemContextValues {
  open?: boolean;
  triggerId?: string;
  value: string;
}

export const AccordionItemContext = createContext<
  AccordionItemContextValues | undefined
>(undefined);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "AccordionItemContext는 Accordion.Item 내부에서만 사용 가능합니다."
    );
  }

  return context;
};
