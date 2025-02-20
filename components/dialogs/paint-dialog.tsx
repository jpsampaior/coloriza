import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaintForm } from "../forms/paint-form";

interface PaintDialogProps {
  children: React.ReactNode;
}

export function PaintDialog({ children }: PaintDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova tinta ao sistema</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar uma nova tinta ao sistema.
            Caso a tinta já exista, você pode editá-la na tabela de estoques.
          </DialogDescription>
        </DialogHeader>
        <PaintForm />
      </DialogContent>
    </Dialog>
  );
}
