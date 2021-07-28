FROM node:alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm i --registry=https://registry.npm.taobao.org
COPY . .
RUN yarn build
RUN npx prisma generate

FROM node:alpine
ENV DATABASE_URL=
WORKDIR /app
COPY package*.json .
RUN npm i --registry=https://registry.npm.taobao.org --production
COPY --from=builder /app .
EXPOSE 3000
CMD npx prisma migrate deploy && node dist/main
