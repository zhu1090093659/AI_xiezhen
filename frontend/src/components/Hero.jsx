import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-silver-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-silver-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-silver-100 text-silver-600 
                         rounded-full text-sm font-medium mb-6 border border-silver-200">
            ✨ AI 驱动 · 一键生成
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-silver-800 tracking-tight 
                       leading-tight mb-6">
            让 AI 为你创造
            <br />
            <span className="bg-gradient-to-r from-silver-600 to-silver-800 
                           bg-clip-text text-transparent">
              专属写真
            </span>
          </h1>
          
          <p className="text-xl text-silver-500 max-w-2xl mx-auto leading-relaxed mb-10">
            上传一张照片，选择你喜欢的风格，
            <br className="hidden md:block" />
            AI 将在几秒内为你生成精美的艺术写真
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#upload"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg"
            >
              立即体验
            </motion.a>
            <motion.a
              href="#styles"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-lg"
            >
              查看风格
            </motion.a>
          </div>
        </motion.div>

        {/* 特性标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16"
        >
          {[
            { icon: '⚡', text: '秒级生成' },
            { icon: '🎨', text: '多种风格' },
            { icon: '🔒', text: '隐私保护' },
            { icon: '💎', text: '高清画质' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-silver-500">
              <span>{item.icon}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

