
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

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
  variant? : "light" | "dark"
}

const SelectedPreview: React.FC<TemplateProps> = ({ selectedTemplate,variant="light" }) => {

  const [formData, setFormData] = useState<{
    header: { type: string; value: string; isEditable: boolean }
    body: { parameter_name: string; value: string }[]
    buttons: { type: string; value: string,isEditable: boolean }[]
  }>({
    header: { type: "", value: "", isEditable: false },
    body: [],
    buttons: [],
  })
 

  useEffect(() => {
    if (selectedTemplate) {
      const newFormData = {
        header: { type: "", value: "", isEditable: false },
        body: [] as { parameter_name: string; value: string }[],
        buttons: [] as { type: string; value: string ;isEditable: boolean}[],
      }

      selectedTemplate.components.forEach((component) => {
        if (component.type === "HEADER") {
          newFormData.header.type = component.format || ""
          if (
            ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "") &&
            component.example?.header_handle
          ) {
            newFormData.header.value = component.example.header_handle[0] || ""
            newFormData.header.isEditable = true
          } else if (component.format === "TEXT") {
         
              newFormData.header.value = component.text || ""
              newFormData.header.isEditable = true
           
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
            isEditable: /{{.+?}}/.test(button.type === "URL" ? button.url || "" : button.example?.[0] || "")
          }))
        }
      })

      setFormData(newFormData)
    }
  }, [selectedTemplate])

  if (!selectedTemplate) {
    return <div>No template selected</div>
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
              <div key={`preview-header-${index}`} className="mb-3 flex items-center justify-center">
                {component.format === "IMAGE" &&
                  (isValidUrl(headerContent) ? (
                    <Image
                      src={headerContent || "/placeholder.svg"}
                      alt="Header image"
                      width={300}
                      height={300}
                      className="object-cover object-center rounded-lg "
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
              <h3 key={`preview-header-${index}`} className="font-medium text-lg mb-2 text-center">
                {formData.header.value || component.text}
              </h3>
            )
          }
          break
        case "BODY":
          const bodyText = component.text || ""
         
          return (
            <p key={`preview-body-${index}`} className={`text-sm mb-4 whitespace-pre-line ${variant ==="dark" && "text-white"}`}>
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
                <Button key={`preview-button-${i}`} variant="outline" className={`text-xs w-full ${variant ==="dark" && "text-white bg-blue-500 border-0"}`}>
                  {button.text}
                </Button>
              ))}
            </div>
          )
      }
    })

    return (
      <Card className={`p-4 ${variant ==="dark" && "bg-transparent border-0"}`}>
        <div className="space-y-2">{previewContent}</div>
      </Card>
    )
  }



  return (
    <div className=" gap-6">
      
   
        
          {renderPreview()}
        
    </div>
  )
}

export default SelectedPreview
