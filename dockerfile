FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json  to the working directory
COPY package*.json .

#Run npm install
RUN npm install

#Copy everything build to root directory
COPY . .

EXPOSE 5173

#Run application
CMD ["npm", "run", "dev"]
