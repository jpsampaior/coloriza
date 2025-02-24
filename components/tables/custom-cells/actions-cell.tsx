import { PaintDialog } from "@/components/dialogs/paint-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paint } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

export function ActionsCell({ paint }: { paint: Paint }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(paint.id)}
        >
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <PaintDialog paint={paint}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Editar tinta
          </DropdownMenuItem>
        </PaintDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
