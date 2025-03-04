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
import { Upload, ArrowRightFromLine } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
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
import {
  useCreateBroadcastMutation,
  useSendTestMessageMutation,
} from "@/store/features/apislice";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "@/lib/isvalidphoneno";
import Link from "next/link";
import BroadcastPopup from "@/components/page/broadcast/proceedmodel";
import { useRouter } from "next/navigation";

import { useGetAllBroadcastsQuery } from "@/store/features/apislice";
import { error } from "console";

export default function CreateBroadcastCampaign() {
  const router = useRouter();
  const [templateSelectionDialog, setTemplateSelectionDialog] = useState(false);
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const submitRef = useRef(null)

  const [broadcast, { isLoading }] = useCreateBroadcastMutation();
  const {refetch} = useGetAllBroadcastsQuery({})
  const [sendTestMessage, { isLoading: sendTestMessageLoading }] =
    useSendTestMessageMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  
    defaultValues: {
      name: "",
      type: "",
      template: undefined,
      contact: null,
   
      utmParameters: {
        utm_source: {
          enabled: true,
          value: "roi_magnet",
        },
        utm_medium: {
          enabled: true,
          value: "whatsapp",
        },
        utm_campaign: {
          enabled: true,
          value: "test_campaign",
        },
        utm_id: true,
        utm_term: false,
      },
      advanceFilters: {
        skipInactiveContacts: {
          enabled: true,
          days: 15,
        },
        limitMarketingMessages: {
          enabled: true,
          maxMessages: 2,
          timeRange: 24,
          timeUnit: "hours",
        },
        avoidDuplicateContacts: {
          enabled: true,
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
     try {
       console.log("Form data:", data);
       
       
       const datas =  broadcast(data).unwrap();
       toast.promise(datas, {
         loading: "Creating broadcast...",
         success: () => toast.success("Broadcast created successfully"),
         error: () => toast.error("Failed to create broadcast"),
       });
       const dataBrod = await datas
       refetch()
      //  router.push(`/broadcast`);
     } catch (error) {
      console.log(error);
     }
    } 
    
  

  const validateForm = async () => {
    let validate = false;
    const isValid = await form.trigger();
    console.log(isValid); // Triggers validation manually
console.log(form.formState.errors)
    if (!isValid) {
      const errors = form.formState.errors;
      const errorFields = Object.keys(errors.templateForm || {}).join(", ");
      console.log(form.watch("templateForm"))
      console.log(errors)

      toast.error(`Invalid or template fields: ${errorFields}`);
      return validate;
    }
    validate = true;
    return validate;
  };




  const handleTestMessage = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    // Test message functionality goes here
    const formvalues = form.getValues();
    console.log("Form data:", formvalues);

    const ValidPhoneNumber = isValidPhoneNumber(formvalues?.testphoneno ?? "");
    if (!ValidPhoneNumber) {
      toast.error("Invalid phone number");
      return;
    }
    const datas = sendTestMessage(formvalues).unwrap();
    toast.promise(datas, {
      loading: "Sending test message...",
      success: () => toast.success("Test message sent successfully"),
      error: () => toast.error("Failed to send test message"),
    });
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
    if (errors.templateForm) {
      toast.error("invalid or empty fields in add content form");
    }
  };

  const handlecheckoutDialog = async(value: boolean) => {
    if (value===true) {
      const isValid = await validateForm();
      console.log(isValid);
      if (!isValid) return;
        
    }
    setCheckoutDialog(value);
  }

  console.log(selectedTemplate);
  return (
    <ScrollArea className="  text-white p-4 h-[calc(100vh-100px)] ">
      <Form {...form}>
        <form
          className=" mx-auto"
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <header className="flex items-center justify-between mb-8">
            <h1 className="md:text-xl text-base font-semibold">
              Create Broadcast Campaign
            </h1>

            <div className="flex gap-2">
              <Link href={"/broadcast"} className="md:block hidden">
                <Button
                  variant="outline"
                  className="bg-transparent border-primary py-3 px-7"
                  type="button"
                >
                  Exit
                </Button>
              </Link>
              <BroadcastPopup selectedTemplate={selectedTemplate} form={form} open={checkoutDialog} onOpenChange={handlecheckoutDialog} submitref={submitRef}>
                <div className="flex  gap-2">
                  <Button
                    className="bg-blue-500 py-3 px-7 hidden md:flex items-center"
                    type="button"
                  >
                    Proceed
                  </Button>
                  <Button
                    className="bg-blue-500 rounded-full md:hidden flex items-center"
                    size="icon"
                    type="button"
                  >
                    <ArrowRightFromLine />
                  </Button>
                </div>
              </BroadcastPopup>
            </div>
          </header>

          <div className="space-y-8">
            <div className=" flex flex-col gap-5 ">
              <div className="flex md:flex-row flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-3 basis-1/2">
                      <FormLabel className="md:text-2xl text-lg">
                        BroadCast Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter broadcast name"
                          className="bg-transparent sm:text-base text-sm  border-gray-400 text-white  rounded-3xl focus:border-blue-500 lg:w-10/12"
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-3 basis-1/2">
                      <FormLabel className=" md:text-2xl text-lg">
                        Select a Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="lg:w-10/12  focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-50 ">
                            <SelectItem value="PROMOTIONAL">
                              Promotional
                            </SelectItem>
                            <SelectItem value="TRANSACTIONAL">
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

              <div className=" flex md:flex-row flex-col gap-5">
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field, fieldState }) => (
                    <FormItem className="py-2 md:text-2xl text-lg  text-white basis-1/2">
                      Select Template
                      <FormDescription className="text-gray-400">
                        Select a template for broadcast messages
                      </FormDescription>
                      <FormControl>
                        <div>
                          <Button
                            className="  py-3 px-5 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => setTemplateSelectionDialog(true)}
                            type="button"
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

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field, fieldState }) => (
                    <FormItem className="py-2">
                      <FormLabel className="text-white md:text-2xl text-lg ">
                        {" "}
                        Recipients
                      </FormLabel>
                      <FormDescription className="text-gray-400 md:text-base sm:text-sm text-xs">
                        {" "}
                        You can upload an Excel sheet or select a Shopify
                        segment.
                      </FormDescription>
                      <FormControl>
                        <SelectContactDialog
                          selectContacts={field.value}
                          setSelectedContacts={field.onChange}
                        >
                          <Button
                            className="bg-blue-500 hover:bg-blue-500 py-3 px-5"
                            type="button"
                          >
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

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="templateForm"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2">
                    <FormLabel className="md:text-2xl text-lg  text-white">
                      Add Content
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
              <Label className="text-2xl">Select reply action</Label>
              <p className="text-xs text-gray-400">
                Auto-reply bot for responses. If the user replies within 72
                hours of getting the message.
              </p>
              <Select>
                <SelectTrigger className=" bg-transparent lg:w-1/4 md:w-1/2 text-white">
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
                render={({ field, fieldState }) => {
                  console.log("FieldState Error:", fieldState.error); // Debugging log

                  return (
                    <FormItem className="space-y-2 py-2">
                      <FormLabel className="md:text-2xl text-lg  font-medium">
                        UTM Parameters
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-400">
                        Link in this broadcast will include additional tracking
                        information called UTM parameters. This allows source
                        tracking within third-party reporting tools such as
                        Google Analytics.
                      </FormDescription>
                      <FormControl>
                        <UTMParametersDialog
                          utmParameters={field.value}
                          setUtmParameters={field.onChange}
                        >
                          <Button
                            className="py-3 px-5 bg-blue-500 text-white hover:bg-blue-600"
                            type="button"
                          >
                            + Add Parameters
                          </Button>
                        </UTMParametersDialog>
                      </FormControl>
                      <div className="text-sm text-red-500">
                        {fieldState.error
                          ? Object.values(fieldState.error).flatMap(
                              (err: any) =>
                                typeof err === "object" && err.value?.message
                                  ? err.value.message
                                  : []
                            )[0] || "Invalid or missing required value"
                          : ""}
                      </div>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="advanceFilters"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2 space-y-2">
                    <FormLabel className="md:text-2xl text-lg  font-medium">
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
                        <Button
                          className=" py-3 px-5 bg-blue-500 text-white hover:bg-blue-600"
                          type="button"
                        >
                          + Add Filter
                        </Button>
                      </AudienceFilteringDialog>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="onlimitexced"
              render={({ field, fieldState }) => (
                <FormItem className="py-2">
                  <FormLabel className="text-2xl font-medium">
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
                      <ScheduleBroadcast
                        schedule={field.value}
                        setSchedule={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="testphoneno"
                render={({ field, fieldState }) => (
                  <FormItem className="py-2">
                    <FormLabel className="text-sm font-medium">
                      Run test message
                    </FormLabel>
                    <FormDescription className="text-sm">
                      Enter the mobile number
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter mobile no"
                        {...field}
                        className="bg-transparent border-gray-600 text-white w-full md:w-72"
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button 
                className=" py-3 px-5 bg-blue-500 text-white hover:bg-blue-600"
                type="button"
                onClick={handleTestMessage}
                disabled={!form.getValues("testphoneno")}
              >
                Send Text Message
              </Button>
              <button ref={submitRef} className="hidden">Submit</button>
            </div>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
