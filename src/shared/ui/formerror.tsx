import { FC } from "react";

interface FormErrorProps {
  message?: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return <div className="text-red-500 text-sm mt-1">{message}</div>;
};

export default FormError;
