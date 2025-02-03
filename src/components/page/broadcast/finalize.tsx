import { ScrollArea } from "@/components/ui/scroll-area"

interface BroadcastInfo {
  broadcastName: string
  tags: string[]
  scheduledDateTime: string
  recipients: string
  retryOnFailed: string
  replyAction: string
  estimatedSpend: number
}

const broadcastInfo: BroadcastInfo = {
  broadcastName: "ABC broadcast",
  tags: [],
  scheduledDateTime: "Jan 24, 2025 at 10 am",
  recipients: "22 contacts",
  retryOnFailed: "No",
  replyAction: "Transfer Bot",
  estimatedSpend: 5000,
}

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center py-2 gap-20 text-gray-200">
    <span className="w-48">{label}</span>
    <span className="text-white">: {value}</span>
  </div>
)

export default function Finalize() {
  return (
    <ScrollArea className="flex-1 h-full no-scrollbar overflow-scroll rounded-3xl">
      <div className=" p-8">
        <div className="space-y-8 max-w-3xl">
          {/* Estimated Spend Section */}
          <div className="space-y-1 flex justify-between">
            <div className="">
            <h2 className="text-xl font-medium text-white">Estimated Spend</h2>
            <p className="text-sm text-gray-400">Spend is calculated according to recipients country code</p>
            </div>
            <div className="mt-4">

              <span className="text-4xl font-semibold text-white">₹{broadcastInfo.estimatedSpend}</span>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white">Information</h2>
            <div className="space-y-2">
              <InfoRow label="Broadcast Name" value={broadcastInfo.broadcastName} />
              <InfoRow
                label="Tags"
                value={broadcastInfo.tags.length ? broadcastInfo.tags.join(", ") : "No tags added"}
              />
              <InfoRow label="Scheduled Date & Time" value={broadcastInfo.scheduledDateTime} />
              <InfoRow label="Recipients" value={broadcastInfo.recipients} />
              <InfoRow label="Retry on failed message" value={broadcastInfo.retryOnFailed} />
              <InfoRow label="Reply Action" value={broadcastInfo.replyAction} />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

