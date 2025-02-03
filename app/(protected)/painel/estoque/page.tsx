import { paintStock } from "@/lib/mockDb";
import { format } from "date-fns";

export default function Estoque() {
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
          <ul className="flex gap-4">
            {paintStock.map((paint) => (
              <li
                key={paint.id}
                className="bg-white shadow-sm rounded-lg p-4 flex flex-col"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{ backgroundColor: paint.cor }}
                  />
                  <h3 className="text-xl font-semibold">{paint.nome}</h3>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>
                    <strong>Código:</strong> {paint.cor}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {paint.quantidade} litros
                  </p>
                  <p>
                    <strong>Validade:</strong>{" "}
                    {format(new Date(paint.validade), "dd/MM/yyyy")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div>
        <section className="px-6 py-4">
          <div className="space-x-2">
            <h2 className="inline text-2xl font-semibold mb-4">
              Lista de Tintas
            </h2>
            <p className="inline text-muted">
              (Visão geral de todas as tintas cadastradas no sistema)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
