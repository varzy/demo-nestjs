FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn --registry=https://registry.npm.taobao.org
COPY . .
RUN yarn build
RUN npx prisma generate

FROM node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
ENV DATABASE_URL=
CMD npx prisma migrate dev && node dist/main
