import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import UploadSection from './components/UploadSection'
import StyleSelector from './components/StyleSelector'
import ResultSection from './components/ResultSection'
import HistorySection from './components/HistorySection'
import Footer from './components/Footer'
import { getStoredSettings } from './components/SettingsModal'

const HISTORY_KEY = 'ai_portrait_history'
const MAX_HISTORY = 12
const MODEL_NAME = 'nano-banana-2-4k'

// Core identity preservation prompt
const IDENTITY_PRESERVATION_PROMPT = `CRITICAL REQUIREMENTS - MUST FOLLOW:
1. PRESERVE the EXACT same person's face, facial structure, eyes, nose, mouth, skin tone, and all facial features
2. The person in the output image MUST be the SAME person as in the input image - NOT a different person
3. DO NOT alter, modify, or replace the face with another person's face
4. DO NOT change bone structure, face shape, eye shape, or any identifying facial characteristics
5. Only modify lighting, background, clothing, atmosphere, and artistic style
6. The output must pass as a photo of the SAME individual, just in a different style/setting`

// Extract image URL from API response
function extractImageUrl(content) {
  if (!content) return null
  
  // Handle base64 image
  if (content.startsWith('data:image')) {
    return content
  }
  
  // Handle Markdown image syntax: ![alt](url)
  const markdownMatch = content.match(/!\[.*?\]\((.*?)\)/)
  if (markdownMatch) {
    return markdownMatch[1]
  }
  
  // Handle raw URL
  const urlMatch = content.match(/https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|webp|gif)/i)
  if (urlMatch) {
    return urlMatch[0]
  }
  
  return null
}

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load history', e)
    }
  }, [])

  // Save history helper
  const saveToHistory = (newItem) => {
    const newHistory = [newItem, ...history].slice(0, MAX_HISTORY)
    setHistory(newHistory)
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
    } catch (e) {
      console.error('Storage full or error', e)
      // If full, try removing last item and retry
      if (newHistory.length > 1) {
        const retryHistory = newHistory.slice(0, -1)
        setHistory(retryHistory)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(retryHistory))
      }
    }
  }

  const handleDeleteHistory = (id) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
  }

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
    setGeneratedImage(null)
    setError(null)
  }

  const handleStyleSelect = (style) => {
    if (!uploadedImage) {
      setError('请先上传照片')
      document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setSelectedStyle(style)
    setError(null) // 清除之前的错误
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
      const stylePrompt = selectedStyle.prompt || `Apply ${selectedStyle.name} portrait style`
      const prompt = `${IDENTITY_PRESERVATION_PROMPT}

STYLE TO APPLY: ${stylePrompt}

Generate a high-quality portrait photo. You MUST keep the EXACT SAME PERSON with identical facial features, face shape, and identity. Only change the style, lighting, background, and atmosphere - NEVER change who the person is.`

      const response = await fetch(`${settings.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: uploadedImage } }
              ]
            }
          ]
        })
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error.message || '生成失败，请重试')
        return
      }

      // Extract image from response
      const content = data.choices?.[0]?.message?.content
      const imageUrl = extractImageUrl(content)

      if (imageUrl) {
        setGeneratedImage(imageUrl)
        saveToHistory({
          id: Date.now().toString(),
          image: imageUrl,
          styleId: selectedStyle.id,
          styleName: selectedStyle.name,
          timestamp: Date.now()
        })
      } else {
        setError('模型未返回图片，请重试')
      }
    } catch (err) {
      setError(`请求失败: ${err.message}`)
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

  const handleHistorySelect = (item) => {
    setGeneratedImage(item.image)
    // Find original style object if possible, or recreate a minimal one
    const style = { id: item.styleId, name: item.styleName } 
    setSelectedStyle(style)
    // Note: We don't have the original uploaded image for history items usually, 
    // unless we stored it too. For now, we just show the result.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10 sm:space-y-16"
          >
            {/* Step 1: Upload photo */}
            <div id="upload" className="space-y-4 sm:space-y-6 scroll-mt-24">
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 bg-silver-100 text-silver-600 
                               rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  步骤 1
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-silver-900 tracking-tight">
                  上传您的照片
                </h2>
                <p className="text-silver-500 mt-2 text-sm sm:text-base">
                  选择一张清晰的正面照片，获得最佳效果
                </p>
              </div>
              <UploadSection 
                onImageUpload={handleImageUpload} 
                uploadedImage={uploadedImage}
              />
            </div>

            {/* Step 2: Select style */}
            <div id="styles" className="space-y-4 sm:space-y-6 scroll-mt-24">
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 bg-silver-100 text-silver-600 
                               rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  步骤 2
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-silver-900 tracking-tight">
                  选择写真风格
                </h2>
                <p className="text-silver-500 mt-2 text-sm sm:text-base">
                  挑选您喜欢的风格，AI 将为您量身定制
                </p>
              </div>
              <StyleSelector 
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
              />
            </div>

            {/* Generate button */}
            <AnimatePresence>
              {uploadedImage && selectedStyle && !generatedImage && (
                <motion.div
                  id="generate-section"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center px-4 scroll-mt-32"
                >
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-3.5 sm:py-4 
                             disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto
                             shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-3">
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
                    <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 py-2 px-4 rounded-lg inline-block">
                      {error}
                    </p>
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

            {/* 历史记录 */}
            <HistorySection 
              history={history} 
              onSelect={handleHistorySelect}
              onDelete={handleDeleteHistory}
            />

          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Floating action button - scroll to generate */}
      <AnimatePresence>
        {uploadedImage && selectedStyle && !generatedImage && !isGenerating && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('generate-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 
                       bg-silver-800 text-white rounded-full shadow-lg shadow-silver-400/30
                       hover:bg-silver-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium text-sm">开始生成</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
