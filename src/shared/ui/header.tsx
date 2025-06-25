import { ReactNode, FC } from "react";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";

interface BaseHeaderProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

const BaseHeader: FC<BaseHeaderProps> = ({
  children,
  offset = 100,
}: BaseHeaderProps) => {
  const { isVisible } = useScrollDirection(offset);

  return (
    <header
      className={`w-full h-fit shadow-md flex justify-between items-center bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </header>
  );
};

export default BaseHeader;
