import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export function UTMParametersDialog({children}: {children: React.ReactNode}) {
    return (
      <Dialog>
        <DialogTrigger asChild>
         {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">UTM Parameters</DialogTitle>
          </DialogHeader>
  
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <code className="text-sm text-gray-600 break-all">
                  {'{your_link}'}
                </code>
              </div>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-4">UTM Parameter Settings</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="utm_source" />
                  <div className="space-y-1.5">
                    <Label htmlFor="utm_source" className="text-base">
                      UTM source (The referrer- eg: Google, Newsletter)
                    </Label>
                    <Input placeholder="ROI Magnet" />
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <Checkbox id="utm_medium" />
                  <div className="space-y-1.5">
                    <Label htmlFor="utm_medium" className="text-base">
                      UTM medium (Marketing medium- eg: cpc, banner, email)
                    </Label>
                    <Input placeholder="Whatsapp" />
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <Checkbox id="utm_campaign" />
                  <div className="space-y-1.5">
                    <Label htmlFor="utm_campaign" className="text-base">
                      UTM campaign name (Product, promo code or slogan- eg: spring_sale)
                    </Label>
                    <Input placeholder="ABC Broadcast" />
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <Checkbox id="utm_id" />
                  <div className="space-y-1.5">
                    <Label htmlFor="utm_id" className="text-base">
                      UTM ID (The ads campaign ID)
                    </Label>
                    <Input placeholder="Enter campaign ID" />
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <Checkbox id="utm_term" />
                  <div className="space-y-1.5">
                    <Label htmlFor="utm_term" className="text-base">
                      UTM term (Identify the paid keywords)
                    </Label>
                    <Input placeholder="Enter keywords" />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-end gap-3 mt-6">
            <DialogTrigger asChild>
              <Button variant="outline">Exit</Button>
            </DialogTrigger>
            <Button>Proceed</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }