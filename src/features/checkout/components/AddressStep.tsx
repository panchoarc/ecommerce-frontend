import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useLocation, useNavigate } from "react-router";

const AddressStep = ({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddAddress = () => {
    navigate(`/my-address/create`, {
      state: { from: location.pathname, step: 1 },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        📍 Dirección de Envío
      </h2>

      {addresses.length === 0 ? (
        <div>No tienes direcciones registradas</div>
      ) : (
        addresses.map((address) => (
          <Card
            onClick={() => setSelectedAddressId(address.id)}
            key={address.id}
            className={`rounded-2xl shadow-md hover:shadow-lg transition hover:cursor-pointer ${
              selectedAddressId === address.id
                ? "border-blue-700"
                : "border-grey-800"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                {address.street}, {address.city}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>País:</strong> {address.country}
              </p>
              <p>
                <strong>Código Postal:</strong> {address.postal_code}
              </p>
            </CardContent>
          </Card>
        ))
      )}

      <div className="flex justify-end">
        <Button variant="secondary" onClick={handleAddAddress}>
          ➕ Agregar dirección
        </Button>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button
          variant={"outline"}
          className={`${
            selectedAddressId ? "bg-blue-500 text-white" : "bg-muted"
          } hover:bg-blue-700 hover:text-white`}
          onClick={nextStep}
          disabled={!selectedAddressId}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddressStep;
