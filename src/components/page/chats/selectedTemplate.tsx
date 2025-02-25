/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { useUploadFilesMutation } from "@/store/features/apislice"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useSendTemplatesMutation } from "@/store/features/apislice"
import { useDispatch } from "react-redux"
import { setChats } from "@/store/features/chatSlice"

interface TemplateComponent {
  type: string
  format?: string
  text?: string
  example?: {
    header_handle?: string[]
    header_text?: string[]
    header_text_named_params?: { param_name: string; example: string }[]
    body_text?: string[][]
    body_text_named_params?: { param_name: string; example: string }[]
  }
  buttons?: {
    type: string
    text: string
    url?: string
    phone_number?: string
    example?: string[]
  }[]
}

interface Template {
  name: string
  parameter_format: string
  components: TemplateComponent[]
  language: string
  status: string
  category: string
  sub_category?: string
  id: string
}

interface TemplateProps {
  selectedTemplate?: Template
}

const SelectedTemplateForm: React.FC<TemplateProps> = ({ selectedTemplate }) => {
  const dispatch = useDispatch()
  const [sendTemplate] = useSendTemplatesMutation({})
 
  const selectedProspect = useSelector(
    (state: RootState) => state.Prospect?.selectedProspect
  )
  const [uploadFiles, { isLoading: isuploadingfile }] = useUploadFilesMutation()
  const [formData, setFormData] = useState<{
    header: { type: string; value: string; isEditable: boolean }
    body: { parameter_name: string; value: string }[]
    buttons: { type: string; value: string,isEditable: boolean ,text:string}[]
  }>({
    header: { type: "", value: "", isEditable: false },
    body: [],
    buttons: [],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  console.log(selectedTemplate)

  useEffect(() => {
    if (selectedTemplate) {
      const newFormData = {
        header: { type: "", value: "", isEditable: false },
        body: [] as { parameter_name: string; value: string }[],
        buttons: [] as { type: string; value: string ;isEditable: boolean,text:string}[],
      }

      selectedTemplate.components.forEach((component) => {
        if (component.type === "HEADER") {
          newFormData.header.type = component.format || ""
          if (
            ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") &&
            component.example?.header_handle
          ) {
            newFormData.header.value = component.example.header_handle[0]
            newFormData.header.isEditable = true
          } else if (component.format === "TEXT") {
            if (
              selectedTemplate.parameter_format === "POSITIONAL" &&
              component.example?.header_text
            ) {
              newFormData.header.value = component.example.header_text[0]
              newFormData.header.isEditable = true
            } else if (
              selectedTemplate.parameter_format === "NAMED" &&
              component.example?.header_text_named_params
            ) {
              newFormData.header.value = component.example.header_text_named_params[0].example
              newFormData.header.isEditable = true
            } else {
              newFormData.header.value = component.text || ""
              newFormData.header.isEditable = false
            }
          }
        } else if (component.type === "BODY") {
          if (
            selectedTemplate.parameter_format === "POSITIONAL" &&
            component.example?.body_text
          ) {
            newFormData.body = component.example.body_text[0].map((value, index) => ({
              parameter_name: `{{${index + 1}}}`,
              value,
            }))
          } else if (
            selectedTemplate.parameter_format === "NAMED" &&
            component.example?.body_text_named_params
          ) {
            newFormData.body = component.example.body_text_named_params.map((param) => ({
              parameter_name: `{{${param.param_name}}}`,
              value: param.example,
            }))
          }
        } else if (component.type === "BUTTONS" && component.buttons) {
          newFormData.buttons = component.buttons.map((button) => ({
            type: button.type,
            value: button.type === "URL" ? button.url || "" : button.example?.[0] || "",
            isEditable: /{{.+?}}/.test(button.type === "URL" ? button.url || "" : button.example?.[0] || ""),
            text:button.text ??"jhh",
          }))
        }
      })

      setFormData(newFormData)
    }
  }, [selectedTemplate])

  if (!selectedTemplate) {
    return <div>No template selected</div>
  }
  console.log(selectedTemplate.components)

  const handleInputChange = (
    section: "header" | "body" | "buttons",
    index: number,
    key: string,
    value: string
  ) => {
    setFormData((prev) => {
      const newData = { ...prev }
      if (section === "header") {
        newData.header = { ...newData.header, [key]: value }
      } else if (section === "body") {
        newData.body[index] = { ...newData.body[index], [key]: value }
      } else if (section === "buttons") {
        newData.buttons[index] = { ...newData.buttons[index], [key]: value }
      }
      return newData
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
 
    if (file) {
      console.log(file.size)
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

  const validateForm = () => {
    if (!selectedTemplate) return false

    // Check header
    if (formData.header.isEditable && !formData.header.value) {
      toast.error("Please fill in the header content")
      return false
    }

    // Check body parameters
    const emptyBodyParams = formData.body.filter((param) => !param.value)
    if (emptyBodyParams.length > 0) {
      toast.error("Please fill in all body parameters")
      return false
    }

    // Check button values
    const emptyButtons = formData.buttons.filter(
      (button) => (button.type === "URL" || button.type === "COPY_CODE") && !button.value
    )
    if (emptyButtons.length > 0) {
      toast.error("Please fill in all button values")
      return false
    }

    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
   
    if (validateForm()) {
      // Build the preview header using formData.header
      const previewHeader = {
        type: formData.header.type,
        value: formData.header.value,
      }

      // Compute the full body text by replacing variables in the template’s body text
      let previewBodyText = ""
      selectedTemplate.components.forEach((component) => {
        if (component.type === "BODY") {
          let text = component.text || ""
          formData.body.forEach((param) => {
            text = text.replace(param.parameter_name, param.value)
          })
          previewBodyText = text
        }
      })

      // Get footer text from the template if available
      let previewFooter = ""
      selectedTemplate.components.forEach((component) => {
        if (component.type === "FOOTER") {
          previewFooter = component.text || ""
        }
      })

      // Build an array of button names from the template buttons
      const previewButtons: string[] = []
      selectedTemplate.components.forEach((component) => {
        if (component.type === "BUTTONS" && component.buttons) {
          component.buttons.forEach((button) => {
            previewButtons.push(button.text)
          })
        }
      })

      // Prepare the payload including the preview section
      const logData = {
        recipientNo: selectedProspect?.phoneNo,
        template_name: selectedTemplate.name,
        language: selectedTemplate.language,
        parameter_format: selectedTemplate.parameter_format,
        header: { ...formData.header },
        body: formData.body.map((param) => ({
          ...param,
          parameter_name: param.parameter_name.replace(/[{}]/g, ""),
        })),
        buttons: formData.buttons.filter(
          (button) => button.type === "URL" || button.type === "COPY_CODE"
        ),
        previewSection: {
          header: previewHeader,
          bodyText: previewBodyText,
          footer: previewFooter,
          buttons: previewButtons,
        },
      }
      console.log(logData)
      const response = await sendTemplate(logData)
      dispatch(setChats([response.data]))
      

      toast.success("Message sent successfully")
    }
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const renderPreview = () => {
    const previewContent = selectedTemplate.components.map((component, index) => {
      switch (component.type) {
        case "HEADER":
          if (
            ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") &&
            formData.header.value
          ) {
            const headerContent = formData.header.value
            return (
              <div key={`preview-header-${index}`} className="mb-3">
                {component.format === "IMAGE" &&
                  (isValidUrl(headerContent) ? (
                    <Image
                      src={headerContent || "/placeholder.svg"}
                      alt="Header image"
                      width={300}
                      height={300}
                      className="aspect-square rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                      <p className="text-gray-500">Invalid image URL</p>
                    </div>
                  ))}
                {component.format === "VIDEO" &&
                  (isValidUrl(headerContent) ? (
                    <video src={headerContent} controls className="w-full rounded-lg" />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
                      <p className="text-gray-500">Invalid video URL</p>
                    </div>
                  ))}
                {component.format === "DOCUMENT" && (
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-12 w-12 text-gray-500" />
                  </div>
                )}
              </div>
            )
          } else if (component.format === "TEXT") {
            return (
              <h3 key={`preview-header-${index}`} className="font-medium text-lg mb-2">
                {formData.header.value || component.text}
              </h3>
            )
          }
          break
        case "BODY":
          let bodyText = component.text || ""
          formData.body.forEach((param) => {
            bodyText = bodyText.replace(param.parameter_name, param.value)
          })
          return (
            <p key={`preview-body-${index}`} className="text-sm mb-4 whitespace-pre-line">
              {bodyText}
            </p>
          )
        case "FOOTER":
          return (
            <p key={`preview-footer-${index}`} className="text-xs text-gray-500 mb-2">
              {component.text}
            </p>
          )
        case "BUTTONS":
          return (
            <div key={`preview-buttons-${index}`} className="space-y-2">
              {component.buttons?.map((button, i) => (
                <Button key={`preview-button-${i}`} variant="outline" className="text-xs w-full">
                  {button.text}
                </Button>
              ))}
            </div>
          )
      }
    })

    return (
      <Card className="p-4">
        <div className="space-y-2">{previewContent}</div>
      </Card>
    )
  }

  const hasEditableParts = () => {
    if (!selectedTemplate) return false

    const hasEditableHeader = selectedTemplate.components.some(
      (component) =>
        component.type === "HEADER" &&
        ((component.format === "TEXT" &&
          ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
            (selectedTemplate.parameter_format === "NAMED" && component.example?.header_text_named_params))) ||
          ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || ""))
    )

    const hasEditableBody = selectedTemplate.components.some(
      (component) =>
        component.type === "BODY" &&
        ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.body_text?.length) ||
          (selectedTemplate.parameter_format === "NAMED" && component.example?.body_text_named_params?.length))
    )

    const hasEditableButtons = selectedTemplate.components.some(
      (component) =>
        component.type === "BUTTONS" &&
        component.buttons?.some((button) => button.type === "URL" || button.type === "COPY_CODE")
    )

    return hasEditableHeader || hasEditableBody || hasEditableButtons
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] xl:grid-cols-[1.2fr,1fr] gap-6">
      <div className="space-y-6 h-[90%]">
        <Card className="bg-white shadow-none border-0 h-full overflow-y-scroll no-scrollbar">
          <CardContent className="p-6 ">
            <h2 className="text-xl font-semibold mb-6">Add Content</h2>
            {!hasEditableParts() ? (
              <p className="text-sm text-muted-foreground">This template is static and has no editable parts.</p>
            ) : (
              <form className="space-y-8">
                {selectedTemplate?.components.map((component, index) => {
                  const hasEditableContent =
                    (component.type === "HEADER" &&
                      ((component.format === "TEXT" &&
                        ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
                          (selectedTemplate.parameter_format === "NAMED" &&
                            component.example?.header_text_named_params))) ||
                        ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || ""))) ||
                    (component.type === "BODY" && formData.body.length > 0) ||
                    (component.type === "BUTTONS" &&
                      formData.buttons.some((b) => b.type === "URL" || b.type === "COPY_CODE"))

                  return (
                    <div key={`${component.type}-${index}`} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium">{component.format || component.type}</h3>
                        {!hasEditableContent && (
                          <p className="text-sm text-muted-foreground">This section doesn&apos;t have editable parts</p>
                        )}
                      </div>

                      {component.type === "HEADER" && (
                        <div className="space-y-3">
                          {component.format === "TEXT" &&
                            ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
                              (selectedTemplate.parameter_format === "NAMED" &&
                                component.example?.header_text_named_params)) && (
                              <div className="space-y-2">
                                <label htmlFor="header-input" className="text-sm font-medium">
                                  {selectedTemplate.parameter_format === "POSITIONAL"
                                    ? "{{1}}"
                                    : `{{${component.example?.header_text_named_params?.[0]?.param_name}}}`}
                                </label>
                                <Input
                                  id="header-input"
                                  placeholder="Enter header text"
                                  value={formData.header.value}
                                  onChange={(e) => handleInputChange("header", 0, "value", e.target.value)}
                                  className="border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            )}
                          {["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") && (
                            <>
                              <p className="text-sm text-muted-foreground">
                                Upload a {component?.format?.toLowerCase()} under 5 MB with a recommended aspect ratio of
                                1.91:1.
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
                          <p className="text-sm text-muted-foreground">Enter the parameters for your message.</p>
                          {formData.body.map((param, paramIndex) => (
                            <div key={`body-${paramIndex}`} className="space-y-2">
                              <label htmlFor={`body-${paramIndex}`} className="text-sm font-medium">
                                {param.parameter_name}
                              </label>
                              <Input
                                id={`body-${paramIndex}`}
                                placeholder={`Enter value for ${param.parameter_name}`}
                                value={param.value}
                                onChange={(e) => handleInputChange("body", paramIndex, "value", e.target.value)}
                                className="border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {component.type === "BUTTONS" &&
                        formData.buttons.map((button, buttonIndex) => (
                          <div key={`button-${buttonIndex}`} className="space-y-3">
                            <h3 className="text-base font-medium">
                              {button.type === "URL"
                                ? "CTA Button"
                                : button.type === "COPY_CODE"
                                  ? "Copy Code"
                                  : "Button"}
                            </h3>
                            {(button.type === "URL" || button.type === "COPY_CODE") && (
                              <>
                                <p className="text-sm text-muted-foreground">
                                  Enter the {button.type === "URL" ? "URL for the CTA Button" : "code to copy"}
                                </p>
                                <Input
                                  placeholder={button.type === "URL" ? "Enter URL" : "Enter code to copy"}
                                  value={button.value}
                                  disabled={!button.isEditable}
                                  onChange={(e) => handleInputChange("buttons", buttonIndex, "value", e.target.value)}
                                  className="border-blue-500 focus:ring-blue-500"
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
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          {renderPreview()}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="lg"
            disabled={isuploadingfile}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SelectedTemplateForm
