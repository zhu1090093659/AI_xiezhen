import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEYS = {
  apiKey: 'ai_portrait_api_key',
  baseUrl: 'ai_portrait_base_url'
}

const DEFAULT_BASE_URL = 'https://one-api.bltcy.top/v1'

export function getStoredSettings() {
  return {
    apiKey: localStorage.getItem(STORAGE_KEYS.apiKey) || '',
    baseUrl: localStorage.getItem(STORAGE_KEYS.baseUrl) || DEFAULT_BASE_URL
  }
}

export default function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL)
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const settings = getStoredSettings()
      setApiKey(settings.apiKey)
      setBaseUrl(settings.baseUrl)
      setSaved(false)
    }
  }, [isOpen])

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.apiKey, apiKey.trim())
    localStorage.setItem(STORAGE_KEYS.baseUrl, baseUrl.trim() || DEFAULT_BASE_URL)
    setSaved(true)
    setTimeout(() => onClose(), 800)
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEYS.apiKey)
    localStorage.removeItem(STORAGE_KEYS.baseUrl)
    setApiKey('')
    setBaseUrl(DEFAULT_BASE_URL)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          {/* Desktop: center modal, Mobile: bottom sheet */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white 
                       rounded-t-3xl shadow-2xl p-5 pb-safe
                       sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                       sm:max-w-md sm:rounded-2xl sm:p-6"
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden w-10 h-1 bg-silver-300 rounded-full mx-auto mb-4" />
            
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-silver-800">API 设置</h2>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-silver-100 rounded-lg transition-colors touch-manipulation"
              >
                <svg className="w-5 h-5 text-silver-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-silver-700 mb-2">
                  API Key <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-4 py-3.5 sm:py-3 pr-12 border border-silver-200 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-silver-500 focus:border-transparent
                             text-silver-800 placeholder-silver-400 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 
                             hover:bg-silver-100 rounded-lg transition-colors touch-manipulation"
                  >
                    {showKey ? (
                      <svg className="w-5 h-5 text-silver-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-silver-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-silver-500">
                  密钥仅存储在您的浏览器本地，不会上传到服务器
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-silver-700 mb-2">
                  API Base URL
                </label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://one-api.bltcy.top/v1"
                  className="w-full px-4 py-3.5 sm:py-3 border border-silver-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-silver-500 focus:border-transparent
                           text-silver-800 placeholder-silver-400 text-base"
                />
                <p className="mt-1.5 text-xs text-silver-500">
                  默认使用 one-api.bltcy.top/v1，可自定义其他兼容接口
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 mt-6 sm:mt-8">
              <button
                onClick={handleClear}
                className="px-4 py-3 sm:py-2.5 text-sm text-silver-600 hover:text-silver-800
                         hover:bg-silver-100 rounded-xl transition-colors touch-manipulation"
              >
                清除配置
              </button>
              <div className="hidden sm:block flex-1" />
              <div className="flex gap-3 sm:contents">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 text-sm text-silver-600 
                           hover:bg-silver-100 rounded-xl transition-colors touch-manipulation"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 text-sm bg-silver-800 text-white rounded-xl
                           hover:bg-silver-700 transition-colors disabled:opacity-50 
                           disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                >
                  {saved ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      已保存
                    </>
                  ) : (
                    '保存设置'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

