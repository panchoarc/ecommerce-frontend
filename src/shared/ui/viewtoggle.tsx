import { FC } from "react";

import { Button } from "@/shared/ui/button";
import { Grid, List } from "lucide-react"; // Importamos los íconos

interface ViewToggleProps {
  viewMode: string;
  setViewMode: (value: string) => void;
}

const ViewToggle: FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div>
      <Button
        onClick={() => setViewMode("grid")}
        className={` ${
          viewMode === "grid"
            ? "bg-blue-700 text-white hover:bg-yellow-500"
            : "bg-gray-200 text-white hover:bg-yellow-500"
        }`}
      >
        <Grid />
      </Button>

      <Button
        onClick={() => setViewMode("list")}
        className={` ${
          viewMode === "list"
            ? "bg-blue-700 text-white hover:bg-yellow-500"
            : "bg-gray-200 text-white hover:bg-yellow-500"
        }`}
      >
        <List />
      </Button>
    </div>
  );
};

export { ViewToggle };

