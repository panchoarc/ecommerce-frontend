import { FC } from "react";

interface OrderShippingAddressProps {
  address: {
    alias: string;
    street: string;
    city: string;
    country: string;
  };
}

const OrderShippingAddress: FC<OrderShippingAddressProps> = ({ address }) => {
  return (
    <>
      <h2 className="text-lg font-semibold">Enviado a</h2>
      <p className="text-sm font-medium">{address.alias}</p>
      <p className="text-sm text-muted-foreground">
        {address.street}, {address.city}, {address.country}
      </p>
    </>
  );
};

export default OrderShippingAddress;
