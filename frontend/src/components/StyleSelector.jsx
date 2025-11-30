import { motion } from 'framer-motion'

const STYLES = [
  {
    id: 'professional',
    name: '商务精英',
    description: '专业沉稳的商务形象',
    prompt: 'Professional business portrait, elegant suit, confident pose, studio lighting, high-end corporate style',
    gradient: 'from-slate-400 to-slate-600',
    icon: '👔'
  },
  {
    id: 'artistic',
    name: '艺术人像',
    description: '充满艺术气息的创意写真',
    prompt: 'Artistic portrait photography, dramatic lighting, fine art style, museum quality, cinematic mood',
    gradient: 'from-amber-400 to-orange-500',
    icon: '🎨'
  },
  {
    id: 'vintage',
    name: '复古胶片',
    description: '怀旧风格的胶片质感',
    prompt: 'Vintage film photography style, warm tones, grain texture, 1970s aesthetic, nostalgic atmosphere',
    gradient: 'from-amber-600 to-yellow-700',
    icon: '📷'
  },
  {
    id: 'futuristic',
    name: '未来科技',
    description: '赛博朋克风格的科技感',
    prompt: 'Futuristic cyberpunk portrait, neon lights, holographic effects, sci-fi aesthetic, high-tech atmosphere',
    gradient: 'from-cyan-400 to-blue-600',
    icon: '🚀'
  },
  {
    id: 'natural',
    name: '自然清新',
    description: '户外自然光线的清新感',
    prompt: 'Natural outdoor portrait, soft golden hour lighting, fresh and clean look, botanical background',
    gradient: 'from-green-400 to-emerald-500',
    icon: '🌿'
  },
  {
    id: 'glamour',
    name: '时尚魅力',
    description: '杂志封面级的时尚大片',
    prompt: 'High fashion glamour portrait, magazine cover quality, dramatic makeup, runway style, editorial lighting',
    gradient: 'from-pink-400 to-rose-500',
    icon: '✨'
  },
  {
    id: 'minimalist',
    name: '极简主义',
    description: '简约纯净的高级感',
    prompt: 'Minimalist portrait, clean white background, simple composition, elegant and refined, premium quality',
    gradient: 'from-gray-300 to-gray-500',
    icon: '◻️'
  },
  {
    id: 'cinematic',
    name: '电影质感',
    description: '大片般的电影氛围',
    prompt: 'Cinematic portrait, movie-like color grading, dramatic composition, theatrical lighting, film noir influence',
    gradient: 'from-indigo-500 to-purple-600',
    icon: '🎬'
  }
]

export default function StyleSelector({ selectedStyle, onStyleSelect }) {
  return (
    <div id="styles" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {STYLES.map((style, index) => (
        <motion.button
          key={style.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onStyleSelect(style)}
          className={`
            relative overflow-hidden p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left 
            transition-all duration-300 touch-manipulation
            ${selectedStyle?.id === style.id 
              ? 'bg-silver-800 text-white shadow-apple-lg ring-2 ring-silver-800 ring-offset-2' 
              : 'bg-white text-silver-800 shadow-apple active:shadow-apple-hover'
            }
          `}
        >
          {/* Background decoration */}
          <div className={`
            absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 rounded-full blur-2xl opacity-20
            bg-gradient-to-br ${style.gradient}
            ${selectedStyle?.id === style.id ? 'opacity-30' : ''}
          `} />

          <div className="relative">
            <span className="text-xl sm:text-2xl mb-2 sm:mb-3 block">{style.icon}</span>
            <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">{style.name}</h3>
            <p className={`text-xs sm:text-sm line-clamp-2 ${selectedStyle?.id === style.id ? 'text-silver-300' : 'text-silver-500'}`}>
              {style.description}
            </p>
          </div>

          {/* Selection indicator */}
          {selectedStyle?.id === style.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 w-5 sm:w-6 h-5 sm:h-6 
                       bg-white rounded-full flex items-center justify-center"
            >
              <svg className="w-3 sm:w-4 h-3 sm:h-4 text-silver-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  )
}

