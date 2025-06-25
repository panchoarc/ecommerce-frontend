import { FC } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullscreenLoaderProps {
  className?: string;
}

const FullscreenLoader: FC<FullscreenLoaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default FullscreenLoader;
