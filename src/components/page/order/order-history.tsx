import { ChevronRight } from "lucide-react"

export default function HistoryView() {
  const orders = [
    {
      id: "1234",
      amount: 678.1,
      date: "25/01/2025",
      status: "Fulfilled",
    },
    {
      id: "1234",
      amount: 678.1,
      date: "25/01/2025",
      status: "Fulfilled",
    },
    {
      id: "1234",
      amount: 678.1,
      date: "25/01/2025",
      status: "Fulfilled",
    },
    {
      id: "1234",
      amount: 678.1,
      date: "25/01/2025",
      status: "Fulfilled",
    },
  ]

  return (
    <div className="w-[320px] rounded-3xl bg-transparent border border-primary p-6 text-white">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">History</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="space-y-1">
              <p className="text-gray-400">Total Spent</p>
              <p className="text-xl text-primary">₹ {orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2)}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-gray-400">Orders</p>
              <p className="text-xl">{orders.length}</p>
            </div>
          </div>

          <div className="h-0.5 w-full bg-blue-600/30 my-4" />

          <div className="divide-y divide-[#2D477A]">
            {orders.map((order, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-2  hover:bg-white/5 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">#{order.id}</p>
                  <p className="text-lg">₹ {order.amount.toFixed(2)}</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-sm">{order.date}</p>
                  <p className="text-sm text-blue-500">{order.status}</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-2 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

