import { useRef } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface OptionInputListProps {
  options: string[];
  onChange: (updated: string[]) => void;
}

export const OptionInputList: React.FC<OptionInputListProps> = ({
  options,
  onChange,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    onChange(updated);
  };

  const addOption = () => {
    onChange([...options, ""]);
    setTimeout(() => {
      const nextIndex = options.length;
      inputRefs.current[nextIndex]?.focus();
    }, 0);
  };

  const removeOption = (index: number) => {
    const updated = [...options];
    updated.splice(index, 1);
    onChange(updated);

    setTimeout(() => {
      const focusIndex = index > 0 ? index - 1 : 0;
      inputRefs.current[focusIndex]?.focus();
    }, 0);
  };

  return (
    <div className="col-span-4 mt-2 space-y-2">
      {options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Opción ${index + 1}`}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
          <Button variant="destructive" onClick={() => removeOption(index)}>
            X
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addOption}>
        Agregar opción
      </Button>
    </div>
  );
};
