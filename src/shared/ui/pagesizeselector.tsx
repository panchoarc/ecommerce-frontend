import { FC } from "react";

interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (newSize: number) => void;
}

const PageSizeSelector: FC<PageSizeSelectorProps> = ({
  value,
  options = [10, 20, 50, 100],
  onChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <label htmlFor="pageSize" className="whitespace-nowrap">
        Rows per page:
      </label>
      <select
        id="pageSize"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border-none rounded-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;
