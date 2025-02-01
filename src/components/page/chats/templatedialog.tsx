/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useGetAllTemplatesQuery } from "@/store/features/apislice";
import SelectedTemplateForm from "./selectedTemplate";

interface DialogContentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TemplateBuilder({ open, setOpen }: DialogContentProps) {
  const { data: templates, isLoading } = useGetAllTemplatesQuery({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  
  console.log(selectedTemplate);

  useEffect(() => {
    if(templates){
        setSelectedTemplate(templates[0]);
    }
  },[templates]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[1000px] p-6 gap-6 bg-blue-50 overflow-y-auto max-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr,300px] gap-10">
          {/* Select Template Section */}
          <ScrollArea className="overflow-scroll h-[80vh] no-scrollbar">
            <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">
              Select Template
            </h2>
            <div className="space-y-4 relative">
              <div className="bg-blue-50 bg-background pt-0 pb-4 z-10">
                <Search className="absolute left-3 top-2.5 h-4 w-4" />
                <Input placeholder="Search here..." className="pl-9" />
              </div>
              <div className="space-y-2 ">
                {!isLoading && templates &&
                  templates.map((template: any) => (
                    <div
                      key={template.name}
                      className={`p-3 flex gap-3  cursor-pointer border-b-4 border-blue-700 ${selectedTemplate?.name===template?.name?"bg-gray-50":"hover:bg-gray-50"}`}
                      onClick={()=>setSelectedTemplate(template)}
                    >
                      <div className="min-w-10 min-h-10 bg-[linear-gradient(180deg,#1B2A48_0%,#4166AE_100%)] rounded" />
                      <div>
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {
                            template.components.find(
                              (component:any) => component.type === "BODY"
                            )?.text
                          }
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>

          {/* Add Content Section */}
          {/* <div>
            <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">
              Add Content
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Image</h3>
                <p className="text-xs text-muted-foreground">
                  Upload an image under 5 MB with a recommended aspect ratio of
                  1.91:1.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  variant="secondary"
                  className="bg-blue-500 hover:bg-blue-400 text-white justify-start text-sm"
                  onClick={handleUploadClick}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Body</h3>
                <p className="text-xs text-muted-foreground">
                  Enter the {"{1}"} parameter for your message.
                </p>
                <div className="p-2 border rounded-lg bg-white text-sm">
                  {"{1}"}
                </div>
                <Input
                  placeholder="Enter the parameter for {1}"
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">CTA Button</h3>
                <p className="text-xs text-muted-foreground">
                  Enter the URL for the CTA Button
                </p>
                <Input placeholder="Enter the URL" className="text-sm" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Choose a Bot</h3>
                <p className="text-xs text-muted-foreground">
                  Bot to engage when recipient replies
                </p>
                <Input placeholder="Transfer Bot" className="text-sm" />
              </div>
            </div>
          </div> */}
          <SelectedTemplateForm SelectedTemplate={selectedTemplate}/>

          {/* Preview Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">
              Preview
            </h2>
            <div className="space-y-4 flex flex-col">
              <Card className="p-3">
                {uploadedImage ? (
                  <Image
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded preview"
                    width={300}
                    height={300}
                    className="aspect-square rounded-lg mb-3 object-cover"
                  />
                ) : (
                  <Image
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
                    alt="Product preview"
                    width={300}
                    height={300}
                    className="aspect-square rounded-lg mb-3"
                  />
                )}
                <h3 className="font-medium text-sm mb-2">
                  Exclusive Offer on [Product Name]!
                </h3>
                <div className="space-y-1.5 text-xs">
                  <p>🔥 Grab It Before It&apos;s Gone!</p>
                  <p>
                    Looking for [Product Name]? We&apos;ve got the best deal for
                    you!
                  </p>
                  <p>💫 Discounted Price: [Price] 📦 Free Delivery</p>
                  <p>✨ Order Now on [E-Commerce Website Name]!</p>
                  <p>
                    Message us on WhatsApp to get the link and claim your offer.
                  </p>
                  <p>👉 Click Here to Chat Now [Insert WhatsApp Link]</p>
                </div>
              </Card>
              <Button className="self-end bg-blue-500">Send</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
