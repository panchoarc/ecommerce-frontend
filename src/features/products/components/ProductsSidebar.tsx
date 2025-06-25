import { Attribute } from "@/features/admin/validations/categorySchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Sidebar, SidebarContent, SidebarMenu } from "@/shared/ui/sidebar";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

interface ProductsSidebarProps {
  attributes: Attribute[];
  filters: Record<string, any>; // Permitir atributos anidados
  onFilterChange: (filters: Record<string, any>) => void;
}

const ProductsSidebar: FC<ProductsSidebarProps> = ({
  attributes,
  filters,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleUpdate = useCallback(
    (attrId: number, value: string[] | string) => {
      const updated = {
        ...localFilters,
        attributes: {
          ...localFilters.attributes,
          [attrId]: value,
        },
      };

      setLocalFilters(updated);
      onFilterChange(updated);
    },
    [localFilters, onFilterChange]
  );

  const renderedAttributes = useMemo(
    () => (
      <Accordion type="multiple">
        {attributes.map((attr) => (
          <AccordionItem
            key={attr.id}
            value={String(attr.id)}
            className="border-b border-gray-200 py-3"
          >
            <AccordionTrigger className="text-gray-800 font-medium hover:no-underline">
              {attr.name}
            </AccordionTrigger>
            <AccordionContent className="pt-3 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
              <AttributeInput
                attribute={attr}
                value={localFilters.attributes?.[attr.id]}
                onChange={(value) => handleUpdate(attr.id, value)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    [attributes, localFilters, handleUpdate]
  );

  return (
    <Sidebar className="border-none bg-white">
      <div className="px-4 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">Filters</h3>
      </div>
      <SidebarContent className="bg-white px-4">
        <SidebarMenu className="bg-white">
          {attributes.length > 0 ? (
            renderedAttributes
          ) : (
            <p className="text-center text-gray-500">No attributes available</p>
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProductsSidebar;

interface AttributeInputProps {
  attribute: Attribute;
  value: string[] | string | undefined;
  onChange: (value: string[] | string) => void;
}

export const AttributeInput: FC<AttributeInputProps> = ({
  attribute,
  value,
  onChange,
}) => {
  const { type, id, name, required, options = [] } = attribute;

  if (type === "text") {
    return (
      <div className="flex flex-col gap-1">
        <Input
          id={id.toString()}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${name}`}
          required={required}
        />
      </div>
    );
  }

  if (type === "checkbox" || type === "select") {
    const selected = Array.isArray(value) ? value : [];

    const handleChange = (option: string, checked: boolean) => {
      const newValue = checked
        ? [...selected, option]
        : selected.filter((val) => val !== option);
      onChange([...new Set(newValue)]);
    };

    return (
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const inputId = `${id}-${opt}`;
          const checked = selected.includes(opt);

          return (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                id={inputId}
                checked={checked}
                onCheckedChange={(checked) => handleChange(opt, !!checked)}
              />
              <Label
                htmlFor={inputId}
                className="text-sm text-gray-800 cursor-pointer"
              >
                {opt}
              </Label>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};
