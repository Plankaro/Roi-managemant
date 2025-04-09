"use client"

import { useState } from "react"
import { Search, Plus, Trash2, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

export default function TemplatesGrid() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Sample data for template cards
  const templates = Array(12).fill({
    title: "Title of Templates",
    tag: "transactional",
    status: "Approved",
    category: "Marketing",
    createdAt: "12/02/2025, 12:01 pm",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat netus facilisis id placeat et dictum ornare.",
    firstSale: "First Sale of 2025",
    saleDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat netus facilisis id placeat et dictum ornare.",
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat netus facilisis id placeat et dictum ornare.",
  })

  const openModal = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="p-4 md:p-6">
      <div className=" mx-auto">
        <div className="flex items-center justify-between mb-6 text-white">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add template</span>
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search here..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 rounded-lg"
          />
        </div>
<div className="h-[calc(100vh-250px)]  overflow-y-scroll no-scrollbar">
<div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {templates.map((template, index) => (
            <TemplateCard key={index} template={template} onView={() => openModal(template)} />
          ))}
        </div>
</div>
        
      </div>

      <TemplateModal
        isOpen={!!selectedTemplate}
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </div>
  )
}

function TemplateCard({ template, onView }) {
  return (
    <div className="bg-backgroundColor border-primary rounded-lg overflow-hidden shadow-md relative">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{template.title}</h3>
            <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full">{template.tag}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-700/50">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-blue-400 text-sm">Status: </span>
            <span className="text-white text-sm">{template.status}</span>
          </div>

          <div className="flex justify-between">
            <div>
              <span className="text-blue-400 text-sm">Category</span>
              <p className="text-white text-sm">{template.category}</p>
            </div>

            <div>
              <span className="text-blue-400 text-sm">Created at</span>
              <p className="text-white text-sm">{template.createdAt}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="link"
              className="text-red-400 hover:text-red-300 p-0 h-auto font-normal flex items-center gap-1"
              onClick={onView}
            >
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateModal({ isOpen, template, onClose }) {
  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
          <DialogTitle className="text-lg font-medium">Preview</DialogTitle>
          <DialogClose className="h-6 w-6 rounded-full hover:bg-slate-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
              <ImageIcon className="h-16 w-16 text-slate-300" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-lg">{template.title}</h3>
            <p className="text-sm text-slate-600">{template.description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">{template.firstSale}</h4>
            <p className="text-sm text-slate-600">{template.saleDescription}</p>
          </div>

          <p className="text-sm text-slate-600">{template.additionalInfo}</p>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Shop Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
