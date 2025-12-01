import { motion } from 'framer-motion'

export default function HistorySection({ history, onSelect, onDelete }) {
  if (!history || history.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 pt-10 border-t border-silver-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-silver-800">历史记录</h3>
        <span className="text-sm text-silver-500">保留最近 {history.length} 条</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-apple hover:shadow-apple-hover transition-shadow bg-white border border-silver-100"
            onClick={() => onSelect(item)}
          >
            <img 
              src={item.image} 
              alt={item.styleName} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* 遮罩层 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {/* 底部标签 */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="font-medium truncate">{item.styleName}</p>
              <p className="text-white/80 text-[10px]">{new Date(item.timestamp).toLocaleDateString()}</p>
            </div>

            {/* 删除按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id)
              }}
              className="absolute top-1 right-1 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-red-500"
              title="删除"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

