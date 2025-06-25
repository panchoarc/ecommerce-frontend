import Select, { MultiValue } from "react-select";

type Option = {
  label: string;
  value: number;
};

interface MultiSelectProps {
  label?: string;
  options: Option[];
  onChange: (selectedValues: number[]) => void;
  value: number[];
}

export const MultiSelect = ({
  label,
  options,
  onChange,
  value,
}: MultiSelectProps) => {
  // Filtrar las opciones seleccionadas
  const selectedValues = options.filter((option) =>
    value.includes(option.value)
  );

  // Cambiar a usar MultiValue<Option>
  const handleChange = (selected: MultiValue<Option>) => {
    const values = selected.map((opt) => opt.value);
    onChange(values);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="w-fit">
        <Select<Option, true>
          isMulti
          options={options}
          value={selectedValues}
          onChange={handleChange}
          placeholder="Selecciona opciones"
        />
      </div>
    </div>
  );
};
