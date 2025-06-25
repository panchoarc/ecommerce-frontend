import { FC, useState } from "react";
import defaultImage from "@/assets/default-image.webp";

interface ImageProps {
  src: string;
  alt: string;
}

const Image: FC<ImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(defaultImage)}
      className=" w-32 h-32 sm:w-48 object-contain"
    />
  );
};

export default Image;
