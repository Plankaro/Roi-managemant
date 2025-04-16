/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Trash2, Check, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCreateTagsMutation, useDeleteTagMutation,  useGetTagforProspectQuery,useCreateTagforProspectMutation,useDeleteTagForProspectMutation } from "@/store/features/apislice"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import z from "zod"
import toast from "react-hot-toast"




export default function TagsSelect({}) {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newTagName, setNewTagName] = useState("")


  const selectedProspect = useSelector((state: RootState) => state.Prospect.selectedProspect)
  const { data: tags } = useGetTagforProspectQuery(selectedProspect?.id)



  const [createTag] = useCreateTagsMutation()
  const[deleteTag]=useDeleteTagMutation()
  const [createTagforProspect]=useCreateTagforProspectMutation()
  const [deleteTagForProspect]=useDeleteTagForProspectMutation()




  // Sample tags - replace with your actual data source
  
  const filteredTags = tags?.tagsNotForProspect?.filter(
    (tag:any) =>
      tag.tagName.toLowerCase().includes(searchQuery.toLowerCase()) 
      
  )



  const handleSelectTag = (id: string) => {
    const payload = {
      tagId: id,
      ProspectId: selectedProspect?.id,
    }

    const promise = createTagforProspect(payload).unwrap()
    toast.promise(promise, {
      loading: "Adding tag...",
      success: "Tag added successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred.",
    })

  }

  const handleRemoveTag = async(tagId: string) => {
    const promise = deleteTagForProspect({id:tagId, ProspectId:selectedProspect?.id??""}).unwrap()
    toast.promise(promise, {
      loading: "Removing tag...",
      success: "Tag removed successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred.",
    })
  }

  const handleCreateTag = () => {
    const payload = {
      tagName: newTagName,
    }
    const parsedPayload = z
      .object({
        tagName: z.string(),
      })
      .parse(payload)
    const promise = createTag(parsedPayload).unwrap()
    toast.promise(promise, {
      loading: "Creating tag...",
      success: "Tag created successfully!",
      error: "Failed to create tag",
    })
    setModalOpen(false)
    setNewTagName("")
  }

  const handleDeleteTag = (tag: any, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the CommandItem onSelect
  setTagToDelete(tag)
  setDeleteDialogOpen(true)
  }

  const confirmDeleteTag = () => {
    if (tagToDelete) {
      // Remove from available tags
      const promise = deleteTag({id:tagToDelete.id}).unwrap()
      toast.promise(promise, {
        loading: "Deleting tag...",
        success: "Tag deleted successfully!",
        error: (error: any) => error?.data?.message || "An unexpected error occurred.",
      })
      setDeleteDialogOpen(true)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col flex-wrap gap-2 min-h-10 p-1">
        

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-primary-500 hover:text-primary-600 hover:bg-primary-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Tags
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0 bg-white border border-slate-200 shadow-lg" align="center">
            <Command>
              <CommandInput
                placeholder="Search tags..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>No tags found</CommandEmpty>
                <CommandGroup>
                  {filteredTags && filteredTags.map((tag:any) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => handleSelectTag(tag.id)}
                      className="cursor-pointer hover:bg-primary-50 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary-500 opacity-0 group-data-[selected]:opacity-100" />
                        {tag.tagName}
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-full text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          onClick={(e) => handleDeleteTag(tag, e)}
                          aria-label="Delete tag"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CommandItem>
                  ))}
                  <CommandItem
                    className="border-t border-slate-200 text-primary-600 cursor-pointer hover:bg-primary-50"
                    disabled={tags?.tagsForProspect?.length >= 3}
                    onSelect={() => {
                      setModalOpen(true)
                      setOpen(false)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create new tag
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

<div className="w-full flex gap-3 self-start flex-wrap">
        {tags?.tagsForProspect?.map((tag:any) => (
          <Badge
            key={tag.id}
            className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1 px-3 py-1 "
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag.tagName}
            <X
              className="h-3 w-3 cursor-pointer ml-1"
              onClick={() => handleRemoveTag(tag.id)}
              aria-label="Remove tag"
            />
          </Badge>
        ))}
      </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-blue-50">
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="border-slate-300"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)} className="border-slate-300 text-slate-700">
                Cancel
              </Button>
              <Button onClick={handleCreateTag} className="bg-primary-600 hover:bg-primary-700 text-white">
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-blue-50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tag</AlertDialogTitle>
            <AlertDialogDescription >
              Are you sure you want to delete the tag &quot;{tagToDelete?.tagName}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTag} className="bg-blue-500 hover:bg-blue-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

