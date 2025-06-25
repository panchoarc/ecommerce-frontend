import defaultImage from "@/assets/default-image.webp";
import React, { useRef, useState } from "react";

interface ProductImage {
  url: string;
  isMainImage?: boolean;
}

interface Props {
  images: ProductImage[];
}

const ProductImageGallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string>("");
  const [showZoom, setShowZoom] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomLensRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (url: string) => {
    setIsLoading(false);
    setLoadedImageUrl(url);
  };

  const handleImageError = (e: React.SyntheticEvent) => {
    const imgElement = e.target as HTMLImageElement;
    if (imgElement.src !== defaultImage) {
      imgElement.src = defaultImage;
      setLoadedImageUrl(defaultImage);
      setIsLoading(false);
    }
  };

  const getMainImageUrl = (): string => {
    if (selectedImage?.url) return selectedImage.url;
    const main = images.find((img) => img.isMainImage) || images[0];
    return main?.url || defaultImage;
  };

  const handleSelectImage = (img: ProductImage) => {
    if (img.url !== loadedImageUrl) {
      setIsLoading(true);
      setSelectedImage(img);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = imageContainerRef.current;
    const lens = zoomLensRef.current;
    if (!container || !lens) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    lens.style.backgroundPosition = `${x}% ${y}%`;
  };

  const currentImageUrl = getMainImageUrl();

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Imagen principal con zoom */}
      <section
        className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center"
        ref={imageContainerRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        aria-label="Imagen principal del producto con zoom al pasar el mouse"
      >
        <img
          src={currentImageUrl}
          alt="Imagen principal del producto"
          onError={handleImageError}
          onLoad={() => handleImageLoad(currentImageUrl)}
          className={`w-full max-h-full object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />

        {/* Zoom lens */}
        {showZoom && (
          <div
            ref={zoomLensRef}
            className="
              absolute pointer-events-none hidden md:block 
              w-120 h-80 border border-gray-300 rounded shadow-lg z-10
              top-1/3 left-full ml-14
              transform -translate-y-1/2
            "
            style={{
              backgroundImage: `url(${currentImageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "180% 150%",
              backgroundPosition: "50% 50%",
            }}
          />
        )}
      </section>

      {/* Miniaturas como botones accesibles */}
      <section className="flex flex-row justify-start gap-2">
        {images.map((img, index) => (
          <button
            key={img.url}
            type="button"
            onClick={() => handleSelectImage(img)}
            onMouseEnter={() => handleSelectImage(img)}
            className={`w-16 h-16 flex p-0 rounded-md border focus:outline-none
              transition duration-200 hover:ring-2 hover:ring-blue-300
              ${
                selectedImage?.url === img.url
                  ? "border-blue-500 ring-1 ring-blue-400"
                  : "border-gray-300"
              }`}
            aria-label={`Seleccionar vista ${index + 1}`}
          >
            <img
              src={img.url}
              alt={`Vista ${index + 1}`}
              className="w-full h-full object-contain rounded"
              onError={handleImageError}
              loading="lazy"
            />
          </button>
        ))}
      </section>
    </div>
  );
};

export default ProductImageGallery;
