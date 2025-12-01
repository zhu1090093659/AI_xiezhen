# AI 写真 - 智能风格写真生成

基于 AI 的写真照片生成应用，上传您的照片，选择风格，即可生成精美的艺术写真。

## 技术栈

- **前端**: React + Vite + TailwindCSS + Framer Motion
- **后端**: Python (Vercel Serverless Functions)
- **AI 模型**: nano-banana-2-4k

## 本地开发

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 后端测试

```bash
cd api
pip install -r requirements.txt
```

## 部署到 Vercel

1. Fork 或克隆此仓库
2. 在 Vercel 导入项目
3. 配置环境变量:
   - `GOOGLE_API_KEY`: API 密钥
   - `API_BASE_URL`: API 基础 URL (默认 https://one-api.bltcy.top/v1)
4. 部署

## 功能特性

- 🖼️ 拖拽/点击上传照片
- 🎨 8种精选写真风格
- ⚡ AI 秒级生成
- 📥 一键下载生成结果
- 📱 响应式设计，支持移动端

## 可用风格

| 风格 | 描述 |
|------|------|
| 商务精英 | 专业沉稳的商务形象 |
| 艺术人像 | 充满艺术气息的创意写真 |
| 复古胶片 | 怀旧风格的胶片质感 |
| 未来科技 | 赛博朋克风格的科技感 |
| 自然清新 | 户外自然光线的清新感 |
| 时尚魅力 | 杂志封面级的时尚大片 |
| 极简主义 | 简约纯净的高级感 |
| 电影质感 | 大片般的电影氛围 |

## 许可证

MIT License

