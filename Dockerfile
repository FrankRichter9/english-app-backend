FROM --platform=linux/amd64 node:19

WORKDIR /app

COPY . .

RUN npm ci

CMD ["npx", "ts-node", "index.ts"]