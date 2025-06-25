import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

interface UseScrollDirectionProps {
  offset?: number;
}

export const useScrollDirection = ({
  offset = 50,
}: UseScrollDirectionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 0) {
        // Scroll hacia abajo
        setScrollDirection("down");
        if (currentScrollY > offset) setIsVisible(false);
      } else {
        // Scroll hacia arriba
        setScrollDirection("up");
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, offset]);

  return {
    isVisible,
    direction: scrollDirection,
  };
};
