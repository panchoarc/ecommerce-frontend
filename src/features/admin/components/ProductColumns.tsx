import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import ProductService from "@/features/products/services/ProductService";
import { toast } from "sonner";
import { Link } from "react-router";

import DOMPurify from "isomorphic-dompurify";
import ConfirmDeleteDialog from "@/shared/ui/ConfirmDeleteDialog";

export type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const createProductColumns = (
  refetch: () => void
): ColumnDef<Products>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return (
        <div
          title={name} // Tooltip con nombre completo
          className="max-w-[300px] truncate text-sm text-muted-foreground"
        >
          {name}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      const textOnly = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });

      return (
        <div
          title={textOnly.slice(0, 50)} // Tooltip completo
          className="max-w-[150px] truncate text-sm text-muted-foreground"
        >
          {textOnly}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = parseFloat(row.getValue("stock"));

      return <div className="font-medium">{stock}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      const handleDelete = async () => {
        try {
          await ProductService.deleteProduct(product.id);
          // Opcional: mostrar mensaje de éxito
          toast.success("Product deleted successfully");
          // Opcional: refrescar la tabla
          refetch();
        } catch (error) {
          console.error("Error deleting Product", error);
          toast.error("There was an error deleting the Product.");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/products/edit/${product.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className="w-full bg-transparent text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Evita que se propague el evento y cierre el menú
                }}
              >
                <ConfirmDeleteDialog
                  onConfirm={handleDelete}
                  trigger={<p className="w-full text-left">Delete</p>}
                />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
