import {
  forwardRef,
  ComponentPropsWithoutRef,
  useCallback,
  useId,
  useState,
} from "react";
import { TabsContext } from "./context";
import { TabsContent } from "./Content";
import { TabsTrigger } from "./Trigger";
import { TabsList } from "./List";

export interface TabsProps extends ComponentPropsWithoutRef<"div"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    onValueChange: onChangeProp,
    ...restProps
  } = props;

  const [uncontrolledvalue, setUncontrolledvalueValue] = useState(
    () => defaultValueProp || ""
  );

  const isControlled = valueProp !== undefined;

  const value = isControlled ? valueProp : uncontrolledvalue;

  const handleChangeValue: React.Dispatch<React.SetStateAction<string>> =
    useCallback(
      (nextValue) => {
        const value =
          typeof nextValue === "function" ? nextValue(valueProp) : nextValue;
        if (isControlled) {
          if (value !== valueProp) {
            onChangeProp?.(value);
          }
        } else {
          setUncontrolledvalueValue(nextValue);
        }
      },
      [isControlled, valueProp, onChangeProp]
    );

  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{ value, baseId, onValueChange: handleChangeValue }}
    >
      <div ref={ref} {...restProps} />
    </TabsContext.Provider>
  );
});

TabsRoot.displayName = "TabsRoot";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
