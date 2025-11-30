import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function UploadSection({ onImageUpload, uploadedImage }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      onImageUpload(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div id="upload" className="max-w-2xl mx-auto">
      <motion.div
        whileHover={{ scale: uploadedImage ? 1 : 1.01 }}
        whileTap={{ scale: uploadedImage ? 1 : 0.98 }}
        onClick={uploadedImage ? undefined : handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300
          touch-manipulation
          ${uploadedImage 
            ? 'bg-white shadow-apple-lg' 
            : `card-apple cursor-pointer border-2 border-dashed 
               ${isDragging ? 'border-silver-400 bg-silver-50' : 'border-silver-200'}`
          }
        `}
      >
        {uploadedImage ? (
          <div className="relative">
            <img 
              src={uploadedImage} 
              alt="已上传的照片" 
              className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                          opacity-0 sm:hover:opacity-100 transition-opacity" />
            <button
              onClick={handleRemove}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 
                       bg-white/90 backdrop-blur rounded-full flex items-center justify-center 
                       shadow-apple active:bg-white transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 sm:px-4 py-1.5 sm:py-2 
                          bg-white/90 backdrop-blur rounded-full text-xs sm:text-sm text-silver-600 shadow-apple">
              ✓ 照片已上传
            </div>
          </div>
        ) : (
          <div className="py-12 sm:py-20 px-6 sm:px-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl 
                          bg-silver-100 flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-silver-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-silver-800 mb-2">
              {isDragging ? '松开以上传' : '点击上传照片'}
            </h3>
            <p className="text-silver-500 mb-4 sm:mb-6 text-sm sm:text-base">
              <span className="hidden sm:inline">或拖放文件到这里</span>
              <span className="sm:hidden">支持从相册选择</span>
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-silver-400">
              <span>支持 JPG、PNG</span>
              <span>·</span>
              <span>最大 10MB</span>
            </div>
          </div>
        )}
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

