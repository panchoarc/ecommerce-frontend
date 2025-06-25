import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import { OptionInputList } from "@/shared/ui/OptionInputList";
import {
  AttributeType,
  CreateCategory,
} from "@/features/admin/validations/categorySchema";

interface AttributeInputProps {
  index: number;
  onDelete: () => void;
}

export const AttributeInput: React.FC<AttributeInputProps> = ({
  index,
  onDelete,
}) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateCategory>();

  const type = useWatch({ control, name: `attributes.${index}.type` });
  const isOptionType = ["select", "radio", "checkbox"].includes(type);
  const attrErrors = errors?.attributes?.[index];

  return (
    <div className="grid gap-4 p-4 rounded-xl shadow bg-white">
      {/* Nombre y tipo */}
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <div className="w-full">
          <Input
            placeholder="Nombre del atributo"
            {...register(`attributes.${index}.name` as const)}
          />
          {attrErrors?.name && (
            <p className="text-sm text-red-500 mt-1">
              {attrErrors.name.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Select
            value={type}
            onValueChange={(value: AttributeType) =>
              setValue(`attributes.${index}.type`, value)
            }
          >
            <SelectTrigger className="w-full items-center">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
          {attrErrors?.type && (
            <p className="text-sm text-red-500 mt-1">
              {attrErrors.type.message}
            </p>
          )}
        </div>
      </div>

      {/* Requerido */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={useWatch({
            control,
            name: `attributes.${index}.required`,
          })}
          onCheckedChange={(checked) =>
            setValue(`attributes.${index}.required`, Boolean(checked))
          }
        />
        <span>Requerido</span>
      </div>

      {/* Opciones si aplica */}
      {isOptionType && (
        <div>
          <label className="font-medium">Opciones</label>
          <OptionInputList
            options={
              useWatch({ control, name: `attributes.${index}.options` }) || []
            }
            onChange={(newOptions) =>
              setValue(`attributes.${index}.options`, newOptions)
            }
          />
          {attrErrors?.options && (
            <p className="text-sm text-red-500 mt-1">
              {attrErrors.options.message}
            </p>
          )}
        </div>
      )}

      {/* Botón eliminar */}
      <div className="flex justify-end">
        <Button
          type="button"
          className="bg-red-400 hover:bg-red-700"
          onClick={onDelete}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
