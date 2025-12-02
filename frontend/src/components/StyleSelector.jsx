import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CUSTOM_STYLES_KEY = 'ai_portrait_custom_styles'

const BUILTIN_STYLES = [
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

// Convert uploaded JSON format to internal format
function convertToInternalFormat(item, index) {
  return {
    id: `custom_${Date.now()}_${index}`,
    name: item.title || '未命名风格',
    description: item.category ? `${item.category}${item.sub_category ? ' / ' + item.sub_category : ''}` : '自定义风格',
    prompt: item.prompt || '',
    preview: item.preview || null,
    author: item.author || null,
    link: item.link || null,
    mode: item.mode || 'generate',
    gradient: 'from-violet-400 to-purple-600',
    icon: '🎯',
    isCustom: true
  }
}

// Load custom styles from localStorage
function loadCustomStyles() {
  try {
    const saved = localStorage.getItem(CUSTOM_STYLES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    console.error('Failed to load custom styles', e)
    return []
  }
}

// Save custom styles to localStorage
function saveCustomStyles(styles) {
  try {
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(styles))
    return true
  } catch (e) {
    console.error('Failed to save custom styles', e)
    return false
  }
}

export default function StyleSelector({ selectedStyle, onStyleSelect }) {
  const [customStyles, setCustomStyles] = useState([])
  const [importError, setImportError] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setCustomStyles(loadCustomStyles())
  }, [])

  const allStyles = [...BUILTIN_STYLES, ...customStyles]

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.json')) {
      setImportError('请上传 JSON 格式的文件')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        
        if (!Array.isArray(data)) {
          setImportError('JSON 文件必须是数组格式')
          return
        }

        const validItems = data.filter(item => item.title && item.prompt)
        if (validItems.length === 0) {
          setImportError('未找到有效的风格配置（需要 title 和 prompt 字段）')
          return
        }

        const newStyles = validItems.map((item, idx) => convertToInternalFormat(item, idx))
        const merged = [...customStyles, ...newStyles]
        
        if (saveCustomStyles(merged)) {
          setCustomStyles(merged)
          setImportError(null)
        } else {
          setImportError('保存失败，可能存储空间不足')
        }
      } catch (err) {
        setImportError('JSON 解析失败，请检查文件格式')
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  const handleDeleteCustomStyle = (styleId, e) => {
    e.stopPropagation()
    const filtered = customStyles.filter(s => s.id !== styleId)
    if (saveCustomStyles(filtered)) {
      setCustomStyles(filtered)
      if (selectedStyle?.id === styleId) {
        onStyleSelect(null)
      }
    }
  }

  const handleClearAllCustom = () => {
    if (saveCustomStyles([])) {
      setCustomStyles([])
      if (selectedStyle?.isCustom) {
        onStyleSelect(null)
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Import controls */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-silver-200 
                     rounded-xl text-sm font-medium text-silver-700 hover:bg-silver-50 
                     hover:border-silver-300 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          导入自定义风格
        </button>
        
        {customStyles.length > 0 && (
          <button
            onClick={handleClearAllCustom}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-200 
                       rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 
                       hover:border-red-300 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            清空自定义 ({customStyles.length})
          </button>
        )}

        <AnimatePresence>
          {importError && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-lg"
            >
              {importError}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Styles grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allStyles.map((style, index) => {
          const isSelected = selectedStyle?.id === style.id
          const isCustom = style.isCustom
          
          return (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStyleSelect(style)}
              className={`
                relative overflow-hidden rounded-2xl text-left cursor-pointer
                transition-all duration-300 select-none group
                ${isCustom ? 'ring-2 ring-violet-200' : ''}
                ${isSelected 
                  ? 'bg-silver-800 text-white shadow-apple-lg ring-4 ring-silver-200 scale-[1.02]' 
                  : 'bg-white text-silver-800 shadow-apple hover:shadow-apple-hover border border-silver-100 hover:border-silver-200'
                }
              `}
            >
              {/* Preview image for custom styles */}
              {isCustom && style.preview && (
                <div className="relative h-24 overflow-hidden">
                  <img 
                    src={style.preview} 
                    alt={style.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className={`p-4 sm:p-5 ${isCustom && style.preview ? 'pt-3' : ''}`}>
                {/* Background decoration */}
                <div className={`
                  absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none
                  bg-gradient-to-br ${style.gradient}
                  ${isSelected ? 'opacity-40' : 'group-hover:opacity-30'}
                  transition-opacity duration-300
                `} />

                <div className="relative z-10 pointer-events-none">
                  {!style.preview && (
                    <span className="text-3xl mb-3 block drop-shadow-sm">{style.icon}</span>
                  )}
                  <h3 className="font-bold text-base sm:text-lg mb-1 tracking-tight">{style.name}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-silver-300' : 'text-silver-500'}`}>
                    {style.description}
                  </p>
                  {isCustom && style.author && (
                    <p className={`text-xs mt-1 ${isSelected ? 'text-silver-400' : 'text-silver-400'}`}>
                      by {style.author}
                    </p>
                  )}
                </div>
              </div>

              {/* Delete button for custom styles */}
              {isCustom && (
                <button
                  onClick={(e) => handleDeleteCustomStyle(style.id, e)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-red-500 
                             rounded-full flex items-center justify-center opacity-0 
                             group-hover:opacity-100 transition-all z-20"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute ${isCustom ? 'bottom-3 right-3' : 'top-3 right-3'} w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm`}
                >
                  <svg className="w-4 h-4 text-silver-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Custom badge */}
              {isCustom && !style.preview && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-violet-500 text-white text-xs rounded-full">
                  自定义
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
