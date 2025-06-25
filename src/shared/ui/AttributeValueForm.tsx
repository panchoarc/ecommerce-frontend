import { Attribute } from "@/features/admin/validations/categorySchema";
import { ProductAttributeInput } from "@/features/admin/validations/ProductSchema";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useEffect, useRef, useState } from "react";

interface AttributeValueFormProps {
  attributes: Attribute[];
  onChange: (values: ProductAttributeInput[]) => void;
  values?: ProductAttributeInput[];
}

// Define el tipo de valor interno por atributo: string | number | string[]
type InternalValues = Record<number, string | number | string[]>;

export const AttributeValueForm: React.FC<AttributeValueFormProps> = ({
  values,
  attributes,
  onChange,
}) => {
  const [internalValues, setInternalValues] = useState<InternalValues>({});
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    if (!values && attributes.length === 0) return;

    const initial: InternalValues = {};

    for (const attr of attributes) {
      console.log("ATTR", attr);
      const match = values?.find((v) => v.id === attr.id);
      if (match) {
        initial[attr.id] = Array.isArray(match.values)
          ? match.values.map(String)
          : [String(match.values)];
      }
    }

    setInternalValues(initial);
    onChange(transformToArray(initial));
    isInitialized.current = true;
  }, [attributes, values]);

  const transformToArray = (
    values: InternalValues
  ): ProductAttributeInput[] => {
    return attributes
      .map((attr) => {
        const rawValue = values[attr.id];
        if (rawValue === undefined || rawValue === "") return null;

        return {
          id: attr.id,
          values: Array.isArray(rawValue)
            ? rawValue.map(String)
            : [String(rawValue)],
        };
      })
      .filter(Boolean) as ProductAttributeInput[];
  };

  const handleChange = (
    id: number,
    value: string | number,
    isCheckbox = false
  ) => {
    const current = internalValues[id];

    let updated: string | number | string[];
    if (isCheckbox) {
      const currentArray = Array.isArray(current) ? current : [];
      const stringValue = String(value);
      updated = currentArray.includes(stringValue)
        ? currentArray.filter((v) => v !== stringValue)
        : [...currentArray, stringValue];
    } else {
      updated = value;
    }

    const nextValues = { ...internalValues, [id]: updated };
    setInternalValues(nextValues);
    onChange(transformToArray(nextValues));
  };

  return (
    <div className="space-y-4">
      {attributes.map((attr) => (
        <div key={attr.id}>
          <Label className="font-bold py-2 uppercase">{attr.name}</Label>
          {attr.options && attr.options.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              {attr.options.map((option) => {
                const isChecked =
                  Array.isArray(internalValues[attr.id]) &&
                  internalValues[attr.id].includes(option);

                return (
                  <Label
                    key={option}
                    className={`flex items-center gap-2 p-3 border rounded cursor-pointer transition-colors`}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() =>
                        handleChange(attr.id, option, true)
                      }
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                    />
                    <span className="font-bold">{option}</span>
                  </Label>
                );
              })}
            </div>
          ) : (
            <>
              {attr.type === "text" && (
                <Input
                  type="text"
                  value={
                    typeof internalValues[attr.id] === "string"
                      ? internalValues[attr.id]
                      : ""
                  }
                  onChange={(e) => handleChange(attr.id, e.target.value)}
                />
              )}
              {attr.type === "number" && (
                <Input
                  type="number"
                  value={
                    typeof internalValues[attr.id] === "number"
                      ? internalValues[attr.id]
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(attr.id, Number(e.target.value))
                  }
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
