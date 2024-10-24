import { createContext, useContext } from "react";

interface TabsContextValues {
  baseId: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValues | undefined>(
  undefined
);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabsContext는 Tabs 내부에서만 사용 가능합니다.");
  }

  return context;
};
