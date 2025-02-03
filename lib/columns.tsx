import { ColumnDef } from "@tanstack/react-table";
import { parseISO, format } from "date-fns";

const columnsStudent: ColumnDef<any>[] = [
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
    accessorKey: "dataNascimento",
    header: "Data de nascimento",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("dataNascimento")
          ? format(parseISO(row.getValue("dataNascimento")), "dd/MM/yyyy")
          : "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "faixa",
    header: "Faixa",
    cell: ({ row }) => <BeltCell {...row} />,
  },
  {
    accessorKey: "turma",
    header: "Turma",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("turma") || "Não cadastrado"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusCell {...row} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        label="aluno"
        collection="students"
        setData={setStudents}
      />
    ),
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];
