import { Input } from "@/shared/ui/input";
import { useEffect, useRef, useState } from "react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (result: any) => void;
}

const AddressAutocomplete = ({
  value,
  onChange,
  onSelect,
}: AddressAutocompleteProps) => {
  const [results, setResults] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) {
      setResults([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setShowList(true);
        });
    }, 500);
  }, [value]);

  const handleSelect = (result: any) => {
    onChange(result.display_name);
    setShowList(false);
    onSelect?.(result);
  };

  // Ocultar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <Input
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={value ?? ""} // 👈 aquí evitamos undefined
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar dirección..."
        onFocus={() => {
          if (results.length > 0) setShowList(true);
        }}
      />
      {showList && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
          {results.map((r, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => handleSelect(r)}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
