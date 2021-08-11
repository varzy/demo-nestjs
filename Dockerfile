FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn --registry https://registry.npm.taobao.org
COPY . .
RUN yarn build
RUN npx prisma generate
RUN yarn --production --registry https://registry.npm.taobao.org

FROM node:alpine
ENV DATABASE_URL=""
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD npx prisma migrate deploy && node dist/main
