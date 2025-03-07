import { Card } from "@/components/ui/card"

import { BroadcastDetailResult } from "@/zod/broadcast/broadcast";
import { format } from "date-fns";
import SelectedPreview from "./selectTemplatepreview";



export default function BroadcastDashboard({ selectedBroadcast }: { selectedBroadcast: BroadcastDetailResult | undefined }) {
  const createdDate = new Date(
    selectedBroadcast?.isScheduled && selectedBroadcast?.scheduledDate
      ? selectedBroadcast?.scheduledDate
      : selectedBroadcast?.createdAt || Date.now()
  );
  //console.log(selectedBroadcast);


  const formattedCreatedDate = format(createdDate, "P, p")
//console.log("selected",selectedBroadcast);
  return (
    <div className=" w-full">
      <Card className="  text-white bg-transparent border-primary border sm:p-6 p-2">
        {/* Estimated Spend Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="md:text-2xl text-base font-bold">Estimated Spend</h2>
            <span className="md:text-2xl text-base font-bold flex gap-3"><span>₹</span>{selectedBroadcast?.price}</span>
          </div>  
        </div>
        <hr  className="my-3"/>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Information Section */}
          <div>
            <h2 className="md:text-2xl sm:text-xl text-lg font-bold mb-6">Information</h2>
            <div className="space-y-4">
              <InfoRow label="Broadcast Name" value={selectedBroadcast?.name??""} />
       
              <InfoRow label="Category" value={selectedBroadcast?.type??""} />
              <InfoRow label="Scheduled Date & Time" value={formattedCreatedDate}/>
              <InfoRow label="Recipients" value={`${selectedBroadcast?.total_contact || 0} contacts`} />
            
              <InfoRow label="Created by" value={selectedBroadcast?.creator?.name??""} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="border border-primary flex  flex-col justify-center items-center p-4">
            <h2 className="text-2xl font-bold mb-6 ml-3">Template Used</h2>
            {/* <Card className="bg-white p-4 rounded-lg max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1627484164183-013c450886c2?q=80&w=800"
                    alt="Product Image"
                   height={200}
                   width={200}
                    className="object-cover"
                   
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Exclusive Offer on [Product Name]!</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Fire className="w-4 h-4 text-orange-500" />
                      Grab It Before It&apos;s Gone!
                    </p>
                    <p>Looking for [Product Name]? We&apos;ve got the best deal for you!</p>
                    <p>⭐ Discounted Price: [Price] 📦 Free Delivery</p>
                    <p>🏃 Order Now on [E-Commerce Website Name]!</p>
                    <p className="text-gray-600">Message us on WhatsApp to get the link and claim your offer.</p>
                    <Button className="w-full mt-2 bg-blue-500 text-white hover:bg-blue-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Click Here to Chat Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card> */}
                <SelectedPreview selectedTemplate={selectedBroadcast?.template} variant="dark"/>
          </div>
        </div>
      </Card>
    </div>
  )
}
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground min-w-[200px] md:text-base sm:text-sm text-xs">
        {label}
      </span>
      <span className="md:text-base sm:text-sm text-xs flex-1 break-words">: {value}</span>
    </div>
  );
}
