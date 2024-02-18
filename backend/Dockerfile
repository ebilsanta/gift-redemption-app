FROM --platform=linux/amd64 node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM --platform=linux/amd64 node:slim
RUN apt-get update -y && apt-get install -y openssl

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./src/prisma ./src/prisma/ 

RUN npm ci --omit=dev
RUN npx prisma generate

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/gift-redemption-backend/main.js" ]