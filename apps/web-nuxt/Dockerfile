FROM node:20-alpine

WORKDIR /app

# 复制构建产物
COPY .output/ ./

# 设置环境变量
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# 限制 Node.js 内存（适合低内存服务器）
ENV NODE_OPTIONS="--max-old-space-size=256"

EXPOSE 3000

CMD ["node", "server/index.mjs"]
