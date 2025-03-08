
"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/page/Teams/imageupload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  profileImage: z.any().optional(),
  Managebroadcast: z.boolean().default(false),
  manageTeam: z.boolean().default(false),
  manageCampaign: z.boolean().default(false),
  assignChat: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateNewAgentForm() {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      manageCampaign: true,
      assignChat: false,
    },
  });

  const handleImageSelected = (file: File | null) => {
    setProfileImage(file);
    form.setValue("profileImage", file);
  };

  const onSubmit = (data: FormValues) => {
    const submissionData = {
      ...data,
      profileImage,
    };
    console.log("Form submitted:", submissionData);
  };

  return (
    <div className="  overflow-hidden max-h-[90vh]">
      <div className="w-full rounded-xl  mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Create New Agent</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              Exit
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 py-10 overflow-y-scroll no-scrollbar h-[calc(100vh-170px)] rounded-md bg-backgroundColor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-[50px] rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
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
                      className="h-[50px] rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
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
                  <FormLabel className="text-white text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="h-[50px] rounded-3xl text-white bg-white/5 border-white/10 placeholder:text-gray-400"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                  <FormDescription className="text-gray-400 text-xs">
                    Password must be at least 8 characters with uppercase, lowercase, and numbers.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex gap-5 text-white">
              <ImageUpload onImageSelected={handleImageSelected} />
              <div className="space-y-2">
                <Label className="text-white text-lg block">Profile Image</Label>
                <p className="text-gray-400 text-xs">
                  Upload the image with an aspect ratio of 1:9:1
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-lg py-5 px-4 rounded-full">
                  <PlusIcon className="mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-t-[#D9D9D933] mt-8 pt-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-white font-medium text-lg">Broadcasting Permissions</div>
                <div className="text-sm text-gray-300">
                  Enable this user to send mass messages or announcements to multiple recipients at once.
                </div>
                <div className="flex gap-8">
                  <FormField
                    control={form.control}
                    name="Managebroadcast"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 " >
                        <FormControl>
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={() => field.onChange(true)}
                            variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <Label className="text-white text-sm cursor-pointer">Create</Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Managebroadcast"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === false}
                            onCheckedChange={() => field.onChange(false)}
                            variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <Label className="text-white text-sm cursor-pointer">View Only</Label>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-white font-medium text-lg">Team Management</div>
                <div className="text-sm text-gray-300">
                  Control user permissions (view only, add, edit, or remove team members.)
                </div>
                <div className="flex gap-8">
                  <FormField
                    control={form.control}
                    name="manageTeam"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={!field.value}
                            onCheckedChange={() => field.onChange(false)}
                            variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <Label className="text-white text-sm cursor-pointer">View</Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="manageTeam"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={() => field.onChange(true)}
                           variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <Label className="text-white text-sm cursor-pointer">Manage Teams</Label>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-white font-medium text-lg">Campaign Management</div>
                <div className="text-sm text-gray-300">
                  Allow the user to create and manage mass messaging campaigns.
                </div>
                <div className="flex gap-8 items-center">
                  <FormField
                    control={form.control}
                    name="manageCampaign"
                    render={({ field }) => (
                      <FormItem className="flex items-center  space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={() => field.onChange(true)}
                          variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <span className="text-white m-0  text-sm cursor-pointer">Create</span>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="manageCampaign"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === false}
                            onCheckedChange={() => field.onChange(false)}
                            variant="white" className = "border border-white"
                          />
                        </FormControl>
                        <Label className="text-white text-sm cursor-pointer">View Only</Label>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-white font-medium text-lg">Assign Chat</div>
                <div className="text-sm text-gray-300">
                  Allow the user to manage chat assignments and user communication settings.
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
                          className="data-[state=checked]:bg-blue-500"
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
  );
}