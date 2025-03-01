import { deleteRecord } from "@/actions/database/deleteRecord";
import { ConfirmDeleteDialog } from "@/components/dialogs/confirm-delete-dialog";
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
import { toast } from "sonner";

export function ActionsCell({ paint }: { paint: Paint }) {
  function handleDelete() {
    toast.promise(deleteRecord("paint", paint.id), {
      loading: "Excluindo registro...",
      success: () => {
        return "Tinta excluída com sucesso!";
      },
      error: (error) => {
        return `Erro ao excluir a tinta: ${error.message}`;
      },
    });
  }

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
        <ConfirmDeleteDialog handleDelete={handleDelete}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Excluir tinta
          </DropdownMenuItem>
        </ConfirmDeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
