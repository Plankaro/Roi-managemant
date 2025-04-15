/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeClosed, PlusIcon } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useUploadFilesMutation,useCreateTeamMutation } from "@/store/features/apislice";
import { formSchema } from "@/zod/Teams/Teams";
import toast from "react-hot-toast";
import Link from "next/link";


type FormValues = z.infer<typeof formSchema>;

export default function CreateNewAgentForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const uploadref: any = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [uplodFiles,{isLoading:isUploading}] = useUploadFilesMutation()
  const [createTeam] = useCreateTeamMutation();


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     
      ManageBroadcast: true,
      manageCampaign: true,
      manageTeam: true,
      assignChat: true,
    },
  });

  const handleUploadClick = () => {
    uploadref.current?.click();
  };

  const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
  
     
  
      if (file) {
        if (file.size > 3 * 1024 * 1024) {
          alert("File size exceeds 3MB");
          return;
        }
        const formData = new FormData()
      formData.append("file", file)
        const promise =  uplodFiles(formData).unwrap();
        toast.promise(promise, {
          loading: "Uploading...",
          success: "File uploaded successfully!",
          error: (error: any) => error?.data?.message || "An unexpected error occurred.",
        });
        const data = await promise;
        const link = data[0].link;
        form.setValue("image", link);
  
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
         
        };
        reader.readAsDataURL(file);
  
        // Log the file details
        console.log("Selected Image:", {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024).toFixed(2)}KB`,
        });
  
       
      } else {
        setPreviewImage(null);
      
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onSubmit = async(data: FormValues) => {
    try {
      console.log("Form data:", data);
  
      const datas = createTeam(data).unwrap();
      toast.promise(datas,{
        loading: "Creating team...",
        success: () => "Team created successfully",
        error: (error: any) => error?.data?.message || "An unexpected error occurred.",
      })
      const dataBrod = await datas;
      console.log(dataBrod);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col ">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-semibold">
            Create New Agent
          </h1>
          <div className="flex gap-3">
            <Link href={"/teams"}>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              
            >
              Exit
            </Button>
            </Link>
            <Button
              type="submit"
              form="agent-form"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Proceed
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form
            id="agent-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-y-auto no-scrollbar rounded-sm h-[calc(100vh-160px)] bg-backgroundColor p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
                        placeholder="Enter full name"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
                        placeholder="email@example.com"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-300"
                        >
                          {showPassword ? (
                            <Eye />
                          ) : (
                            <EyeClosed />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                    <FormDescription className="text-gray-400 text-xs">
                      Password must be at least 8 characters with uppercase,
                      lowercase, and numbers.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="md:flex items-center gap-5 hidden">
                <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={
                      previewImage ||
                      "https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person-300x300.png"
                    }
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="110px"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-white">Profile Image</p>
                  <p className="text-sm text-gray-400">
                    Upload the image with an aspect ratio of 1:1
                  </p>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="image-upload"
                      className="hidden"
                      ref={uploadref}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 px-6 py-2"
                        type="button"
                        disabled={isUploading}
                        onClick={handleUploadClick}
                      >
                        <PlusIcon className="w-5 h-5" />
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-t-[#D9D9D933] mt-8 pt-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="text-white font-medium text-lg">
                    Broadcasting Permissions
                  </div>
                  <div className="text-sm text-gray-300">
                    Enable this user to send mass messages or announcements to
                    multiple recipients at once.
                  </div>
                  <div className="flex gap-8">
                    <FormField
                      control={form.control}
                      name="ManageBroadcast"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value === true}
                              onCheckedChange={() => field.onChange(true)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            Create{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ManageBroadcast"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value === false}
                              onCheckedChange={() => field.onChange(false)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            View Only{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-white font-medium text-lg">
                    Team Management
                  </div>
                  <div className="text-sm text-gray-300">
                    Control user permissions (view only, add, edit, or remove
                    team members.)
                  </div>
                  <div className="flex gap-8">
                    <FormField
                      control={form.control}
                      name="manageTeam"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={!field.value}
                              onCheckedChange={() => field.onChange(false)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            View{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTeam"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={() => field.onChange(true)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            Manage Teams{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="text-white font-medium text-lg">
                    Campaign Management
                  </div>
                  <div className="text-sm text-gray-300">
                    Allow the user to create and manage mass messaging
                    campaigns.
                  </div>
                  <div className="flex gap-8 items-center">
                    <FormField
                      control={form.control}
                      name="manageCampaign"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value === true}
                              onCheckedChange={() => field.onChange(true)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            Create{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageCampaign"
                      render={({ field }) => (
                        <FormItem className="flex space-y-0 items-center space-x-3 ">
                          <FormControl>
                            <Checkbox
                              checked={field.value === false}
                              onCheckedChange={() => field.onChange(false)}
                              className="border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="text-white text-sm cursor-pointer leading-none">
                            View Only{" "}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-white font-medium text-lg">
                    Assign Chat
                  </div>
                  <div className="text-sm text-gray-300">
                    Allow the user to manage chat assignments and user
                    communication settings.
                  </div>
                  <FormField
                    control={form.control}
                    name="assignChat"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
