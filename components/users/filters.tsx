import { ChevronDown, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CSVActions } from "./data-csv";
import { Input } from "../ui/input";

export default function Filters({ table }) {

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="w-full sm:flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 sm:left-3 top-2.5 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search contact..."
              className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border rounded-lg w-full h-9 sm:h-10 text-sm"
              value={(table?.getColumn("lastName")?.getFilterValue() as string || table?.getColumn("firstName")?.getFilterValue() as string) ?? ""}
              onChange={(event: { target: { value: string } }) => {
                (table.getColumn("firstName"))?.setFilterValue(event.target.value);
                (table.getColumn("lastName"))?.setFilterValue(event.target.value);
              }}
            />
          </div>
        </div>
        
        <div className="flex flex-row flex-wrap gap-2 justify-between sm:justify-end">
          <div className="flex-shrink-0 flex gap-2">
            <CSVActions />
          </div>
          
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-9 sm:h-10 px-2.5 sm:px-3.5 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Columns</span>
                  <span className="inline sm:hidden">Cols</span>
                  <ChevronDown className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[8rem] max-h-[60vh] overflow-y-auto">
                {table?.getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-xs sm:text-sm py-1.5 px-2"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
