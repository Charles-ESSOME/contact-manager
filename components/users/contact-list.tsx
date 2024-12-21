"use client"

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ClipboardCopy, Edit, MoreHorizontal, Trash2, } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Filters from "./filters";
import { User, UserCategory } from "@/types/User";

interface UsersListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  currentPage: number;
  itemsPerPage: number;
}

const SortableHeader: React.FC<{ column: any; title: string }> = ({ column, title }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="flex items-center gap-1 p-0"
  >
    {title}
    <ArrowUpDown className="h-4 w-4" />
  </Button>
);

const createColumns = (
  onEdit: (user: User) => void,
  onDelete: (id: string) => void
): ColumnDef<User>[] => [
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
      accessorKey: "firstName",
      header: ({ column }) => <SortableHeader column={column} title="First name" />,
      cell: ({ row }) => <div className="capitalize">{row.getValue("firstName")}</div>,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => <SortableHeader column={column} title="Last name" />,
      cell: ({ row }) => <div className="capitalize">{row.getValue("lastName")}</div>,
    },
    {
      accessorKey: "emails",
      header: ({ column }) => <SortableHeader column={column} title="Emails" />,
      cell: ({ row }) => <div>
        {(row.getValue("emails") as string[]).map((value ,i ) => (
          <div className="lowercase" key={i}>- {value}</div>
        ))}

      </div>
    },
    {
      accessorKey: "phones",
      header: ({ column }) => <SortableHeader column={column} title="Phones" />,
      cell: ({ row }) => <div>{row.getValue("phones")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div className={`capitalize px-2 inline-flex flex text-xs leading-5 font-semibold rounded-full
         ${row.getValue("category") === UserCategory.VIP ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`
      }>{
          row.getValue('category')}
      </div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.getValue("status") ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
        >
          {row?.getValue("status") ? 'ACTIVE' : "Inactive"}
        </span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <UserActions user={row.original} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];

const UserActions: React.FC<{
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}> = ({ user, onEdit, onDelete }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText((user?.firstName ?? '') + ' ' + (user?.lastName ?? '') || "")}
        className="text-gray-600 hover:text-gray-900 mr-4"
      >
        <ClipboardCopy size={18}/>
        Copy user name
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900 mr-4">
      <Edit size={18} />
        Edit user</DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onDelete(user)}
        className="text-red-600"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const UsersList: React.FC<UsersListProps> = ({ users, onEdit, onDelete }) => {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => createColumns(onEdit, onDelete), [onEdit, onDelete]);

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <Filters table={table} />

      <div className="rounded-md border h-[65vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
