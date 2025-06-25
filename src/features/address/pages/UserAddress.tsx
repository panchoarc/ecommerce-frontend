import { useUserAddress } from "@/features/user/hooks/useAddress";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import ConfirmDeleteDialog from "@/shared/ui/ConfirmDeleteDialog";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

import AddressService from "@/features/address/services/AddressService";
import { toast } from "sonner";

const UserAddress = () => {
  const { addresses, pagination, setPage, loading, refetchAddresses } =
    useUserAddress();

  const handleDelete = async (id: number) => {
    try {
      await AddressService.deleteAddress(id);
      toast.success("La dirección se ha eliminado correctamente");
      refetchAddresses();
    } catch (error) {
      console.error(error);
      toast.error("Se ha producido un problema al eliminar la dirección");
    }
  };

  const handlePrev = () => {
    if (pagination.currentPage > 0) {
      setPage(pagination.currentPage);
    }
  };

  const handleNext = () => {
    if (pagination.currentPage + 1 < pagination.totalPages) {
      setPage(pagination.currentPage + 2);
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis Direcciones</h1>
        <Link to="/my-address/create" className="flex items-center">
          <Button variant="default" className="bg-yellow-400 my-6">
            Add New Address
          </Button>
        </Link>
      </div>

      {addresses.length > 0 ? (
        <>
          <div className="flex flex-col w-full gap-4">
            {addresses.map((address) => (
              <Card
                key={address.id}
                className="rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    {address.street}, {address.city}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Link to={`/my-address/edit/${address.id}`}>
                      <Button variant="ghost" size="icon">
                        <Pencil size={16} />
                      </Button>
                    </Link>

                    <ConfirmDeleteDialog
                      onConfirm={() => handleDelete(address.id)}
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      }
                    />
                  </div>
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
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 pt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={pagination.currentPage === 0}
              className="gap-1"
            >
              <ChevronLeft size={16} /> Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {pagination.currentPage + 1} de {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={pagination.currentPage + 1 >= pagination.totalPages}
              className="gap-1"
            >
              Siguiente <ChevronRight size={16} />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg">No tienes direcciones guardadas.</p>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
