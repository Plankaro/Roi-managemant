/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast"
import { useUploadFilesMutation } from "@/store/features/apislice";


function AddContentForm({
  selectedContact,
  selectedTemplate,
  formData,
  setFormData,
}: {
  selectedContact: any;
  selectedTemplate: any;
  formData: any;
  setFormData: (data: any) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadFiles] = useUploadFilesMutation()

 
  useEffect(() => {
   
    if (selectedTemplate) {
      const newFormData = {
        header: {
          type: "",
          value: "",
          isEditable: false,
          fromsegment: false,
          segmentname: "",
          segmenttype: "",
          segmentAltValue: "",
        },
        body: [] as {
          parameter_name: string;
          value: string;
          fromsegment: boolean;
          segmentname: string;
          segmenttype: string;
          segmentAltValue: string;
        }[],
        buttons: [] as { type: string; value: string; isEditable: boolean }[],
      };

      selectedTemplate.components.forEach((component: any) => {
        if (component.type === "HEADER") {
          newFormData.header.type = component.format || "";
          if (
            ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") &&
            component.example?.header_handle
          ) {
            newFormData.header.value = "";
            newFormData.header.isEditable = true;
          } else if (component.format === "TEXT") {
            if (
              selectedTemplate.parameter_format === "POSITIONAL" &&
              component.example?.header_text
            ) {
              newFormData.header.value = "";
              newFormData.header.isEditable = true;
              newFormData.header.fromsegment = false;
              newFormData.header.segmentname = "";
              newFormData.header.segmenttype = "";
              newFormData.header.segmentAltValue = "";
            } else if (
              selectedTemplate.parameter_format === "NAMED" &&
              component.example?.header_text_named_params
            ) {
              newFormData.header.value = "";
              newFormData.header.isEditable = true;
              newFormData.header.fromsegment = false;
              newFormData.header.segmentname = "";
              newFormData.header.segmenttype = "";
              newFormData.header.segmentAltValue = "";
            } else {
              newFormData.header.value = component.text || "";
              newFormData.header.isEditable = false;
              newFormData.header.fromsegment = false;
              newFormData.header.segmentname = "";
              newFormData.header.segmenttype = "";
              newFormData.header.segmentAltValue = "";
            }
          }
        } else if (component.type === "BODY") {
          if (
            selectedTemplate.parameter_format === "POSITIONAL" &&
            component.example?.body_text
          ) {
            newFormData.body = component.example.body_text[0].map(
              (value: any, index: any) => ({
                parameter_name: `{{${index + 1}}}`,
                value: "",
                fromsegment: false,
                segmentname: "",
                segmenttype: "",
                segmentAltValue: "",
              })
            );
          } else if (
            selectedTemplate.parameter_format === "NAMED" &&
            component.example?.body_text_named_params
          ) {
            newFormData.body = component.example.body_text_named_params.map(
              (param: any) => ({
                parameter_name: `{{${param.param_name}}}`,
                value: "",
                fromsegment: false,
                segmentname: "",
                segmenttype: "",
                segmentAltValue: "",
              })
            );
          }
        } else if (component.type === "BUTTONS" && component.buttons) {
          newFormData.buttons = component.buttons.map((button: any) => ({
            type: button.type,
            value: "",
            isEditable: /{{.+?}}/.test(
              button.type === "URL"
                ? button.url || ""
                : button.example?.[0] || ""
            ),
          }));
        }
      });

      setFormData(newFormData);
    }
  }, [selectedTemplate]);

  const hasEditableParts = () => {
    if (!selectedTemplate) return false;


    

    const hasEditableHeader = selectedTemplate.components.some(
      (component: any) =>
        component.type === "HEADER" &&
        ((component.format === "TEXT" &&
          ((selectedTemplate.parameter_format === "POSITIONAL" &&
            component.example?.header_text) ||
            (selectedTemplate.parameter_format === "NAMED" &&
              component.example?.header_text_named_params))) ||
          ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || ""))
    );

    const hasEditableBody = selectedTemplate.components.some(
      (component: any) =>
        component.type === "BODY" &&
        ((selectedTemplate.parameter_format === "POSITIONAL" &&
          component.example?.body_text?.length) ||
          (selectedTemplate.parameter_format === "NAMED" &&
            component.example?.body_text_named_params?.length))
    );

    const hasEditableButtons = selectedTemplate.components.some(
      (component: any) =>
        component.type === "BUTTONS" &&
        component.buttons?.some(
          (button: any) => button.type === "URL" || button.type === "COPY_CODE"
        )
    );

    return hasEditableHeader || hasEditableBody || hasEditableButtons;
  };

  const handleCheckChange = (
    section: "header" | "body" | "buttons",
    index: number,
    value: any
  ) => {
    handleInputChange(section, index, "fromsegment", value);
    if (!value) {
      ["segmentname", "segmentAltValue", "segmenttype"].forEach((field) => {
        handleInputChange(section, index, field, "");
      });
    } else {
      handleInputChange(section, index, "segmenttype", selectedContact.type);
    }
  };

  const handleInputChange = (
    section: "header" | "body" | "buttons",
    index: number,
    key: string,
    value: any
  ) => {
    setFormData((prev: any) => {
      const newData = { ...prev };
      if (section === "header") {
        newData.header = { ...newData.header, [key]: value };
      } else if (section === "body") {
        newData.body[index] = { ...newData.body[index], [key]: value };
      } else if (section === "buttons") {
        newData.buttons[index] = { ...newData.buttons[index], [key]: value };
      }
      return newData;
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
 
    if (file) {
      
      if(file.size>5*1024*1024) {
        toast.error("File size should be less than 5MB")
        return
      }
      const formData = new FormData()
      formData.append("file", file)

      try {
        const promise = uploadFiles(formData).unwrap()
        toast.promise(promise, {
          loading: "Uploading...",
          success: "File uploaded successfully!",
          error: (error: any) => error?.data?.message || "An unexpected error occurred.",
        })
        const data = await promise
        const link = data[0].link

        // Set the header value with the uploaded link
        handleInputChange("header", 0, "value", link)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUploadClick = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.setAttribute("data-upload-type", type)
    }
  }

  const handledropdownItems =
    selectedContact?.type === "excel"
      ? Object.keys(selectedContact?.data[0])
      : ["First Name", "Last Name", "Display Name", "Phone", "Email"];


  if (!selectedTemplate || !selectedContact) {
    return <div>You need to select a template and contacts to acess this</div>;
  }
  return (
    <Card className="bg-transparent text-white shadow-none border-0 h-full overflow-y-scroll no-scrollbar">
      <CardContent className="p-6 ">
        <h2 className="text-xl font-semibold mb-6">Add Content</h2>
        {!hasEditableParts() ? (
          <p className="text-sm text-muted-foreground">
            This template is static and has no editable parts.
          </p>
        ) : (
          <form className="space-y-8">
            {selectedTemplate?.components.map(
              (component: any, index: number) => {
                const hasEditableContent =
                  (component.type === "HEADER" &&
                    ((component.format === "TEXT" &&
                      ((selectedTemplate.parameter_format === "POSITIONAL" &&
                        component.example?.header_text) ||
                        (selectedTemplate.parameter_format === "NAMED" &&
                          component.example?.header_text_named_params))) ||
                      ["IMAGE", "VIDEO", "DOCUMENT"].includes(
                        component.format || ""
                      ))) ||
                  (component.type === "BODY" && formData.body.length > 0) ||
                  (component.type === "BUTTONS" &&
                    formData.buttons.some(
                      (b: any) => b.type === "URL" || b.type === "COPY_CODE"
                    ));

                return (
                  <div key={`${component.type}-${index}`} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-medium">
                        {component.format || component.type}
                      </h3>
                      {!hasEditableContent && (
                        <p className="text-sm text-muted-foreground">
                          This section doesn&apos;t have editable parts
                        </p>
                      )}
                    </div>

                    {component.type === "HEADER" && (
                      <div className="space-y-3">
                        {component.format === "TEXT" &&
                          ((selectedTemplate.parameter_format ===
                            "POSITIONAL" &&
                            component.example?.header_text) ||
                            (selectedTemplate.parameter_format === "NAMED" &&
                              component.example?.header_text_named_params)) && (
                            <div className="space-y-2">
                              <div>
                                <div className="flex gap-20">
                                  <label
                                    htmlFor="header-input"
                                    className="text-sm font-medium"
                                  >
                                    {selectedTemplate.parameter_format ===
                                    "POSITIONAL"
                                      ? "{{1}}"
                                      : `{{${component.example?.header_text_named_params?.[0]?.param_name}}}`}
                                  </label>
                                  <span className="flex items-center gap-3 text-sm">
                                    <Checkbox
                                      className="border-white"
                                      checked={formData.header.fromsegment}
                                      onCheckedChange={(checked) =>
                                        handleCheckChange("header", 0, checked)
                                      }
                                    />
                                    From {selectedContact?.type ?? ""} segment
                                  </span>
                                </div>
                                {!formData.header.fromsegment ? (
                                  <Input
                                    id="header-input"
                                    placeholder="Enter header text"
                                    value={formData.header.value}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "header",
                                        0,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    className="border-blue-500 focus:ring-blue-500"
                                  />
                                ) : (
                                  <Select
                                    value={formData.header.segmentname}
                                    onValueChange={(value) =>
                                      handleInputChange(
                                        "header",
                                        0,
                                        "segmentname",
                                        value
                                      )
                                    }
                                  >
                                    <SelectTrigger className="basis-2/4">
                                      <SelectValue placeholder="Select a field" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {handledropdownItems.map((item) => (
                                          <SelectItem key={item} value={item}>
                                            {item}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                              {formData.header.fromsegment && (
                                <div className="w-full">
                                  <label
                                    htmlFor="header-alternative"
                                    className="text-sm font-medium"
                                  >
                                    {selectedTemplate.parameter_format ===
                                    "POSITIONAL"
                                      ? "Enter fallback values for {{1}}"
                                      : `Enter fallback values for {{${component.example?.header_text_named_params?.[0]?.param_name}}}`}
                                  </label>
                                  <Input
                                    id="header-alternative"
                                    placeholder="Enter fallback value text"
                                    value={formData.header.segmentAltValue}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "header",
                                        0,
                                        "segmentAltValue",
                                        e.target.value
                                      )
                                    }
                                    className="border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        {["IMAGE", "VIDEO", "DOCUMENT"].includes(
                          component.format || ""
                        ) && (
                          <>
                            <p className="text-sm text-muted-foreground">
                              Upload a {component?.format?.toLowerCase()} under
                              5 MB with a recommended aspect ratio of 1.91:1.
                            </p>
                            <input
                              type="file"
                              accept={
                                component.format === "IMAGE"
                                  ? "image/*"
                                  : component.format === "VIDEO"
                                  ? "video/*"
                                  : "*/*"
                              }
                              onChange={handleFileUpload}
                              className="hidden"
                              ref={fileInputRef}
                            />
                            <Button
                              type="button"
                              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
                              onClick={() => handleUploadClick(component.format || "")}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload {component?.format?.toLowerCase()}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                    {component.type === "BODY" && formData.body.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Enter the parameters for your message.
                        </p>
                        {formData.body.map((param: any, paramIndex: any) => (
                          <div key={`body-${paramIndex}`} className="space-y-2">
                            <div className="flex gap-20">
                              <label
                                htmlFor={`body-${paramIndex}`}
                                className="text-sm font-medium"
                              >
                                {param.parameter_name}
                              </label>
                              <span className="flex items-center gap-3 text-sm">
                                <Checkbox
                                  className="border-white"
                                  checked={param.fromsegment}
                                  onCheckedChange={(checked) =>
                                    handleCheckChange(
                                      "body",
                                      paramIndex,
                                      checked
                                    )
                                  }
                                />
                                From {selectedContact?.type ?? ""} segment
                              </span>
                            </div>
                            {!param.fromsegment ? (
                              <Input
                                id={`body-${paramIndex}`}
                                placeholder={`Enter value for ${param.parameter_name}`}
                                value={param.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    "body",
                                    paramIndex,
                                    "value",
                                    e.target.value
                                  )
                                }
                                className="border-blue-500 focus:ring-blue-500"
                              />
                            ) : (
                              <Select
                                value={param.segmentname}
                                onValueChange={(value) =>
                                  handleInputChange(
                                    "body",
                                    paramIndex,
                                    "segmentname",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="basis-2/4">
                                  <SelectValue placeholder="Select a field" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {handledropdownItems.map((item) => (
                                      <SelectItem key={item} value={item}>
                                        {item}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                            {param.fromsegment && (
                              <div className="w-full">
                                <label
                                  htmlFor="header-alternative"
                                  className="text-sm font-medium"
                                >
                                  {selectedTemplate.parameter_format ===
                                    `Enter fallback values for {{${param.parameter_name}}}}`}
                                </label>
                                <Input
                                  id="header-alternative"
                                  placeholder="Enter fallback value text"
                                  value={param.segmentAltValue}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "body",
                                      paramIndex,
                                      "segmentAltValue",
                                      e.target.value
                                    )
                                  }
                                  className="border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {component.type === "BUTTONS" &&
                      formData.buttons.map((button: any, buttonIndex: any) => (
                        <div
                          key={`button-${buttonIndex}`}
                          className="space-y-3"
                        >
                          <h3 className="text-base font-medium">
                            {button.type === "URL"
                              ? "CTA Button"
                              : button.type === "COPY_CODE"
                              ? "Copy Code"
                              : "Button"}
                          </h3>
                          {(button.type === "URL" ||
                            button.type === "COPY_CODE") && (
                            <>
                              <p className="text-sm text-muted-foreground">
                                Enter the{" "}
                                {button.type === "URL"
                                  ? "URL for the CTA Button"
                                  : "code to copy"}
                              </p>
                              <Input
                                placeholder={
                                  button.type === "URL"
                                    ? "Enter URL"
                                    : "Enter code to copy"
                                }
                                value={button.value}
                                disabled={!button.isEditable}
                                onChange={(e) =>
                                  handleInputChange(
                                    "buttons",
                                    buttonIndex,
                                    "value",
                                    e.target.value
                                  )
                                }
                                className="border-blue-500 focus:ring-blue-500"
                              />
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                );
              }
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default AddContentForm;
