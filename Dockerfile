FROM node:hydrogen-alpine
RUN npm config set cache /tmp --global
VOLUME /app
WORKDIR /app
CMD ["npx", "nodemon"]
