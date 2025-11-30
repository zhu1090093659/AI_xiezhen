import { motion } from 'framer-motion'

export default function ResultSection({ originalImage, generatedImage, styleName, onReset }) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `ai-portrait-${styleName}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 
                   rounded-full text-sm font-medium mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          生成完成
        </motion.div>
        <h2 className="text-3xl font-semibold text-silver-800 tracking-tight">
          您的 {styleName} 写真已生成
        </h2>
        <p className="text-silver-500 mt-2">
          对比原图与生成效果
        </p>
      </div>

      {/* 对比展示 */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-silver-500">
            <span className="w-2 h-2 rounded-full bg-silver-300" />
            <span className="text-sm font-medium">原图</span>
          </div>
          <div className="card-apple overflow-hidden">
            <img 
              src={originalImage} 
              alt="原图" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-silver-600">
            <span className="w-2 h-2 rounded-full bg-silver-800" />
            <span className="text-sm font-medium">AI 写真</span>
          </div>
          <div className="card-apple overflow-hidden ring-2 ring-silver-800 ring-offset-2">
            <img 
              src={generatedImage} 
              alt="AI 生成的写真" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载写真
        </button>
        <button onClick={onReset} className="btn-secondary">
          重新生成
        </button>
      </motion.div>
    </div>
  )
}

