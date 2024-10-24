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
  onChangeValue?: (value: string) => void;
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue: defaultValueProp,
    onChangeValue: onChangeProp,
    ...restProps
  } = props;

  const [uncontrolledValue, setUncontrolledValue] = useState(
    () => defaultValueProp || ""
  );

  const isControlled = valueProp !== undefined;

  const value = isControlled ? valueProp : uncontrolledValue;

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
          setUncontrolledValue(nextValue);
        }
      },
      [isControlled, valueProp, onChangeProp]
    );

  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{ value, baseId, onChangeValue: handleChangeValue }}
    >
      <div className="overflow-hidden" ref={ref} {...restProps} />
    </TabsContext.Provider>
  );
});

TabsRoot.displayName = "TabsRoot";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
