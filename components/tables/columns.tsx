"use client";

import { getDateByString, getLabelByFluidAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./custom-cells/actions-cell";

export const columnsPaints: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id") || "Não cadastrado"}</div>,
  },
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nome") || "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "fabricante",
    header: "Fabricante",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("fabricante") || "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "cor",
    header: "Cor",
    cell: ({ row }) => (
      <div className="space-x-1">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: row.getValue("cor") }}
        />
        <span>{row.getValue("cor") || "Não cadastrado"}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantidade"));

      return (
        <div className="capitalize">{`${amount} ${getLabelByFluidAmount(
          amount
        )}`}</div>
      );
    },
  },
  {
    accessorKey: "validade",
    header: "Validade",
    cell: ({ row }) => (
      <div>{getDateByString(row.getValue("validade")) || "Não cadastrado"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const paint = row.original;

      return <ActionsCell paint={paint} />;
    },
  },
];
