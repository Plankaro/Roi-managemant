/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useGetAllTemplatesQuery } from "@/store/features/apislice";
import SelectedTemplateForm from "./selectedTemplate";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendTemplateSchema } from "@/zod/chats/chat";
import { z } from "zod";
import { RootState } from "@/store/store";
import { useSendTemplatesMutation } from "@/store/features/apislice";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/store/features/chatSlice";
import toast from "react-hot-toast";
import { updateLastChat } from "@/store/features/prospect";

export default function TemplateBuilder({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof sendTemplateSchema>>({
    resolver: zodResolver(sendTemplateSchema),
    defaultValues: {
      template: null, // or an appropriate initial value
      templateForm: {
        header: undefined, // header is optional per schema
        body: [],
        buttons: [],
      },
    },
  });

  const { data: templates, isLoading } = useGetAllTemplatesQuery({});

  const dispatch = useDispatch();
  const [sendTemplate] = useSendTemplatesMutation({});

  const selectedProspect = useSelector(
    (state: RootState) => state.Prospect?.selectedProspect
  );

  const [filteredTemplate, setFilteredTemplate] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  //console.log(templates)

  useEffect(() => {
    if (searchQuery) {
      const filtered = templates?.filter((template: any) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTemplate(filtered);
    } else {
      setFilteredTemplate(templates);
    }
  }, [searchQuery, templates]);

  const onSubmit = async (data: z.infer<typeof sendTemplateSchema>) => {
    const payload = {
      name: data.template.name,
      templateForm: data.templateForm,
      recipientNo: selectedProspect?.phoneNo,
    };
    console.log(payload);
    const response = sendTemplate(payload).unwrap();
    toast.promise(response, {
      loading: "Sending...",
      success: "Message sent successfully!",
      error: (error: any) =>
        error?.data?.message || "An unexpected error occurred.",
    });

    const chat = (await response).data;
    console.log(chat);

    dispatch(setChats([chat]));
    dispatch(updateLastChat(chat));
    console.log(response);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-[1300px] w-[90vw] p-6 gap-6 lg:h-[80vh] h-[90vh] lg:overflow-hidden overflow-scroll no-scrollbar bg-blue-50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="template">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-10">
              {/* Select Template Section */}
              <div className="">
                <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">
                  Select Template
                </h2>
                <div className="space-y-4 relative">
                  <div className="bg-blue-50 bg-background pt-0 pb-4 z-10">
                    <Search className="absolute left-3 top-2.5 h-4 w-4" />
                    <Input
                      placeholder="Search here..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field, fieldState }) => (
                      <FormItem className="">
                        <FormControl>
                          <div className="space-y-2 md:overflow-scroll md:h-[60vh] no-scrollbar">
                            {!isLoading &&
                              filteredTemplate &&
                              filteredTemplate?.map((template: any) => (
                                <div
                                  key={template.name}
                                  className={`p-3 flex gap-3 cursor-pointer border-b-4 border-blue-700 ${
                                    field.name === template?.name
                                      ? "bg-gray-50"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => field.onChange(template)}
                                >
                                  <div className="min-w-10 min-h-10 bg-[linear-gradient(180deg,#1B2A48_0%,#4166AE_100%)] rounded" />
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <h3 className="font-medium text-sm">
                                        {template.name}
                                      </h3>
                                      <div
                                        className={`w-3 h-3 rounded-full ${
                                          template.trackingEnabled
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                        }`}
                                      />
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                      {
                                        template.components.find(
                                          (component: any) =>
                                            component.type === "BODY"
                                        )?.text
                                      }
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="templateForm"
                render={({ field, fieldState }) => (
                  <FormItem className="">
                    <FormControl>
                      <SelectedTemplateForm
                        selectedTemplate={form.watch("template")}
                        formData={field.value}
                        setFormData={field.onChange}
                        errors={form.formState.errors}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Template Form and Preview Section */}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
