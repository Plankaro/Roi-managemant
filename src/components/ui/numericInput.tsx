import React from "react";
import { Input } from "@/components/ui/input";

interface NumericInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  value: number;
  onChange: (newValue: number) => void;
  placeholder?: string;
  className?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  placeholder = "Enter amount",
  className = "border-gray-300",
  ...props
}) => {
  const stringValue = value.toString();

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder={placeholder}
      value={stringValue}
      onChange={(e) => {
        const rawValue = e.target.value;
        // Only allow digits
        if (/^\d*$/.test(rawValue)) {
          const newStr = rawValue === "" ? "0" : rawValue.replace(/^0+(?=\d)/, "");
          onChange(Number(newStr));
        }
      }}
      className={className}
      {...props}
    />
  );
};

export default NumericInput;
