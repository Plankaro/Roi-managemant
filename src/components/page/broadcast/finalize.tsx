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
  <div className="flex items-center py-2 gap-20 md:text-base text-xs">
    <span className="md:w-48 sm:w-32 w-28 ">{label}</span>
    <span className="">: {value}</span>
  </div>
)

export default function Finalize() {
  return (
    <ScrollArea className="flex-1 h-[80vh] no-scrollbar overflow-scroll rounded-3xl lg:bg-transparent lg:text-white text-black bg-blue-50">
      <div className="p-4 py-8 md:p-8">
        <div className="space-y-8 max-w-3xl">
          {/* Estimated Spend Section */}
          <div className="space-y-1 flex justify-between">
            <div className="">
            <h2 className="text-xl font-medium ">Estimated Spend</h2>
            <p className="text-sm text-gray-400">Spend is calculated according to recipients country code</p>
            </div>
            <div className="mt-4">

              <span className="text-4xl font-semibold md:text-xl text-base">₹{broadcastInfo.estimatedSpend}</span>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium ">Information</h2>
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
      <div>
      <div className="max-w-[400px] lg:hidden block m-auto">
          <div className="sticky top-6">
            <h2 className="text-xl font-semibold  mb-4 text-black">Preview</h2>
            <div className="bg-white rounded-2xl p-4 w-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-lg font-semibold">Exclusive Offer On Product</h2>
              </div>

            
                <img
                  src="https://images.unsplash.com/photo-1737223450924-5e1a0d5ab85f"
                  alt="Product"
                  className="aspect-square w-full max-h-60 object-cover rounded-lg mb-3"
                />

                <h3 className="text-gray-800 text-base font-medium mb-2">Exclusive Offer on [Product Name]!</h3>

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-orange-500">🔥</span>
                    <span className="font-medium">Grab It Before It&apos;s Gone!</span>
                  </p>

                  <p className="text-gray-700">Looking for [Product Name]? We&apos;ve got the best deal for you!</p>

                  <p className="flex items-center gap-2">
                    <span>⭐</span>
                    <span>Discounted Price: [Price]</span>
                    <span>📦</span>
                    <span>Free Delivery</span>
                  </p>

                  <p className="text-gray-700">🛒 Order Now on [E-Commerce Website Name]!</p>

                  <p className="text-gray-700">Message us on WhatsApp to get link to claim your offer.</p>

                  <p className="flex items-center gap-2 text-gray-700">
                    <span>📱</span>
                    <span className="text-blue-600 underline cursor-pointer">
                      Click Here to Chat Now [Insert WhatsApp Link]
                    </span>
                  </p>
                </div>
             
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

