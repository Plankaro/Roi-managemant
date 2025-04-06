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

type TagType = {
  id: string
  name: string
}

export default function TagsSelect() {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<TagType | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])

  // Sample tags - replace with your actual data source
  const [availableTags, setAvailableTags] = useState<TagType[]>([
    { id: "1", name: "New Customer" },
    { id: "2", name: "High Priority" },
    { id: "3", name: "Follow Up" },
    { id: "4", name: "Urgent" },
    { id: "5", name: "VIP" },
  ])

  const filteredTags = availableTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.some((selectedTag) => selectedTag.id === tag.id),
  )

  const handleSelectTag = (tag: TagType) => {
    setSelectedTags([...selectedTags, tag])
    setOpen(false)
  }

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId))
  }

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: `new-${Date.now()}`,
        name: newTagName.trim(),
      }
      setAvailableTags([...availableTags, newTag])
      setSelectedTags([...selectedTags, newTag])
      setNewTagName("")
      setModalOpen(false)
    }
  }

  const handleDeleteTag = (tag: TagType, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the CommandItem onSelect
    setTagToDelete(tag)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteTag = () => {
    if (tagToDelete) {
      // Remove from available tags
      setAvailableTags(availableTags.filter((tag) => tag.id !== tagToDelete.id))

      // Also remove from selected tags if it's there
      setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToDelete.id))

      setDeleteDialogOpen(false)
      setTagToDelete(null)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 min-h-10 p-1">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1 px-3 py-1"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag.name}
            <X
              className="h-3 w-3 cursor-pointer ml-1"
              onClick={() => handleRemoveTag(tag.id)}
              aria-label="Remove tag"
            />
          </Badge>
        ))}

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
                  {filteredTags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => handleSelectTag(tag)}
                      className="cursor-pointer hover:bg-primary-50 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary-500 opacity-0 group-data-[selected]:opacity-100" />
                        {tag.name}
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
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
              Are you sure you want to delete the tag "{tagToDelete?.name}"? This action cannot be undone.
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

