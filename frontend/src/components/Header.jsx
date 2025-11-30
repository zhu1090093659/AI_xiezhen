import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-silver-100"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-silver-700 to-silver-900 
                        flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-semibold text-silver-800 text-lg tracking-tight">
            AI 写真
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-silver-600 hover:text-silver-800 transition-colors">
            功能介绍
          </a>
          <a href="#" className="text-sm text-silver-600 hover:text-silver-800 transition-colors">
            风格展示
          </a>
          <a href="#" className="text-sm text-silver-600 hover:text-silver-800 transition-colors">
            关于我们
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm text-silver-600 hover:text-silver-800 transition-colors">
            登录
          </button>
          <button className="px-4 py-2 bg-silver-800 text-white text-sm rounded-full 
                           hover:bg-silver-700 transition-colors">
            开始使用
          </button>
        </div>
      </div>
    </motion.header>
  )
}

