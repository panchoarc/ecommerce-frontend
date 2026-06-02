"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import TablePagination from "@/features/admin/components/TablePagination";
import PageSizeSelector from "@/shared/ui/pagesizeselector";

type PaginationProps = {
  currentPage: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pagination?: PaginationProps;
  filterColumn?: string;
  renderTopActions?: React.ReactNode;
};

export function DataTable<TData>({
  data,
  columns,
  pagination,
  filterColumn = "name",
  renderTopActions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination
        ? {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          }
        : undefined,
    },
    onPaginationChange: (updater) => {
      if (!pagination) return;

      const newState =
        typeof updater === "function"
          ? updater({
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            })
          : updater;

      pagination.onPageChange(newState.pageIndex + 1);
      pagination.onPageSizeChange(newState.pageSize);
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full h-full flex flex-col flex-1 overflow-hidden">
      <div className="h-full min-h-0 flex flex-col">
        {/* 🔹 TOP ACTIONS */}
        {renderTopActions && (
          <div className="shrink-0 py-6 px-7">{renderTopActions}</div>
        )}

        {/* 🔹 TOOLBAR */}
        <div className="shrink-0 py-4 px-5 flex w-full justify-between gap-4">
          <Input
            placeholder="Filter..."
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn(filterColumn)?.setFilterValue(e.target.value)
            }
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 🔹 TABLE */}
        <div className="flex-1 min-h-0 overflow-auto">
          <Table className="w-full table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* 🔹 PAGINATION */}
        {pagination && (
          <div className="shrink-0 mt-auto flex items-center justify-end gap-3 py-4 px-5">
            <TablePagination table={table} pagination={pagination} />

            <PageSizeSelector
              value={pagination.pageSize}
              onChange={pagination.onPageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
