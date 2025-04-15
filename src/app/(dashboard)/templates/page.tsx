/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGetAllTemplatesIncludingPendingQuery, useDeleteTemplateMutation } from "@/store/features/apislice"
import SelectedPreview from "@/components/page/broadcast/selectTemplatepreview"
import toast from "react-hot-toast"
import Link from "next/link"

export default function TemplatesGrid() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [query, setQuery] = useState("")

  const [deleteTemplate] = useDeleteTemplateMutation()

  const { data:templates} = useGetAllTemplatesIncludingPendingQuery({})

  




const filteredTemplates = templates?.filter((template: any) => template.name.toLowerCase().includes(query.toLowerCase()));

const handleDelete = (template_name: string) => {
  const promise = deleteTemplate(template_name).unwrap()

  toast.promise(promise, {
    loading: "Deleting template...",
    success: "Template deleted successfully!",
    error: (error: any) =>
      error?.data?.message || "An unexpected error occurred.",
  });

}

  const openModal = (template:any) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="p-4 md:p-6">
      <div className=" mx-auto">
        <div className="flex items-center justify-between mb-6 text-white">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Link href="templates/create">
          <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            <span className="">Add template</span>
          </Button>
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search here..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
<div className="h-[calc(100vh-250px)]  overflow-y-scroll no-scrollbar">
<div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredTemplates?.map((template:any, index:number) => (
            <TemplateCard key={index} template={template} onView={() => openModal(template)} handleDelete={handleDelete}/>
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

function TemplateCard({ template, onView, handleDelete }: any) {
  return (
    <div className="bg-backgroundColor border-primary rounded-lg overflow-hidden shadow-md relative">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{template.name}</h3>
            <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full">{template.category}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-700/50" onClick={()=>handleDelete(template.name)}>
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
              <p className="text-white text-sm">{template.status }</p>
            </div>

            {/* <div>
              <span className="text-blue-400 text-sm">Created at</span>
              <p className="text-white text-sm">{template.createdAt}</p>
            </div> */}
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

function TemplateModal({ isOpen, template, onClose }: any) {
  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center justify-between ">
          <DialogTitle className="text-lg font-medium">Preview</DialogTitle>
          
        </DialogHeader>
        <SelectedPreview selectedTemplate={template} />
        
              </DialogContent>
    </Dialog>
  )
}
