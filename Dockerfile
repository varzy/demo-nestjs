FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build
RUN npx prisma generate
RUN yarn --production

FROM node:alpine
ENV DATABASE_URL=""
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD npx prisma migrate deploy && node dist/main
