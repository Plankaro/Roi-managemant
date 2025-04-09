/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  whatsappTemplateSchema,
  headerTypes,
  buttonTypes,
} from "@/zod/template/template";
import { Bold, Italic, Strikethrough, Smile } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import Image from "next/image";
import toast from "react-hot-toast";
import { useUploadFilesMutation } from "@/store/features/apislice";
import { templateLanguage } from "@/lib/language";
import { useCreateTemplateMutation,useSendWhatsappMediaMutation } from "@/store/features/apislice";

// Dynamically import EmojiPicker to improve initial load performance
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] flex items-center justify-center">
      Loading...
    </div>
  ),
});

type FormData = z.infer<typeof whatsappTemplateSchema>;

export default function TemplateForm() {
  const [variables, setVariables] = useState<number[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [headerPreview, setHeaderPreview] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadFiles] = useUploadFilesMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createTemplate] = useCreateTemplateMutation();
  const [sendWhatsappMedia] = useSendWhatsappMediaMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(whatsappTemplateSchema),
    defaultValues: {
      header: { type: "none" },
      body: { text: "", variables: [] },
      buttons: [],
      footer: "",
    },
  });

  const headerType = form.watch("header.type");
  const bodyText = form.watch("body.text");
  const bodyVariables = form.watch("body.variables") || [];
  const footerText = form.watch("footer");
  const buttons = form.watch("buttons") || [];

  // Reset header value when header type changes
  useEffect(() => {
    form.setValue("header.value", "");
    setHeaderPreview("");
  }, [headerType, form]);

  // Update variables when body text changes
  useEffect(() => {
    const matches = bodyText.match(/{{(\d+)}}/g) || [];
    const newVariables = matches
      .map((match) => Number.parseInt(match.replace(/[{}]/g, "")))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);

    if (JSON.stringify(newVariables) !== JSON.stringify(variables)) {
      setVariables(newVariables);

      const currentVariables = form.getValues("body.variables") || [];
      const updatedVariables = newVariables.map((id) => {
        const existing = currentVariables.find((v) => v.id === id);
        return { id, value: existing?.value || "" };
      });

      form.setValue("body.variables", updatedVariables);
    }
  }, [bodyText, form, variables]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnchange: any
  ) => {
    const file = event.target.files?.[0];
    const locallink = URL.createObjectURL(file!);
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        const promise = sendWhatsappMedia(formData).unwrap();
        toast.promise(promise, {
          loading: "Uploading...",
          success: "File uploaded successfully!",
          error: (error: any) =>
            error?.data?.message || "An unexpected error occurred.",
        });
        const data = await promise;
        const link = data.h;
console.log(data);
        // Set the header value with the uploaded link
        setHeaderPreview(locallink);
        fieldOnchange(link);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addVariable = () => {
    const newId = variables.length > 0 ? Math.max(...variables) + 1 : 1;
    const variableText = `{{${newId}}}`;

    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const currentText = form.getValues("body.text");
      const newText =
        currentText.substring(0, start) +
        variableText +
        currentText.substring(end);

      form.setValue("body.text", newText);

      // Set cursor position after the inserted variable
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = start + variableText.length;
          textareaRef.current.selectionEnd = start + variableText.length;
        }
      }, 0);
    } else {
      const currentText = form.getValues("body.text");
      form.setValue("body.text", currentText + variableText);
    }
  };

  const handleButtonSelect = (selected: string[]) => {
    setSelectedButtons(selected);
    const currentButtons = form.getValues("buttons") || [];

    const remainingButtons: any = currentButtons.filter((button) =>
      selected.includes(button.type)
    );
    const newButtons = selected
      .filter((type) => !currentButtons.find((button) => button.type === type))
      .map((type) => ({ type, text: "", value: "" }));

    form.setValue("buttons", [...remainingButtons, ...newButtons]);
  };

  const formatText = (format: "bold" | "italic" | "strikethrough") => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = form.getValues("body.text");

    const formatMap = {
      bold: "*",
      italic: "_",
      strikethrough: "~",
    };

    const prefix = formatMap[format];
    const newText =
      text.substring(0, start) +
      prefix +
      text.substring(start, end) +
      prefix +
      text.substring(end);

    form.setValue("body.text", newText);

    // Restore focus and selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = end + 2 * prefix.length;
        textareaRef.current.selectionEnd = end + 2 * prefix.length;
      }
    }, 0);
  };

  const addEmoji = (emojiData: any) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const text = form.getValues("body.text");
    const newText =
      text.substring(0, start) + emojiData.emoji + text.substring(start);

    form.setValue("body.text", newText);
    setShowEmojiPicker(false);

    // Restore focus and set cursor after emoji
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = start + emojiData.emoji.length;
        textareaRef.current.selectionEnd = start + emojiData.emoji.length;
      }
    }, 0);
  };

  const getPreviewText = (text: string) => {
    let previewText = text;
    bodyVariables.forEach((variable) => {
      previewText = previewText.replace(
        `{{${variable.id}}}`,
        variable.value || `[Sample ${variable.id}]`
      );
    });
    return previewText;
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const promise = createTemplate(data).unwrap;

    toast.promise(promise, {
      loading: "Creating template...",
      success: "Template created successfully!",
      error: (error: any) =>
        error?.data?.message || "An unexpected error occurred.",
    });

    const dataBrod = await promise;
    console.log(dataBrod);
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6  text-white">
      <Card className="p-6 col-span-2 bg-backgroundColor border-primary text-white  h-[calc(100vh-180px)] overflow-scroll no-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="template_name"
                      maxLength={512}
                      {...field}
                      onChange={(e) => {
                        const transformedValue = e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "_");
                        field.onChange(transformedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex md:flex-row flex-col gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Template Name" max={512} {...field} /> */}
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="  focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-blue-50 ">
                          <SelectItem value="MARKETING">
                            Marketing
                          </SelectItem>
                          <SelectItem value="UTILITY">
                            Utility
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                            <SelectValue placeholder="Select a Language" />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-50 p-0">
                            <div className="flex flex-col">
                              <div className="sticky top-0 z-10 text-white border-b border-gray-200 p-2">
                                <Input
                                  placeholder="Search language..."
                                  className="border-gray-200 text-black"
                                  id="language-search"
                                  onChange={(e) => {
                                    const searchTerm =
                                      e.target.value.toLowerCase();
                                    const items = document.querySelectorAll(
                                      "[data-language-item]"
                                    );
                                    items.forEach((item) => {
                                      const text =
                                        item.textContent?.toLowerCase() || "";
                                      if (text.includes(searchTerm)) {
                                        (item as HTMLElement).style.display =
                                          "block";
                                      } else {
                                        (item as HTMLElement).style.display =
                                          "none";
                                      }
                                    });
                                  }}
                                />
                              </div>
                              <div className="max-h-60 overflow-y-auto py-1">
                                {templateLanguage.map((language) => (
                                  <SelectItem
                                    key={language.value}
                                    value={language.value}
                                    data-language-item
                                  >
                                    {language.label}
                                  </SelectItem>
                                ))}
                              </div>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Header</h2>
              <FormField
                control={form.control}
                name="header.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent border-gray-700 text-white">
                          <SelectValue placeholder="Select header type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {headerTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="focus:bg-gray-700 focus:text-white"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {headerType !== "none" && (
                <FormField
                  control={form.control}
                  name="header.value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Header Value</FormLabel>
                      {headerType === "text" ? (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter header text"
                            className="bg-transparent border-gray-700 text-white"
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setHeaderPreview(e.target.value);
                            }}
                          />
                        </FormControl>
                      ) : (
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept={
                                headerType === "image" ? "image/*" : "video/*"
                              }
                              className="bg-transparent hidden border-gray-700 text-white flex-1"
                              onChange={(e) => {
                                handleFileUpload(e, field.onChange);
                              }}
                              ref={fileInputRef}
                            />
                            <Button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              variant="secondary"
                              className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Upload{" "}
                              {headerType === "image" ? "Image" : "Video"}
                            </Button>
                          </div>
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Body Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Body</h2>
              <FormField
                control={form.control}
                name="body.text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textareaRef}
                        placeholder="Enter body text"
                        className="min-h-[100px] bg-transparent border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => formatText("bold")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => formatText("italic")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => formatText("strikethrough")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Popover
                  open={showEmojiPicker}
                  onOpenChange={setShowEmojiPicker}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="emoji-picker-container">
                      <EmojiPicker
                        onEmojiClick={addEmoji}
                        searchPlaceholder="Search emojis..."
                        width={320}
                        height={400}
                        previewConfig={{
                          showPreview: false,
                        }}
                        lazyLoadEmojis={true}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addVariable}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Add Variable
                </Button>
              </div>

              {variables.map((id, index) => (
                <FormField
                  key={id}
                  control={form.control}
                  name={`body.variables.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample text for {`{{${id}}}`}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter sample text"
                          className="bg-transparent border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Footer Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Footer (Optional)</h2>
              <FormField
                control={form.control}
                name="footer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter footer text"
                        className="bg-transparent border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Buttons</h2>
              <MultiSelect
                options={buttonTypes.map((type) => ({
                  label: type.charAt(0).toUpperCase() + type.slice(1),
                  value: type,
                }))}
                value={selectedButtons}
                onChange={handleButtonSelect}
                maxSelected={3}
              />

              {buttons.map((button, index) => (
                <div key={index} className="space-y-4  p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`buttons.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter button text"
                            className="bg-transparent border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`buttons.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {button.type === "call"
                            ? "Phone Number"
                            : button.type === "link"
                            ? "URL"
                            : "Copy Text"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Enter ${button.type} value`}
                            className="bg-transparent border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Save Template
            </Button>
          </form>
        </Form>
      </Card>

      {/* Preview Section */}
      <Card className="p-6 bg-transparent border-0">
        <h2 className="text-lg font-semibold mb-4 text-white">Preview</h2>
        <div className="space-y-4  p-4 rounded-lg bg-white">
          {headerType !== "none" && (
            <div className="b p-2 rounded">
              {headerType === "text" ? (
                <p>{form.getValues("header.value") || headerPreview}</p>
              ) : headerPreview ? (
                headerType === "image" ? (
                  <div className="w-full h-48 relative">
                    <Image
                      src={headerPreview || "/placeholder.svg"}
                      fill
                      alt="Header preview"
                      className="absolute inset-0 w-full h-full object-cover object bg-center"
                    />
                  </div>
                ) : (
                  <video
                    src={headerPreview}
                    controls
                    className="w-full h-48 object-cover rounded"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="h-48 flex items-center justify-center rounded">
                  {headerType.charAt(0).toUpperCase() + headerType.slice(1)}{" "}
                  Preview
                </div>
              )}
            </div>
          )}

          <div className=" p-4 rounded">
            <p className="whitespace-pre-wrap">{getPreviewText(bodyText)}</p>
          </div>

          {footerText && (
            <div className=" p-2 rounded text-sm text-gray-300">
              {footerText}
            </div>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-col gap-2">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition-colors"
                  type="button"
                >
                  {button.text ||
                    `${
                      button.type.charAt(0).toUpperCase() + button.type.slice(1)
                    } Button`}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
