import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FlameIcon as Fire, MessageSquare } from "lucide-react"

export default function BroadcastDashboard() {
  return (
    <div className=" w-full">
      <Card className="  text-white bg-transparent border-primary border p-6">
        {/* Estimated Spend Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Estimated Spend</h2>
            <span className="text-2xl font-bold">₹5000</span>
          </div>
          <p className="text-sm text-muted-foreground">Spend is calculated according to recipients country code</p>
        </div>
        <hr  className="my-3"/>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Information Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Information</h2>
            <div className="space-y-4">
              <InfoRow label="Template Name" value="ABC broadcast" />
              <InfoRow label="Tags" value="No tags added" />
              <InfoRow label="Category" value="Marketing" />
              <InfoRow label="Scheduled Date & Time" value="Jan 24, 2025 at 10 am" />
              <InfoRow label="Recipients" value="22 contacts" />
              <InfoRow label="Broadcast Settings" value="UTM Parameters, Skip Rules" />
              <InfoRow label="Created by" value="Skinbae Support" />
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <Card className="bg-white p-4 rounded-lg max-w-sm mx-auto">
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
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground min-w-[140px]">{label}</span>
      <span>: {value}</span>
    </div>
  )
}

