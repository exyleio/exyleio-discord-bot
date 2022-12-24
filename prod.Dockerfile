FROM node:hydrogen-alpine
WORKDIR /app
RUN npm config set cache /tmp --global
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT ["node", "."]
