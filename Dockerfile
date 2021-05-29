FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS builder
ARG COOKIE_SECRET_CURRENT
ARG COOKIE_SECRET_PREVIOUS
ARG NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY
ARG NEXT_PUBLIC_FIREBASE_APP_NAME
ARG NEXT_PUBLIC_API_HOST

ENV COOKIE_SECRET_CURRENT=$COOKIE_SECRET_CURRENT
ENV COOKIE_SECRET_PREVIOUS=$COOKIE_SECRET_PREVIOUS
ENV NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=$NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY
ENV NEXT_PUBLIC_FIREBASE_APP_NAME=$NEXT_PUBLIC_FIREBASE_APP_NAME
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]