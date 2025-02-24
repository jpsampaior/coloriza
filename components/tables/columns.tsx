"use client";

import { getDateByString, getLabelByFluidAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./custom-cells/actions-cell";

export const columnsPaints: ColumnDef<any>[] = [
  {
    accessorKey: "displayId",
    header: "ID",
    cell: ({ row }) => (
      <div>{row.getValue("displayId") || "Não cadastrado"}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("name") || "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: "Fabricante",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("manufacturer") || "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="space-x-1">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: row.getValue("color") }}
        />
        <span>{row.getValue("color") || "Não cadastrado"}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"));

      return (
        <div className="capitalize">{`${amount} ${getLabelByFluidAmount(
          amount
        )}`}</div>
      );
    },
  },
  {
    accessorKey: "expirationDate",
    header: "Validade",
    cell: ({ row }) => (
      <div>
        {getDateByString(row.getValue("expirationDate")) || "Não cadastrado"}
      </div>
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
