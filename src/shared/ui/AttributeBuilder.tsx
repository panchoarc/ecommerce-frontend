import { CreateCategory } from "@/features/admin/validations/categorySchema";
import { AttributeInput } from "@/shared/ui/AttributeInput";
import { Button } from "@/shared/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";

export const AttributeBuilder = () => {
  const { control } = useFormContext<CreateCategory>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const handleAddAttribute = () => {
    append({
      id: Date.now(),
      name: "",
      type: "select",
      required: false,
      options: [],
    });
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <AttributeInput
          key={field.id}
          index={index}
          onDelete={() => remove(index)}
        />
      ))}

      <Button type="button" onClick={handleAddAttribute}>
        Agregar atributo
      </Button>
    </div>
  );
};
