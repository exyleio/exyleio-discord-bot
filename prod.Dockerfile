# Build Discord Bot
FROM node:hydrogen-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Run Discord Bot
FROM node:hydrogen-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# this will make "npm install" omit devDependencies
ENV NODE_ENV production
RUN npm install
COPY --from=builder /app/build/ ./build/
CMD ["node", "build/index.js"]
