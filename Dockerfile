FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install --production --no-audit --silent || npm install --no-audit --silent
RUN npm install -g nodemon
# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "serve"]
