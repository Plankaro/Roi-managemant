/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

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
import { useSession } from "next-auth/react"
import { useUploadFilesMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"
import { useUpdateProfileMutation, useGetProfileQuery } from "@/store/features/apislice"
import { Skeleton } from "@/components/ui/skeleton"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  image: z.string().optional(),
})

export function ProfileComponent() {
  const { update } = useSession()
  const [updateProfile] = useUpdateProfileMutation()
  const { data: profile, isLoading } = useGetProfileQuery({})

  const [uplodFiles] = useUploadFilesMutation()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      image: profile?.image ?? "",
    },
  })

  // Update form values when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      profileForm.reset({
        name: profile.name || "",
        image: profile.image || "",
      })
    }
  }, [profile, profileForm])

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    const promise = updateProfile(data).unwrap()
    toast.promise(promise, {
      loading: "Updating...",
      success: "Profile updated successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred.",
    })
    const dataBrod = promise
    console.log(dataBrod)
    update()
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]

      if (file) {
        if (file.size > 3 * 1024 * 1024) {
          alert("File size exceeds 3MB")
          return
        }
        const formData = new FormData()
        formData.append("file", file)
        const promise = uplodFiles(formData).unwrap()
        toast.promise(promise, {
          loading: "Uploading...",
          success: "File uploaded successfully!",
          error: (error: any) => error?.data?.message || "An unexpected error occurred.",
        })
        const data = await promise
        const link = data[0].link
        profileForm.setValue("image", link)

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
          setProfileImage(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Log the file details
        console.log("Selected Image:", {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024).toFixed(2)}KB`,
        })
      } else {
        setProfileImage(null)
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-backgroundColor border-primary text-white rounded-xl">
        <CardHeader>
          <Skeleton className="h-8 w-48 bg-primary-700/20" />
          <Skeleton className="h-4 w-64 mt-2 bg-primary-700/20" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-24 h-24 rounded-full bg-primary-700/20" />
              <Skeleton className="h-9 w-32 mt-2 bg-primary-700/20" />
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-primary-700/20" />
                <Skeleton className="h-10 w-full bg-primary-700/20" />
              </div>
              <Skeleton className="h-10 w-32 bg-primary-700/20" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
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
              <AvatarImage src={profileImage || profileForm.watch("image") || ""} alt="Profile" />
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
              {/* Hidden field for the image */}
              <FormField
                control={profileForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
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
