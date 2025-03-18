FROM node:20-alpine

WORKDIR /app

COPY . ./

RUN npm install

RUN npm install -g ts-node

ENTRYPOINT ["ts-node", "src/index.ts"]

# Default longitude and latitude to run the app (this can be overridden)
CMD ["31.9544", "35.9106"]