FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9999

# Define the command to run the app
CMD ["node", "./src/bin/www"]
    