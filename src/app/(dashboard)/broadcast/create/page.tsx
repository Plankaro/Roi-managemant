/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import TemplateBuilder from "@/components/page/broadcast/templatedialog";
import SelectContactDialog from "@/components/page/broadcast/selectcontactDialog";
import { UTMParametersDialog } from "@/components/page/broadcast/utmparameters";
import { AudienceFilteringDialog } from "@/components/page/broadcast/advancefiltering";
import AddContentForm from "@/components/page/broadcast/addcontentForm";
import ScheduleBroadcast from "@/components/page/broadcast/schedule_broadcast";
import { formSchema } from "@/zod/broadcast/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CreateBroadcastCampaign() {
  const [templateSelectionDialog, setTemplateSelectionDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      template: undefined,
      contact: null,

      utmParameters: {
        utm_source: {
          enabled: false,
          value: "roi_magnet",
        },
        utm_medium: {
          enabled: false,
          value: "whatsapp",
        },
        utm_campaign: {
          enabled: false,
          value: "test_campaign",
        },
        utm_id: false,
        utm_term: false,
      },
      advanceFilters: {
        skipInactiveContacts: {
          enabled: false,
          days: 15,
        },
        limitMarketingMessages: {
          enabled: false,
          maxMessages: 2,
          timeRange: 24,
          timeUnit: "hours",
        },
        avoidDuplicateContacts: {
          enabled: false,
        },
      },
      schedule: {
        schedule: false,
        date: new Date(),
        time: format(new Date(), "hh:mm a"),
      },
      onlimitexced: "pause",
    },
  });
  const selectedContacts = form.watch("contact");
  const selectedTemplate = form.watch("template");



  const onSubmit = (data: any) => {
    console.log(data);
  
  };
  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  return (
    <ScrollArea className="  text-white p-4 h-[90vh] ">
      <Form {...form}>
        <form className=" mx-auto" onSubmit={form.handleSubmit(onSubmit, onError)}>
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-semibold">Create Broadcast Campaign</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-transparent border-primary py-3 px-7"
              >
                Exit
              </Button>
              <Button className="bg-blue-500 py-3 px-7">Proceed</Button>
            </div>
          </header>

          <div className="space-y-8">
            <div className=" flex justify-between gap-10 items-center">
              <div className="basis-1/2 flex flex-col gap-5">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem className="py-2">
                        <FormLabel className="text-2xl">
                          BroadCast Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter broadcast name"
                            className="bg-transparent border-gray-600 text-white p-6 rounded-3xl"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 ">
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field, fieldState }) => (
                      <FormItem className="py-2 text-2xl text-white">
                        Select Template <span className="text-red-500">*</span>
                        <FormDescription className="text-gray-400">
                          Select a template for broadcast messages
                        </FormDescription>
                        <FormControl>
                          <div>
                            <Button
                              className="bg-transparent bg-blue-500 text-white hover:bg-blue-600"
                              onClick={() => setTemplateSelectionDialog(true)}
                            >
                              Select Template
                            </Button>
                            <TemplateBuilder
                              open={templateSelectionDialog}
                              setOpen={setTemplateSelectionDialog}
                              selectedTemplate={field.value}
                              setSelectedTemplate={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="basis-1/2 flex flex-col gap-5">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field, fieldState }) => (
                      <FormItem className="py-2">
                        <FormLabel className="text-2xl">
                          Select a Category
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full bg-transparent border-gray-600 text-white p-6 rounded-3xl">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="promotional">
                                Promotional
                              </SelectItem>
                              <SelectItem value="transactional">
                                Transactional
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 ">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field, fieldState }) => (
                      <FormItem className="py-2">
                        <FormLabel className="text-white text-2xl">
                          {" "}
                          Recipients <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormDescription className="text-gray-400">
                          {" "}
                          You can upload an Excel sheet or select a Shopify
                          segment.
                        </FormDescription>
                        <FormControl>
                          <SelectContactDialog
                            selectContacts={field.value}
                            setSelectedContacts={field.onChange}
                          >
                            <Button className="bg-blue-500 hover:bg-blue-500">
                              <Upload className="w-4 h-4 mr-2" /> Upload
                              Recipients
                            </Button>
                          </SelectContactDialog>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="templateForm"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2">
                    <FormLabel className="text-2xl text-white">
                      Add Content <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <AddContentForm
                        selectedContact={selectedContacts}
                        selectedTemplate={selectedTemplate}
                        formData={field.value}
                        setFormData={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-400">
                Select reply action <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-400">
                Auto-reply bot for responses. If the user replies within 72
                hours of getting the message.
              </p>
              <Select>
                <SelectTrigger className="w-full bg-transparent border-gray-600 text-white">
                  <SelectValue placeholder="Transfer Bot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">Transfer Bot</SelectItem>
                  <SelectItem value="auto-reply">Auto Reply</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="utmParameters"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      UTM Parameters <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-400">
                      Link in this broadcast will include additional tracking
                      information called UTM parameters. This allows source
                      tracking within third party reporting tools such as Google
                      Analytics
                    </FormDescription>
                    <FormControl>
                      <UTMParametersDialog
                        utmParameters={field.value}
                        setUtmParameters={field.onChange}
                      >
                        <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
                          + Add Parameters
                        </Button>
                      </UTMParametersDialog>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="advanceFilters"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2">
                    <FormLabel className="text-sm font-medium">
                      Audience Filtering Options
                    </FormLabel>
                    <FormDescription>
                      An advance audience filtering options for an effective
                      broadcasting
                    </FormDescription>
                    <FormControl>
                      <AudienceFilteringDialog
                        filters={field.value}
                        setFilters={field.onChange}
                      >
                        <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
                          + Add Filter
                        </Button>
                      </AudienceFilteringDialog>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="onlimitexced"
              render={({ field, fieldState }) => (
                <FormItem className="py-2">
                  <FormLabel className="text-sm font-medium">
                    Messaging Limit
                  </FormLabel>
                  <FormDescription className="text-sm">
                    What to do when the messaging limit exceeds?
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="pause"
                          className="border-gray-600"
                          checked={field.value === "pause"}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              field.onChange("pause");
                            }
                          }}
                        />
                        <Label htmlFor="pause" className="text-sm">
                          Pause Broadcast (recommended)
                        </Label>
                      </div>
                      <p className="text-xs text-gray-400 ml-6">
                        The broadcast will pause automatically and resume when
                        the limit resets.
                      </p>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="skip"
                          className="border-gray-600"
                          checked={field.value === "skip"}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              field.onChange("skip");
                            }
                          }}
                        />
                        <Label htmlFor="skip" className="text-sm">
                          Skip messaging limit check and try sending to all.
                        </Label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="space-y-4">
            <FormField
                control={form.control}
                name="schedule"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2">
                    <FormControl>
                    <ScheduleBroadcast schedule={field.value} setSchedule={field.onChange}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Run test message</h3>
              <div className="space-y-2">
                <Label className="text-sm">Enter the mobile number</Label>
                <Input
                  placeholder="+91 9876543212"
                  className="bg-transparent border-gray-600 text-white w-full md:w-72"
                />
              </div>
              <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
                Send Text Message
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
