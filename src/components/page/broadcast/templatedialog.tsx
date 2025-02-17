/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useGetAllTemplatesQuery } from "@/store/features/apislice"
import SelectedTemplateForm from "./selectedTemplate"

interface DialogContentProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function TemplateBuilder({ open, setOpen }: DialogContentProps) {
  const { data: templates, isLoading } = useGetAllTemplatesQuery({})
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)
  const [filteredTemplate, setFilteredTemplate] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  console.log(templates)

  useEffect(() => {
    if (templates && templates.length > 0) {
      setSelectedTemplate(templates[0])
      setFilteredTemplate(templates)
    }
  }, [templates])

  useEffect(() => {
    if (searchQuery) {
      const filtered = templates?.filter((template: any) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredTemplate(filtered)
    } else {
      setFilteredTemplate(templates)
    }
  }, [searchQuery, templates])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[1300px] p-6 gap-6 bg-blue-50  h-[80vh] no-scrollbar overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10">
          {/* Select Template Section */}
          <ScrollArea className="overflow-scroll h-[80vh] no-scrollbar">
            <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">Select Template</h2>
            <div className="space-y-4 relative">
              <div className="bg-blue-50 bg-background pt-0 pb-4 z-10">
                <Search className="absolute left-3 top-2.5 h-4 w-4" />
                <Input placeholder="Search here..." className="pl-9"  value={searchQuery} onChange={(e) =>{setSearchQuery(e.target.value)}}/>
              </div>
              <div className="space-y-2 ">
                {!isLoading &&
                  filteredTemplate &&
                  filteredTemplate?.map((template: any) => (
                    <div
                      key={template.name}
                      className={`p-3 flex gap-3 cursor-pointer border-b-4 border-blue-700 ${
                        selectedTemplate?.name === template?.name ? "bg-gray-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="min-w-10 min-h-10 bg-[linear-gradient(180deg,#1B2A48_0%,#4166AE_100%)] rounded" />
                      <div>
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {template.components.find((component: any) => component.type === "BODY")?.text}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>

          {/* Template Form and Preview Section */}
          <SelectedTemplateForm selectedTemplate={selectedTemplate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

