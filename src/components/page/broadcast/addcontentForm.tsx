/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

function AddContentForm({selectedContact,selectedTemplate,formData,setFormData}:{selectedContact:any,selectedTemplate:any,formData:any,setFormData:(data:any)=>void}) {
    
  const hasEditableParts = () => {
    if (!selectedTemplate) return false

    const hasEditableHeader = selectedTemplate.components.some(
      (component:any) =>
        component.type === "HEADER" &&
        ((component.format === "TEXT" &&
          ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.header_text) ||
            (selectedTemplate.parameter_format === "NAMED" && component.example?.header_text_named_params))) ||
          ["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || ""))
    )

    const hasEditableBody = selectedTemplate.components.some(
      (component:any) =>
        component.type === "BODY" &&
        ((selectedTemplate.parameter_format === "POSITIONAL" && component.example?.body_text?.length) ||
          (selectedTemplate.parameter_format === "NAMED" && component.example?.body_text_named_params?.length))
    )

    const hasEditableButtons = selectedTemplate.components.some(
      (component:any) =>
        component.type === "BUTTONS" &&
        component.buttons?.some((button:any) => button.type === "URL" || button.type === "COPY_CODE")
    )

    return hasEditableHeader || hasEditableBody || hasEditableButtons
  }
  


    if(!selectedTemplate || !selectedContact){
        return (
            <div>
                You need to select a template and contacts to acess this
            </div>
        )
    }
  return (
    <></>
  )
}

export default AddContentForm