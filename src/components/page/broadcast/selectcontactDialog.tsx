import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Upload, Users } from "lucide-react";

// Mock data for segments
const segments = [
  { id: 1, name: "Recent Customers", contacts: 156 },
  { id: 2, name: "Newsletter Subscribers", contacts: 892 },
  { id: 3, name: "Abandoned Cart", contacts: 43 },
  { id: 4, name: "High-Value Customers", contacts: 127 },
  { id: 5, name: "First-Time Buyers", contacts: 234 },
  { id: 6, name: "Loyalty Program Members", contacts: 567 },
  { id: 7, name: "Birthday This Month", contacts: 89 },
  { id: 8, name: "Inactive Customers", contacts: 345 },
  { id: 1, name: "Recent Customers", contacts: 156 },
  { id: 2, name: "Newsletter Subscribers", contacts: 892 },
  { id: 3, name: "Abandoned Cart", contacts: 43 },
  { id: 4, name: "High-Value Customers", contacts: 127 },
  { id: 5, name: "First-Time Buyers", contacts: 234 },
  { id: 6, name: "Loyalty Program Members", contacts: 567 },
  { id: 7, name: "Birthday This Month", contacts: 89 },
  { id: 8, name: "Inactive Customers", contacts: 345 },
];

function SelectContactDialog({children}:{children:React.ReactNode}) {
  return (
   
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Select Recipients</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="segments" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="segments" className="gap-2">
                <Users className="w-4 h-4" />
                Shopify Segments
              </TabsTrigger>
              <TabsTrigger value="excel" className="gap-2">
                <Upload className="w-4 h-4" />
                Excel Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="segments" className="mt-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search segments..."
                    className="pl-9"
                  />
                </div>
                
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <RadioGroup>
                    {segments.map((segment) => (
                      <div
                        key={segment.id}
                        className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100"
                      >
                        <RadioGroupItem value={segment.id.toString()} id={`segment-${segment.id}`} />
                        <Label
                          htmlFor={`segment-${segment.id}`}
                          className="flex-1 flex items-center justify-between cursor-pointer"
                        >
                          <span>{segment.name}</span>
                          <span className="text-sm text-gray-500">
                            ({segment.contacts} contacts)
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="excel" className="mt-4">
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-lg font-medium">Upload Excel File</p>
                      <p className="text-sm text-gray-500">
                        Drag and drop your Excel file here, or click to browse
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-500">
                    Supported formats: .xlsx, .xls (max 5MB)
                  </p>
                </div>

                <div className="rounded-lg border p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Template Requirements</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>First column: Email (required)</li>
                    <li>Second column: First Name (optional)</li>
                    <li>Third column: Last Name (optional)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button>Confirm Selection</Button>
          </div>
        </DialogContent>
      </Dialog>

  );
}

export default SelectContactDialog;