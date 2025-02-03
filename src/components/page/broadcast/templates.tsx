"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Template {
  id: string
  title: string
  body: string
  type: string
  category: string
  createdAt: string
}

const templates: Template[] = [
  {
    id: "1",
    title: "Title of the broadcast message",
    body: "Body of the message....",
    type: "Standard",
    category: "Marketing",
    createdAt: "18/01/2025, 2:45pm",
  },
  {
    id: "2",
    title: "Title of the broadcast message",
    body: "Body of the message....",
    type: "Standard",
    category: "Marketing",
    createdAt: "18/01/2025, 2:45pm",
  },
  {
    id: "3",
    title: "Title of the broadcast message",
    body: "Body of the message....",
    type: "Standard",
    category: "Marketing",
    createdAt: "18/01/2025, 2:45pm",
  },
  {
    id: "4",
    title: "Title of the broadcast message",
    body: "Body of the message....",
    type: "Standard",
    category: "Marketing",
    createdAt: "18/01/2025, 2:45pm",
  },
  {
    id: "5",
    title: "Title of the broadcast message",
    body: "Body of the message....",
    type: "Standard",
    category: "Marketing",
    createdAt: "18/01/2025, 2:45pm",
  },
]

export default function SelectTemplate() {
  const [search, setSearch] = React.useState("")

  return (
    <div className="  text-white p-8 w-full">
      <div className=" mx-auto space-y-8">
        {/* Header Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Broadcast Name</label>
            <Input
              className="bg-transparent border-[#3B82F6] focus:border-[#3B82F6] rounded-lg"
              placeholder="Enter broadcast name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select>
              <SelectTrigger className="bg-transparent border-gray-800 rounded-lg">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Template Selection Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Select Template for Broadcast Message</h2>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              className="bg-transparent border-gray-800 pl-10 rounded-full"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Templates Table */}
          <div className="rounded-lg overflow-hidden border border-gray-800">
            <Table>
              <TableHeader className="bg-[#4B6BFB]">
                <TableRow className="hover:bg-[#4B6BFB]/90">
                  <TableHead className="text-white font-medium">Name</TableHead>
                  <TableHead className="text-white font-medium">
                    <Button variant="ghost" className="text-white font-medium p-0 hover:bg-transparent">
                      Type
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <Button variant="ghost" className="text-white font-medium p-0 hover:bg-transparent">
                      Category
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <Button variant="ghost" className="text-white font-medium p-0 hover:bg-transparent">
                      Created at
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id} className="hover:bg-gray-800/50 bg-[#E8EEF9]/5">
                    <TableCell className="font-medium">
                      <div className="space-y-1">
                        <div className="font-semibold">{template.title}</div>
                        <div className="text-sm text-gray-400">{template.body}</div>
                      </div>
                    </TableCell>
                    <TableCell>{template.type}</TableCell>
                    <TableCell>{template.category}</TableCell>
                    <TableCell>{template.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

