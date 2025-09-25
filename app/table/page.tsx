import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "pay_001",
      amount: 100,
      status: "pending",
      email: "alice@example.com",
    },
    {
      id: "pay_002",
      amount: 760,
      status: "success",
      email: "bob@example.com",
    },
    {
      id: "pay_003",
      amount: 500,
      status: "failed",
      email: "charlie@example.com",
    },
    {
      id: "pay_004",
      amount: 250,
      status: "success",
      email: "david@example.com",
    },
    {
      id: "pay_005",
      amount: 920,
      status: "pending",
      email: "emma@example.com",
    },
    {
      id: "pay_006",
      amount: 340,
      status: "failed",
      email: "frank@example.com",
    },
    {
      id: "pay_007",
      amount: 780,
      status: "success",
      email: "grace@example.com",
    },
    {
      id: "pay_008",
      amount: 150,
      status: "pending",
      email: "henry@example.com",
    },
    {
      id: "pay_009",
      amount: 600,
      status: "failed",
      email: "isabella@example.com",
    },
    {
      id: "pay_010",
      amount: 420,
      status: "success",
      email: "jack@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}