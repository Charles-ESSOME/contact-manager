import { ChevronDown, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CSVActions } from "./data-csv";
import { Input } from "../ui/input";

export default function Filters({ table }) {

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Seearch contact..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={(table?.getColumn("lastName")?.getFilterValue() as string || table?.getColumn("firstName")?.getFilterValue() as string) ?? ""}
              onChange={(event: { target: { value: string } }) => {
                (table.getColumn("firstName"))?.setFilterValue(event.target.value)
                  (table.getColumn("lastName"))?.setFilterValue(event.target.value)
              }
              }
            />
          </div>
        </div>
        <CSVActions />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}