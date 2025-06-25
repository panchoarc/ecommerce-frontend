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
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { Link } from "react-router";

import CategoryService from "@/features/categories/services/CategoryService";
import { toast } from "sonner";

import DOMPurify from "isomorphic-dompurify";
import ConfirmDeleteDialog from "@/shared/ui/ConfirmDeleteDialog";

export type Categories = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export const createCategoriesColumns = (
  refetch: () => void
): ColumnDef<Categories>[] => [
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
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div className=" flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      const safeHtml = DOMPurify.sanitize(description);
      return (
        <div
          dangerouslySetInnerHTML={{ __html: safeHtml }}
          className="line-clamp-2 w-fit overflow-hidden text-ellipsis whitespace-nowrap"
        />
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <div className="flex items-center justify-start">
          {isActive ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      const handleDelete = async () => {
        try {
          console.log("Deleting category", category.id);
          await CategoryService.deleteCategory(category.id);
          // Opcional: mostrar mensaje de éxito
          toast.success("Category deleted successfully");
          refetch();
        } catch (error) {
          console.error("Error deleting category", error);
          toast.error("There was an error deleting the category.");
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
              <Link to={`/categories/edit/${category.id}`}>Edit</Link>
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
