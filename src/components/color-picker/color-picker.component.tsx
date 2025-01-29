import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/shared/utils/cn.util";
import { useState } from "react";
import { getContrastingTextColor } from "@/shared/utils/color.util";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type ColorPickerProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  value,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Popover open={isActive} onOpenChange={setIsActive}>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 font-mono text-base tracking-wide shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          isActive && "outline-none ring-1 ring-ring",
          className
        )}
        style={{
          backgroundColor: value,
          color: getContrastingTextColor(value),
        }}
      >
        {value}
      </PopoverTrigger>
      <PopoverContent className="flex w-min flex-col gap-4">
        <HexColorPicker
          className="*:!w-full"
          color={value}
          onChange={onChange}
        />

        <div className="flex flex-col gap-2">
          <Label>HEX</Label>
          <Input
            value={value}
            onChange={(event) => {
              const value = event.target.value;

              // HEX values are supposed to start with #
              if (!value.startsWith("#")) {
                return;
              }
              onChange(event.target.value);
            }}
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { ColorPicker };
