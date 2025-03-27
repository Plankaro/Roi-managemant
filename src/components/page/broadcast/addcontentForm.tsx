"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import type React from "react"
import { useEffect, useRef } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { useUploadFilesMutation } from "@/store/features/apislice"
import { Eye } from "lucide-react"
function AddContentForm({
  selectedContact,
  selectedTemplate,
  formData,
  setFormData,
  errors,
}: {
  selectedContact: any
  selectedTemplate: any
  formData: any
  setFormData: (data: any) => void
  errors: any
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

          segmentAltValue: "",
        },
        body: [] as {
          parameter_name: string
          value: string
          fromsegment: boolean
          segmentname: string

          segmentAltValue: string
        }[],
        buttons: [] as {index:number; type: string; value: string; isEditable: boolean }[],
      }

      selectedTemplate.components.forEach((component: any) => {
        if (component.type === "HEADER") {
          newFormData.header.type = component.format || ""
          if (["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") && component.example?.header_handle) {
            newFormData.header.value = ""
            newFormData.header.isEditable = true
          } else if (component.format === "TEXT") {
            if (selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) {
              newFormData.header.value = ""
              newFormData.header.isEditable = true
              newFormData.header.fromsegment = false
              newFormData.header.segmentname = ""

              newFormData.header.segmentAltValue = ""
            } else if (selectedTemplate.parameter_format === "NAMED" && component.example?.header_text_named_params) {
              newFormData.header.value = ""
              newFormData.header.isEditable = true
              newFormData.header.fromsegment = false
              newFormData.header.segmentname = ""

              newFormData.header.segmentAltValue = ""
            } else {
              newFormData.header.value = component.text || ""
              newFormData.header.isEditable = false
              newFormData.header.fromsegment = false
              newFormData.header.segmentname = ""

              newFormData.header.segmentAltValue = ""
            }
          }
        } else if (component.type === "BODY") {
          if (selectedTemplate.parameter_format === "POSITIONAL" && component.example?.body_text) {
            newFormData.body = component.example.body_text[0].map((value: any, index: any) => ({
              parameter_name: `{{${index + 1}}}`,
              value: "",
              fromsegment: false,
              segmentname: "",

              segmentAltValue: "",
            }))
          } else if (selectedTemplate.parameter_format === "NAMED" && component.example?.body_text_named_params) {
            newFormData.body = component.example.body_text_named_params.map((param: any) => ({
              parameter_name: `{{${param.param_name}}}`,
              value: "",
              fromsegment: false,
              segmentname: "",

              segmentAltValue: "",
            }))
          }
        } else if (component.type === "BUTTONS" && component.buttons) {
          newFormData.buttons = component.buttons.map((button: any,index:number) => ({
            type: button.type,
            index: index,
            value: "",
            isEditable: button?.example?true: false,
            text: button.text ?? "jhh",
          }))
        }
      })

      setFormData(newFormData)
    }
  }, [selectedTemplate])

  const hasEditableParts = () => {
    if (!selectedTemplate) return false

    const hasEditableHeader = selectedTemplate.components.some(
      (component: any) =>
        component.type === "HEADER" &&
        ((component.format === "TEXT" &&
          ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
            (selectedTemplate.parameter_format === "NAMED" && component.example?.header_text_named_params))) ||
          ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "")),
    )

    const hasEditableBody = selectedTemplate.components.some(
      (component: any) =>
        component.type === "BODY" &&
        ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.body_text?.length) ||
          (selectedTemplate.parameter_format === "NAMED" && component.example?.body_text_named_params?.length)),
    )

    const hasEditableButtons = selectedTemplate.components.some(
      (component: any) =>
        component.type === "BUTTONS" &&
        component.buttons?.some((button: any) => button.type === "URL" || button.type === "COPY_CODE"),
    )

    return hasEditableHeader || hasEditableBody || hasEditableButtons
  }

  const handleInputChange = (section: "header" | "body" | "buttons", index: number, key: string, value: any) => {
    const newData = { ...formData }
    if (section === "header") {
      newData.header = { ...formData.header, [key]: value }
    } else if (section === "body") {
      newData.body[index] = { ...formData.body[index], [key]: value }
    } else if (section === "buttons") {
      newData.buttons[index] = { ...formData?.buttons[index], [key]: value }
    }
    setFormData(newData)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
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

  console.log(errors)

  const handleUploadClick = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.setAttribute("data-upload-type", type)
    }
  }

  const handledropdownItems =
    selectedContact?.type === "excel"
      ? Object.keys(selectedContact?.data[0] || {}).map((key) => ({
          type: `${key} from  excel`,
          value: key,
        }))
      : [
          { type: "First Name from shopify", value: "firstName" },
          { type: "Last Name from shopify", value: "lastName" },
          { type: "displayName from shopify", value: "displayName" },
          { type: "Phone from shopify", value: "phone" },
          { type: "Email from shopify", value: "email" },
        ]

  if (!selectedTemplate || !selectedContact) {
    return <div className="md:text-base text-sm">You need to select a template and contacts to acess this</div>
  }
  return (
    <Card className="bg-transparent text-white shadow-none p-0 border-0 h-full overflow-y-scroll no-scrollbar">
      <CardContent className=" p-0">
        {!hasEditableParts() ? (
          <p className="text-sm text-muted-foreground">This template is static and has no editable parts.</p>
        ) : (
          <form className="space-y-8">
            {selectedTemplate?.components.map((component: any, index: number) => {
              const hasEditableContent =
                (component.type === "HEADER" &&
                  ((component.format === "TEXT" &&
                    ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
                      (selectedTemplate.parameter_format === "NAMED" &&
                        component.example?.header_text_named_params))) ||
                    ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || ""))) ||
                (component.type === "BODY" && formData?.body?.length > 0) ||
                (component.type === "BUTTONS" &&
                  formData?.buttons?.some((b: any) => b.type === "URL" || b.type === "COPY_CODE"))

              return (
                <div key={`${component.type}-${index}`} className="space-y-4">
                  {hasEditableContent && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-medium">{component.format || component.type}</h3>
                    </div>
                  )}

                  {component.type === "HEADER" && (
                    <div className="space-y-3">
                      {component.format === "TEXT" &&
                        ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
                          (selectedTemplate.parameter_format === "NAMED" &&
                            component.example?.header_text_named_params)) && (
                          <div className={`h-full lg:flex-row  flex flex-col gap-4`}>
                            <div className={`lg:basis-1/2 flex flex-col gap-3`}>
                              <div className="flex justify-between">
                                <label htmlFor="header-input" className= {`font-medium text-sm text-gray-400
                                  ${errors?.templateForm?.header?.value || errors?.templateForm?.header?.segmentname ? "text-red-500" : ""}
                                  `}>
                                  {selectedTemplate.parameter_format === "POSITIONAL"
                                    ? "{{1}}"
                                    : `{{${component.example?.header_text_named_params?.[0]?.param_name}}}`}
                                </label>
                                <span className="sm:flex hidden items-center gap-3 md:text-sm  text-xs font-medium text-gray-400 ">
                                  <Checkbox
                                    className="border border-white"
                                    variant="blue"
                                    checked={formData?.header?.fromsegment}
                                    onCheckedChange={(checked) => {
                                      handleInputChange("header", 0, "fromsegment", checked)
                                    }}
                                  />
                                  Select Content from {selectedContact?.type ?? ""} segment
                                </span>
                              </div>
                              {!formData.header.fromsegment ? (
                                <div className="space-y-3">
                                <Input
                                  id="header-input"
                                  placeholder="Enter header text"
                                  value={formData?.header?.value}
                                  onChange={(e) => handleInputChange("header", 0, "value", e.target.value)}
                                  className={`border-blue-500 focus:ring-blue-500 `}
                                />
                                {errors?.templateForm?.header?.value && (
                                  <p className="text-red-500 text-xs mt-1">Missing field value</p>
                                )}
                                </div>

                              ) : (
                                <div className="space-y-3">
                                <Select
                                  value={formData?.header?.segmentname}
                                  onValueChange={(value) => handleInputChange("header", 0, "segmentname", value)}
                                >
                                  <SelectTrigger
                                    className={`lg:basis-1/2 `}
                                  >
                                    <SelectValue placeholder="Select a field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {handledropdownItems.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                          {item.type}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {errors?.templateForm?.header?.segmentname && (
                                  <p className="text-red-500 text-xs mt-1">select the segment from where you want the data</p>
                                )}
                                </div>
                              )}
                            </div>
                            <span className="flex items-center sm:hidden gap-3 md:text-sm  text-xs font-medium text-gray-400">
                              <Checkbox
                                className="border border-white"
                                variant="blue"
                                checked={formData?.header?.fromsegment}
                                onCheckedChange={(checked) => {
                                  handleInputChange("header", 0, "fromsegment", checked)
                                }}
                              />
                              Select Content from {selectedContact?.type ?? ""} segment
                            </span>
                            {formData?.header?.fromsegment && (
                              <div className="w-full flex flex-col gap-3 lg:basis-1/2">
                                <label htmlFor="header-alternative" className={`text-sm font-medium  ${
                                    errors?.templateForm?.header?.segmentAltValue
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  }`}>
                                  {selectedTemplate.parameter_format === "POSITIONAL"
                                    ? "Enter fallback values for {{1}}"
                                    : `Enter fallback values for {{${component.example?.header_text_named_params?.[0]?.param_name}}}`}
                                </label>
                                <div className="space-y-3">
                                <Input
                                  id="header-alternative"
                                  placeholder="Enter fallback value text "
                                  value={formData?.header?.segmentAltValue}
                                  onChange={(e) => handleInputChange("header", 0, "segmentAltValue", e.target.value)}
                                  className={`border-blue-500 focus:ring-blue-500 xl:w-9/12 `}
                                />
                                {errors?.templateForm?.header?.segmentAltValue && (
                                  <p className="text-red-500 text-xs mt-1">You need fallback value for segments</p>
                                )}
                              </div>
                              </div>
                            )}
                          </div>
                        )}
                      {["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") && (
                        <>
                          <p
                            className={`sm:text-sm text-xs ${
                              errors?.templateForm?.header?.value && !formData?.header?.value
                                ? "text-red-500 font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            Upload a {component?.format?.toLowerCase()} under 5 MB with a recommended aspect ratio of
                            1.91:1.
                            {errors?.templateForm?.header?.value && !formData?.header?.value && " (Required)"}
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
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              className={`w-full sm:w-auto  bg-blue-500 hover:bg-blue-600 text-white`}
                              onClick={() => handleUploadClick(component.format || "")}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              <span className="md:text-base text-sm ">Upload {component?.format?.toLowerCase()}</span>
                            </Button>
                            {formData?.header?.value && (
                              <a
                                href={formData?.header?.value ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center gap-2 md:px-3 md:py-1 p-2   bg-blue-500 text-white font-semibold sm:rounded-md rounded-full shadow-md transition-all duration-200"
                              >
                                <Eye className="w-5 h-5 " />
                                <span className="sm:text-base md:block hidden ">Preview File</span>
                              </a>
                            )}
                          </div>
                          {errors?.templateForm?.header?.value && !formData?.header?.value && (
                            <p className="text-red-500 text-sm mt-1">
                              Please upload a {component?.format?.toLowerCase()} file
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {component.type === "BODY" && formData?.body?.length > 0 && (
                    <div className="space-y-3 flex flex-col gap-6">
                      {formData.body.map((param: any, paramIndex: any) => (
                        <div key={`body-${paramIndex}`} className="flex lg:flex-row flex-col gap-6">
                          <div className="flex flex-col gap-2  lg:basis-1/2">
                            <div className={`  flex flex-col gap-3 `}>
                              <div className="flex justify-between text-gray-400">
                                <label htmlFor={`body-${paramIndex}`} className={`text-sm font-medium ${ errors?.templateForm?.body?.[paramIndex]?.value || errors?.templateForm?.body?.[paramIndex]?.segmentname ? "text-red-500" : ""}`}>
                                  {param.parameter_name}
                                </label>
                                <span className="sm:flex hidden items-center gap-3 md:text-sm text-xs">
                                  <Checkbox
                                    className="border-white "
                                    variant="blue"
                                    checked={param?.fromsegment}
                                    onCheckedChange={(checked) =>
                                      handleInputChange("body", paramIndex, "fromsegment", checked)
                                    }
                                  />
                                  Select Content from {selectedContact?.type ?? ""} segment
                                </span>
                              </div>
                              {!param.fromsegment ? (
                                <div className="space-y-3">
                                <Input
                                  id={`body-${paramIndex}`}
                                  placeholder={`Enter value for ${param.parameter_name}`}
                                  value={param.value}
                                  onChange={(e) => handleInputChange("body", paramIndex, "value", e.target.value)}
                                  className={`border-blue-500 focus:ring-blue-500`}
                                />
                                {errors?.templateForm?.body?.[paramIndex]?.value && (
                                  <p className="text-red-500 text-xs mt-1">Missing field value</p>
                                )}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                <Select
                                  value={param.segmentname}
                                  onValueChange={(value) => handleInputChange("body", paramIndex, "segmentname", value)}
                                >
                                  <SelectTrigger
                                    className={``}
                                  >
                                    <SelectValue placeholder="Select a field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {handledropdownItems.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                          {item.type}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {errors?.templateForm?.body?.[paramIndex]?.segmentname && (
                                  <p className="text-red-500 text-xs mt-1">select the segment from where you want the data</p>
                                )}
                                </div>
                              )}
                            </div>
                            <span className="sm:hidden flex items-center gap-3 md:text-sm text-xs">
                              <Checkbox
                                className="border-white"
                                variant="blue"
                                checked={param?.fromsegment}
                                onCheckedChange={(checked) =>
                                  handleInputChange("body", paramIndex, "fromsegment", checked)
                                }
                              />
                              Select Content from {selectedContact?.type ?? ""} segment
                            </span>
                          </div>
                          {param.fromsegment && (
                            <div className="w-full flex flex-col gap-3 lg:basis-1/2">
                              <label htmlFor="header-alternative" className={`text-sm font-medium text-gray-400 ${errors?.templateForm?.body?.[paramIndex]?.segmentAltValue ? "text-red-500" : ""}`}>
                                Enter fallback values for {param.parameter_name}
                              </label>
                              <div>
                              <Input
                                id="header-alternative"
                                placeholder="Enter fallback value text"
                                value={param.segmentAltValue}
                                onChange={(e) =>
                                  handleInputChange("body", paramIndex, "segmentAltValue", e.target.value)
                                }
                                className={`border-blue-500 focus:ring-blue-500 xl:w-9/12 `}
                              />
                            </div>
                            {errors?.templateForm?.body?.[paramIndex]?.segmentAltValue && (
                              <p className="text-red-500 text-xs mt-1">You need fallback value for {param.parameter_name}</p>
                            )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {component.type === "BUTTONS" &&
                    formData?.buttons?.map((button: any, buttonIndex: any) => (
                      <div key={`button-${buttonIndex}`} className="space-y-3">
                        <h3 className="text-base font-medium">
                          {button.type === "URL" ? "CTA Button" : button.type === "COPY_CODE" ? "Copy Code" : ""}
                        </h3>
                        {(button.type === "URL" || button.type === "COPY_CODE") && (
                          <>
                            <p className="text-sm text-muted-foreground text-gray-400">
                              Enter the {button.type === "URL" ? "URL for the CTA Button" : "code to copy"}
                            </p>
                            <Input
                              placeholder={button.type === "URL" ? "Enter URL" : "Enter code to copy"}
                              value={button.value}
                              disabled={!button.isEditable}
                              onChange={(e) => handleInputChange("buttons", buttonIndex, "value", e.target.value)}
                              className={`border-blue-500 focus:ring-blue-500 xl:w-1/2 ${
                                errors?.templateForm?.buttons?.[buttonIndex]?.value
                                  ? "border-red-500 ring-1 ring-red-500"
                                  : ""
                              }`}
                            />
                          </>
                        )}
                      </div>
                    ))}
                </div>
              )
            })}
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default AddContentForm

