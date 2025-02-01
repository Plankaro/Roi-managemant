import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface TemplateProps {
  SelectedTemplate?: {
    components?: any[] // Adjust type based on the actual data structure
    name?: string
  }
}

const SelectedTemplateForm: React.FC<TemplateProps> = ({ SelectedTemplate }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    setFormData({})
  },[SelectedTemplate])
  if (!SelectedTemplate) {
    return <div>No template selected</div>
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }
  console.log(formData)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically upload the file to your server or a cloud storage service
      // and get back a URL. For this example, we'll just use a placeholder URL.
      const uploadedUrl = "https://example.com/uploaded-file-url"
      handleInputChange(type, uploadedUrl)
    }
  }

  const handleUploadClick = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.setAttribute("data-upload-type", type)
    }
  }

  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 bg-background top-0 pt-2">Add Content for {SelectedTemplate.name}</h2>
      {SelectedTemplate?.components?.map((component, index) => (
        <div key={`${component.type}-${index}`} className="space-y-2">
          <h3 className="text-sm font-medium">{component.type}</h3>
          {component.type === "HEADER" && (
            <>
              {component.format === "TEXT" && (
                <Input
                  placeholder="Enter header text"
                  value={formData[`header-${index}`] || ""}
                  onChange={(e) => handleInputChange(`header-${index}`, e.target.value)}
                  className="text-sm"
                />
              )}
              {["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format) && (
                <>
                  <input
                    type="file"
                    accept={component.format === "IMAGE" ? "image/*" : component.format === "VIDEO" ? "video/*" : "*/*"}
                    onChange={(e) => handleFileUpload(e, `header-${index}`)}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    variant="secondary"
                    className="bg-blue-500 hover:bg-blue-400 text-white justify-start text-sm"
                    onClick={() => handleUploadClick(`header-${index}`)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {component.format.toLowerCase()}
                  </Button>
                </>
              )}
              {!["TEXT", "IMAGE", "VIDEO", "DOCUMENT"].includes(component.format) && (
                <p className="text-xs text-muted-foreground">Header type not supported</p>
              )}
            </>
          )}
          {component.type === "BODY" && (
            <>
              <p className="text-xs text-muted-foreground">Enter the parameters for your message.</p>
              {component.example?.body_text?.[0]?.map((param: string, paramIndex: number) => (
                <Input
                  key={`body-${index}-${paramIndex}`}
                  placeholder={`Enter value for {{${paramIndex + 1}}}`}
                  value={formData[`body-${index}-${paramIndex}`] || ""}
                  onChange={(e) => handleInputChange(`body-${index}-${paramIndex}`, e.target.value)}
                  className="text-sm mt-2"
                />
              ))}
            </>
          )}
          {component.type === "FOOTER" && (
            <Input
              placeholder="Enter footer text"
              value={formData[`footer-${index}`] || ""}
              onChange={(e) => handleInputChange(`footer-${index}`, e.target.value)}
              className="text-sm"
            />
          )}
          {component.type === "BUTTONS" &&
            component.buttons?.map((button: any, buttonIndex: number) => (
              <div key={`button-${index}-${buttonIndex}`} className="space-y-2">
                <h4 className="text-xs font-medium">{button.type} Button</h4>
                <Input
                  placeholder={`Enter ${button.type.toLowerCase()} for button`}
                  value={formData[`button-${index}-${buttonIndex}`] || ""}
                  onChange={(e) => handleInputChange(`button-${index}-${buttonIndex}`, e.target.value)}
                  className="text-sm"
                />
              </div>
            ))}
        </div>
      ))}
    </form>
  )
}

export default SelectedTemplateForm

