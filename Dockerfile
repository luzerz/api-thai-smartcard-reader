FROM node:15.4.0-buster-slim
RUN apt-get update
RUN apt-get install make gcc g++ libpcsclite1 libpcsclite-dev pcscd -y
WORKDIR /app
COPY ./package.json package.json
COPY ./app .
RUN  npm install
EXPOSE 3000
CMD ["node", "app.js"]