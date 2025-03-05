"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface FlashResponseCreateModalProps {
  
  children: React.ReactNode
  onSave: (response: {
   
    category: string
    heading: string
    message: string
    shareWithOthers: boolean
  
  }) => void
}

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  heading: z.string().min(1, "Heading is required"),
  message: z.string().min(1, "Message is required"),
  shareWithOthers: z.boolean().default(true),
})

export default function FlashResponseCreateModal({ children, onSave }: FlashResponseCreateModalProps) {
    const [isOpen,setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      heading: "",
      message: "",
      shareWithOthers: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
   
    onSave({
      category: values.category,
      heading: values.heading,
      message: values.message,
      shareWithOthers: values.shareWithOthers,
    })
    form.reset()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
        </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-blue-50">
        <DialogHeader>
          <DialogTitle>Create New Flash Response</DialogTitle>
   
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Discounts">Discounts</SelectItem>
                      <SelectItem value="Greetings">Greetings</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Thanks">Thanks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Heading</FormLabel>
                  <FormControl>
                    <Input placeholder="/discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here..." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shareWithOthers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Share with others</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}  className="data-[state=checked]:bg-[#A7B8D9]"/>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-500">Create Response</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

