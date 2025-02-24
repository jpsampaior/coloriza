import { fetchRecords } from "@/actions/database/fetchRecord";
import { PaintDialog } from "@/components/dialogs/paint-dialog";
import { columnsPaints } from "@/components/tables/columns";
import { GenericTable } from "@/components/tables/generic-table";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getDateByString, getLabelByFluidAmount } from "@/lib/utils";
import { Paint } from "@prisma/client";
import { PlusIcon } from "lucide-react";

export default async function Estoque() {
  const { data: paintStock } = await fetchRecords("paint");

  return (
    <div>
      <div className="bg-sky-50">
        <section className="p-6 space-y-4">
          <div className="space-x-2">
            <h2 className="inline text-2xl font-semibold">Baixa Quantidade</h2>
            <p className="inline text-muted">
              (Lista de tintas que estão com baixa quantidade)
            </p>
          </div>
          <Carousel>
            <CarouselContent className="gap-3 pl-5">
              {paintStock.map((paint: Paint) => (
                <CarouselItem
                  key={paint.id}
                  className="bg-white shadow-sm rounded-lg flex flex-col basis-auto p-4"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className="w-4 h-4 rounded-full shadow-md"
                      style={{ backgroundColor: paint.color }}
                    />
                    <h3 className="text-xl font-semibold">{paint.name}</h3>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Código:</strong> {paint.color}
                    </p>
                    <p>
                      <strong>Quantidade:</strong>{" "}
                      {`${paint.quantity} ${getLabelByFluidAmount(
                        paint.quantity
                      )}`}
                    </p>
                    <p>
                      <strong>Validade:</strong>{" "}
                      {getDateByString(paint.expirationDate)}
                    </p>
                    <p>
                      <strong>Fabricante: </strong> {paint.manufacturer}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div>
        <section className="px-6 py-4">
          <div className="flex justify-between">
            <div className="space-x-2">
              <h2 className="inline text-2xl font-semibold mb-4">
                Lista de Tintas
              </h2>
              <p className="inline text-muted">
                (Visão geral de todas as tintas cadastradas no sistema)
              </p>
            </div>
            <PaintDialog>
              <Button variant="outlineConstructive" className="space-x-1">
                <span>Adicionar Tinta</span>
                <PlusIcon />
              </Button>
            </PaintDialog>
          </div>
          <GenericTable columns={columnsPaints} data={paintStock} />
        </section>
      </div>
    </div>
  );
}
