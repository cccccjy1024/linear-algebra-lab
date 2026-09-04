# 线性代数 · 交互学习实验室

一个参考“知机｜人工智能交互学习实验室”视觉与交互结构的中文线性代数学习网站。

## 三大板块
- AI 应用：向量相似度与 Embedding、神经网络单层 Wx+b
- 知识：教材第 1、2 章共 8 个小节，含互动实验与随堂自测
- 工科应用：电路网孔电流、交通流网络平衡

## 本地运行
```bash
pnpm install
pnpm dev
```

## 构建与测试
```bash
pnpm test
pnpm build
pnpm preview
```

## 部署
项目已包含 `netlify.toml`，可部署到 Netlify；构建命令 `pnpm build`，发布目录 `dist`，SPA 回退已配置。