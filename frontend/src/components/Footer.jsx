export default function Footer() {
  return (
    <footer className="border-t border-silver-100 bg-white/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-silver-600">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-silver-700 to-silver-900 
                          flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium">AI 写真</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-silver-500">
            <a href="#" className="hover:text-silver-700 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-silver-700 transition-colors">使用条款</a>
            <a href="#" className="hover:text-silver-700 transition-colors">联系我们</a>
          </div>

          <p className="text-sm text-silver-400">
            © 2024 AI 写真. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}

