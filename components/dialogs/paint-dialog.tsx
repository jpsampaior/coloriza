import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaintForm } from "../forms/paint-form";
import { Paint } from "@prisma/client";

interface PaintDialogProps {
  children: React.ReactNode;
  paint?: Paint;
}

export function PaintDialog({ children, paint }: PaintDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!paint
              ? "Adicionar nova tinta ao sistema "
              : "Editar tinta cadastrada"}
          </DialogTitle>
          <DialogDescription>
            {paint
              ? "Preencha os campos abaixo para adicionar uma nova tinta ao sistema. Caso a tinta já exista, você pode editá-la na tabela de estoques."
              : "Preencha os campos abaixo para editar uma tinta cadastrada."}
          </DialogDescription>
        </DialogHeader>
        <PaintForm paint={paint} />
      </DialogContent>
    </Dialog>
  );
}
