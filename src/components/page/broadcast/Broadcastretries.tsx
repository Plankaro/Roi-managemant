import { Card } from "@/components/ui/card"

interface BroadcastEntry {
  type: string
  scheduledOn: string
  status: string
  delivered: number
  failed: number
}

export default function BroadcastAndRetries() {
  const broadcasts: BroadcastEntry[] = [
    {
      type: "Broadcast",
      scheduledOn: "12/02/2025, 12:01 pm",
      status: "Completed",
      delivered: 123,
      failed: 15,
    },
    {
      type: "Retry 1",
      scheduledOn: "12/02/2025, 12:01 pm",
      status: "Completed",
      delivered: 123,
      failed: 15,
    },
    {
      type: "Retry 2",
      scheduledOn: "12/02/2025, 12:01 pm",
      status: "Completed",
      delivered: 123,
      failed: 15,
    },
    {
      type: "Retry 3",
      scheduledOn: "12/02/2025, 12:01 pm",
      status: "Completed",
      delivered: 123,
      failed: 15,
    },
  ]

  return (
    <Card className="w-full h-full bg-transparent border-primary  text-white p-6">
      <h2 className="text-xl font-semibold mb-4">Broadcast status</h2>
      <div className="space-y-4">
        {broadcasts.map((broadcast, index) => (
          <div key={index} className="border-b  last:border-b-0 pb-4 last:pb-0">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-4">
              <div>{broadcast.type}</div>
              <div>
                <div className="text-sm text-gray-400">Scheduled on</div>
                {broadcast.scheduledOn}
              </div>
              <div className="text-blue-500">{broadcast.status}</div>
              <div>
                <div className="text-sm text-gray-400">Delivered</div>
                {broadcast.delivered}
              </div>
              <div>
                <div className="text-sm text-gray-400">Failed</div>
                {broadcast.failed}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex justify-between items-start">
                <div>{broadcast.type}</div>
                <div className="text-blue-500">{broadcast.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Scheduled on</div>
                <div>{broadcast.scheduledOn}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-400">Delivered</div>
                  <div>{broadcast.delivered}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Failed</div>
                  <div>{broadcast.failed}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

