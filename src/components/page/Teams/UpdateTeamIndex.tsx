/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import {
  useGetSpecificTeamQuery,
  useUpdateTeamMutation,
  useUploadFilesMutation} from "@/store/features/apislice";
import { updateSchema } from "@/zod/Teams/Teams";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import Link from "next/link";
import { formSchema } from "@/zod/Teams/Teams";

type FormValues = z.infer<typeof formSchema>;

export default function UpdateAgentForm({ id }: { id: string }) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [updateTeam] = useUpdateTeamMutation();

  const [uplodFiles] = useUploadFilesMutation();

  const { data: team, refetch } = useGetSpecificTeamQuery(id);
  


  console.log(team);

 
  const uploadref: any = useRef(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (team) {
      form.setValue("name", team?.name ?? "");
      form.setValue("email", team?.email ?? "");
      form.setValue("image", team?.image ?? "");
      //   form.setValue("password", team?.password ?? "");
      form.setValue("ManageBroadcast", team?.ManageBroadcast ?? false);
      form.setValue("manageTeam", team?.manageTeam ?? false);
      form.setValue("manageCampaign", team?.manageCampaign ?? false);
      form.setValue("assignChat", team?.assignChat ?? false);
      setPreviewImage(team?.image ?? "");
    }
  }, [team, form]);

  const handleUploadClick = () => {
    uploadref.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        if (file.size > 3 * 1024 * 1024) {
          alert("File size exceeds 3MB");
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const promise = uplodFiles(formData).unwrap();
        toast.promise(promise, {
          loading: "Uploading...",
          success: "File uploaded successfully!",
          error: (error: any) =>
            error?.data?.message || "An unexpected error occurred.",
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
   

    const promise = updateTeam({id:id,body:data}).unwrap();
    toast.promise(promise, {
      loading: "Updating...",
      success: "Details updated successfully!",
      error: (error: any) =>
        error?.data?.message || "An unexpected error occurred.",
    });
    refetch();
  
    const updatedTeam = await promise;
    console.log(updatedTeam);

    console.log("Form submitted:", data);
  };

  return (
    <div className=" flex flex-col ">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-semibold">Edit Agent</h1>
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
            className="space-y-8 overflow-y-auto no-scrollbar rounded-sm md:h-[calc(100vh-180px)] bg-backgroundColor p-6 pt-2"
          >
            <div className="p-6 rounded-xl  gap-5 flex items-center bg-backgroundColor border border-primary">
              <div className="relative w-28 h-28">
                <Image
                  src={
                    previewImage ||
                    "https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person-300x300.png"
                  }
                  alt="Profile"
                  fill
                  onClick={handleUploadClick}
                  priority
                  className="rounded-full cursor-pointer object-cover"
                />
              </div>
              <div className="text-white flex gap-5 flex-col">
                <p className="font-semibold text-3xl">{team?.name}</p>
                <p className="text-sm bg-[#4166AE24] px-4 py-1 flex gap-2 items-center rounded-sm">
                  <MdEmail />
                  {team?.email}
                </p>
              </div>
            </div>
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
                        autoComplete="off"
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
             

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-upload"
                className="hidden"
                ref={uploadref}
              />
            </div>

            <div className="flex md:flex-row flex-col gap-8 border-t border-t-[#D9D9D933] mt-8 pt-8 overflow-hidden">
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
                    name="manageTeam"
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
