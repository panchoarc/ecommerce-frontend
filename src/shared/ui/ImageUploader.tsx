import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  value?: File | File[] | string | string[];
  onChange?: (value: File | File[] | string | undefined) => void;
  multiple?: boolean;
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUploader: FC<ImageUploaderProps> = ({
  value,
  onChange,
  multiple = false,
}) => {
  const [previews, setPreviews] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (!value) {
      setPreviews([]);
      return;
    }

    const normalized = Array.isArray(value) ? value : [value];
    setPreviews(normalized);
  }, [value]);

  const getPreviewUrl = (item: File | string) =>
    typeof item === "string" ? item : URL.createObjectURL(item);

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    );

    const updated = multiple ? [...previews, ...validFiles] : validFiles;

    setPreviews(updated);

    if (onChange) {
      onChange(
        multiple
          ? updated.filter((f) => f instanceof File)
          : updated.find((f) => f instanceof File) ?? undefined
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);

    if (onChange) {
      onChange(
        multiple
          ? updated.filter((f) => f instanceof File)
          : updated.find((f) => f instanceof File) ?? undefined
      );
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`w-full border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <Input {...getInputProps()} />
        <p className="text-sm text-gray-500">
          {isDragActive
            ? "Suelta las imágenes aquí..."
            : `Arrastra imágenes aquí o haz clic para subir`}
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG o WebP — Máx. 5MB</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {previews.map((item, index) => (
          <div key={index} className="relative w-24 h-24 group">
            <img
              src={getPreviewUrl(item)}
              className="w-full h-full object-cover rounded-lg shadow"
              alt={`preview-${index}`}
            />
            <Button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
