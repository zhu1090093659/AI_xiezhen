import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import UploadSection from './components/UploadSection'
import StyleSelector from './components/StyleSelector'
import ResultSection from './components/ResultSection'
import Footer from './components/Footer'
import { getStoredSettings } from './components/SettingsModal'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
    setGeneratedImage(null)
    setError(null)
  }

  const handleStyleSelect = (style) => {
    setSelectedStyle(style)
  }

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) return

    const settings = getStoredSettings()
    if (!settings.apiKey) {
      setError('请先点击右上角设置按钮配置 API Key')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': settings.apiKey,
          'X-Base-URL': settings.baseUrl
        },
        body: JSON.stringify({
          image: uploadedImage,
          style: selectedStyle.id,
          prompt: selectedStyle.prompt
        })
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImage(data.image)
      } else {
        setError(data.message || '生成失败，请重试')
      }
    } catch (err) {
      setError('网络错误，请检查连接后重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    setSelectedStyle(null)
    setGeneratedImage(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* 步骤 1: 上传照片 */}
            <div className="space-y-6">
              <div className="text-center">
                <span className="inline-block px-4 py-1 bg-silver-100 text-silver-600 
                               rounded-full text-sm font-medium mb-4">
                  步骤 1
                </span>
                <h2 className="text-3xl font-semibold text-silver-800 tracking-tight">
                  上传您的照片
                </h2>
                <p className="text-silver-500 mt-2">
                  选择一张清晰的正面照片，获得最佳效果
                </p>
              </div>
              <UploadSection 
                onImageUpload={handleImageUpload} 
                uploadedImage={uploadedImage}
              />
            </div>

            {/* 步骤 2: 选择风格 */}
            <AnimatePresence>
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <span className="inline-block px-4 py-1 bg-silver-100 text-silver-600 
                                   rounded-full text-sm font-medium mb-4">
                      步骤 2
                    </span>
                    <h2 className="text-3xl font-semibold text-silver-800 tracking-tight">
                      选择写真风格
                    </h2>
                    <p className="text-silver-500 mt-2">
                      挑选您喜欢的风格，AI 将为您量身定制
                    </p>
                  </div>
                  <StyleSelector 
                    selectedStyle={selectedStyle}
                    onStyleSelect={handleStyleSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 生成按钮 */}
            <AnimatePresence>
              {uploadedImage && selectedStyle && !generatedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary text-lg px-12 py-4 disabled:opacity-50 
                             disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" 
                                  stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        正在生成...
                      </span>
                    ) : (
                      '开始生成写真'
                    )}
                  </button>
                  {error && (
                    <p className="mt-4 text-red-500 text-sm">{error}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 结果展示 */}
            <AnimatePresence>
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ResultSection 
                    originalImage={uploadedImage}
                    generatedImage={generatedImage}
                    styleName={selectedStyle?.name}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

