import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SettingsModal, { getStoredSettings } from './SettingsModal'

export default function Header() {
  const [showSettings, setShowSettings] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hasApiKey = !!getStoredSettings().apiKey

  const navLinks = [
    { href: '#', label: '功能介绍' },
    { href: '#styles', label: '风格展示' },
    { href: '#', label: '关于我们' },
  ]

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-silver-100
                   safe-area-inset-top"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} 
                 className="text-sm text-silver-600 hover:text-silver-800 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setShowSettings(true)}
              className="relative p-2.5 hover:bg-silver-100 rounded-lg transition-colors group
                       touch-manipulation"
              title="API 设置"
            >
              <svg className="w-5 h-5 text-silver-600 group-hover:text-silver-800" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {!hasApiKey && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full 
                               animate-pulse" />
              )}
            </button>
            
            <a href="#upload" className="hidden sm:block px-4 py-2 bg-silver-800 text-white text-sm rounded-full 
                             hover:bg-silver-700 transition-colors touch-manipulation">
              开始使用
            </a>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-silver-100 rounded-lg transition-colors
                       touch-manipulation"
              aria-label="菜单"
            >
              <svg className="w-5 h-5 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-silver-100 bg-white/95 backdrop-blur-xl overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-silver-600 hover:text-silver-800 
                             hover:bg-silver-50 rounded-xl transition-colors text-base
                             touch-manipulation"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <a 
                    href="#upload"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-silver-800 text-white text-center 
                             rounded-xl hover:bg-silver-700 transition-colors touch-manipulation"
                  >
                    开始使用
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}

