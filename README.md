# AI 写真 - 智能风格写真生成

基于 AI 的写真照片生成应用，上传您的照片，选择风格，即可生成精美的艺术写真。

## 技术栈

- **前端**: React + Vite + TailwindCSS + Framer Motion
- **AI 模型**: nano-banana-2-4k (OpenAI 兼容接口)

## 本地开发

```bash
cd frontend
npm install
npm run dev
```

## 部署到 Vercel

1. Fork 或克隆此仓库
2. 在 Vercel 导入项目
3. 部署（无需配置环境变量，API Key 由用户在前端配置）

## 功能特性

- 🖼️ 拖拽/点击上传照片
- 🎨 8种内置写真风格
- 📤 支持导入自定义风格（JSON 格式）
- ⚡ AI 秒级生成
- 📥 一键下载生成结果
- 📱 响应式设计，支持移动端
- 🔒 API Key 本地存储，安全私密

## 内置风格

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

## 自定义风格导入

支持导入 JSON 格式的自定义风格文件，格式示例：

```json
[
  {
    "title": "渐变玻璃风格 PPT",
    "preview": "https://example.com/preview.jpg",
    "prompt": "你的风格提示词...",
    "author": "@author",
    "link": "https://example.com",
    "mode": "generate",
    "category": "工作",
    "sub_category": "PPT"
  }
]
```

必需字段：`title`、`prompt`

## 使用说明

1. 点击右上角设置按钮，配置 API Key 和 Base URL
2. 上传照片
3. 选择风格（内置或自定义导入）
4. 点击生成

## 许可证

MIT License
