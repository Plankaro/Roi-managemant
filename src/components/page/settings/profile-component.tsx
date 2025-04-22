"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export function ProfileComponent() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
    },
  })

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    console.log(data)
    // Handle profile update
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <Card className="bg-backgroundColor border-primary text-white rounded-xl">
      <CardHeader>
        <CardTitle>Your Account</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24 border-2 border-primary-700">
              <AvatarImage src={profileImage || ""} alt="Profile" />
              <AvatarFallback className="bg-primary-700 text-white text-xl">
                {profileForm.watch("name")?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input type="file" id="picture" accept="image/*" className="hidden" onChange={handleImageChange} />
              <Button
                type="button"
               
                size="sm"
                className="mt-2 bg-primary-700 text-white hover:bg-primary-600"
                onClick={() => document.getElementById("picture")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Change Image
              </Button>
            </div>
          </div>

          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="w-full space-y-4">
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}
