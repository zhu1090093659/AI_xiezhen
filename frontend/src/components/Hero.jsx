import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      {/* Background decorations - scaled down on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 
                      bg-silver-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 
                      bg-silver-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-silver-100 text-silver-600 
                         rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-silver-200">
            ✨ AI 驱动 · 一键生成
          </span>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-silver-800 tracking-tight 
                       leading-tight mb-4 sm:mb-6">
            让 AI 为你创造
            <br />
            <span className="bg-gradient-to-r from-silver-600 to-silver-800 
                           bg-clip-text text-transparent">
              专属写真
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-silver-500 max-w-2xl mx-auto 
                      leading-relaxed mb-8 sm:mb-10 px-2">
            上传一张照片，选择你喜欢的风格，
            <br className="hidden sm:block" />
            AI 将在几秒内为你生成精美的艺术写真
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.a
              href="#upload"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base sm:text-lg w-full sm:w-auto touch-manipulation"
            >
              立即体验
            </motion.a>
            <motion.a
              href="#styles"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-base sm:text-lg w-full sm:w-auto touch-manipulation"
            >
              查看风格
            </motion.a>
          </div>
        </motion.div>

        {/* Feature tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center 
                   gap-4 sm:gap-6 mt-10 sm:mt-16"
        >
          {[
            { icon: '⚡', text: '秒级生成' },
            { icon: '🎨', text: '多种风格' },
            { icon: '🔒', text: '隐私保护' },
            { icon: '💎', text: '高清画质' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-silver-500">
              <span className="text-lg sm:text-base">{item.icon}</span>
              <span className="text-xs sm:text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

