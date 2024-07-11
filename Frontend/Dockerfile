FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
    
