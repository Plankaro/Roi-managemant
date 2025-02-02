import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface TemplateComponent {
  type: string
  format?: string
  text?: string
  example?: {
    header_handle?: string[]
    body_text?: string[][]
    body_text_named_params?: { param_name: string; example: string }[]
  }
  buttons?: {
    type: string
    text: string
    url?: string
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
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedTemplate) {
      const defaultData: { [key: string]: string } = {}
      selectedTemplate.components.forEach((component, index) => {
        if (component.type === "HEADER") {
          if (component.format === "TEXT") {
            defaultData[`header-${component.type}`] = component.text || ""
          } else if (component.format === "IMAGE" && component.example?.header_handle) {
            defaultData[`header-${component.type}`] = component.example.header_handle[0]
          }
        } else if (component.type === "BODY") {
          if (selectedTemplate.parameter_format === "POSITIONAL" && component.example?.body_text) {
            component.example.body_text[0].forEach((value, i) => {
              defaultData[`body-${i}`] = value
            })
          } else if (selectedTemplate.parameter_format === "NAMED" && component.example?.body_text_named_params) {
            component.example.body_text_named_params.forEach((param) => {
              defaultData[`body-${param.param_name}`] = param.example
            })
          }
        } else if (component.type === "BUTTONS" && component.buttons) {
          component.buttons.forEach((button, i) => {
            defaultData[`button-${i}`] = button.text || ""
          })
        }
      })
      setFormData(defaultData)
    }
  }, [selectedTemplate])

  if (!selectedTemplate) {
    return <div>No template selected</div>
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const uploadedUrl = e.target?.result as string
        handleInputChange(type, uploadedUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.setAttribute("data-upload-type", type)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Form Data:", formData)
    // Here you would typically send this data to your backend
  }

  const renderPreview = () => {
    let previewContent = selectedTemplate.components.map((component, index) => {
      switch (component.type) {
        case "HEADER":
          if (component.format === "IMAGE" && formData[`header-${component.type}`]) {
            return (
              <Image
                key={`preview-header-${index}`}
                src={formData[`header-${component.type || "/placeholder.svg"}`]}
                alt="Header image"
                width={300}
                height={300}
                className="aspect-square rounded-lg mb-3 object-cover"
              />
            )
          } else if (component.format === "TEXT") {
            return (
              <h3 key={`preview-header-${index}`} className="font-medium text-sm mb-2">
                {formData[`header-${component.type}`] || component.text}
              </h3>
            )
          }
          break
        case "BODY":
          let bodyText = component.text || ""
          if (selectedTemplate.parameter_format === "POSITIONAL") {
            component.example?.body_text?.[0]?.forEach((_, i) => {
              bodyText = bodyText.replace(`{{${i + 1}}}`, formData[`body-${i}`] || `{{${i + 1}}}`)
            })
          } else if (selectedTemplate.parameter_format === "NAMED") {
            component.example?.body_text_named_params?.forEach((param) => {
              bodyText = bodyText.replace(`{{${param.param_name}}}`, formData[`body-${param.param_name}`] || `{{${param.param_name}}}`)
            })
          }
          return (
            <p key={`preview-body-${index}`} className="text-xs mb-2 whitespace-pre-line">
              {bodyText}
            </p>
          )
        case "BUTTONS":
          return component.buttons?.map((button, i) => (
            <Button key={`preview-button-${i}`} variant="outline" className="text-xs mt-2 w-full">
              {formData[`button-${i}`] || button.text}
            </Button>
          ))
      }
    })

    return (
      <Card className="p-3">
        <div className="space-y-1.5">{previewContent}</div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Template: {selectedTemplate.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedTemplate.components.map((component, index) => (
              <div key={`${component.type}-${index}`} className="space-y-2">
                <h3 className="text-sm font-medium">{component.type}</h3>
                {component.type === "HEADER" && (
                  <>
                    {component.format === "TEXT" && (
                      <Input
                        placeholder="Enter header text"
                        value={formData[`header-${component.type}`] || ""}
                        onChange={(e) => handleInputChange(`header-${component.type}`, e.target.value)}
                        className="text-sm"
                      />
                    )}
                    {["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") && (
                      <>
                        <input
                          type="file"
                          accept={
                            component.format === "IMAGE"
                              ? "image/*"
                              : component.format === "VIDEO"
                              ? "video/*"
                              : "*/*"
                          }
                          onChange={(e) => handleFileUpload(e, `header-${component.type}`)}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-blue-500 hover:bg-blue-400 text-white justify-start text-sm"
                          onClick={() => handleUploadClick(`header-${component.type}`)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload {component.format?.toLowerCase()}
                        </Button>
                      </>
                    )}
                  </>
                )}
                {component.type === "BODY" && (
                  <>
                    <p className="text-xs text-muted-foreground">Enter the parameters for your message.</p>
                    {selectedTemplate.parameter_format === "POSITIONAL" &&
                      component.example?.body_text?.[0]?.map((param, paramIndex) => (
                        <Input
                          key={`body-${paramIndex}`}
                          placeholder={`Enter value for {{${paramIndex + 1}}}`}
                          value={formData[`body-${paramIndex}`] || ""}
                          onChange={(e) => handleInputChange(`body-${paramIndex}`, e.target.value)}
                          className="text-sm mt-2"
                        />
                      ))}
                    {selectedTemplate.parameter_format === "NAMED" &&
                      component.example?.body_text_named_params?.map((param, paramIndex) => (
                        <Input
                          key={`body-${param.param_name}`}
                          placeholder={`Enter value for {{${param.param_name}}}`}
                          value={formData[`body-${param.param_name}`] || ""}
                          onChange={(e) => handleInputChange(`body-${param.param_name}`, e.target.value)}
                          className="text-sm mt-2"
                        />
                      ))}
                  </>
                )}
                {component.type === "BUTTONS" &&
                  component.buttons?.map((button, buttonIndex) => (
                    <div key={`button-${buttonIndex}`} className="space-y-2">
                      <h4 className="text-xs font-medium">{button.type} Button</h4>
                      <Input
                        placeholder={`Enter ${button.type.toLowerCase()} for button`}
                        value={formData[`button-${buttonIndex}`] || ""}
                        onChange={(e) => handleInputChange(`button-${buttonIndex}`, e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </CardContent>
        </Card>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white w-full">
          Send Message
        </Button>
      </form>
      <div>
        <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">Preview</h2>
        {renderPreview()}
      </div>
    </div>
  )
}

export default SelectedTemplateForm
