FROM node:16-alpine as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn

FROM node:lts as builder
WORKDIR /my-project
ARG NEXT_PUBLIC_API_HOST
RUN echo $NEXT_PUBLIC_API_HOST

COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /my-project


# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]