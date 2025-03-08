"use client"

import type React from "react"

import { useState } from "react"

interface ImageUploadProps {
  onImageSelected: (file: File | null) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File size exceeds 3MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageSelected(file)
    } else {
      setSelectedImage(null)
      onImageSelected(null)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} id="image-upload" style={{ display: "none" }} />
      <label htmlFor="image-upload">
        {selectedImage ? (
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Uploaded"
            style={{ width: "110px", height: "110px", objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <img
            src={"https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person-300x300.png"}
            alt="Uploaded"
            style={{ width: "110px", height: "110px", objectFit: "cover", borderRadius: "50%" }}
          />
        )}
      </label>
    </div>
  )
}

export default ImageUpload

