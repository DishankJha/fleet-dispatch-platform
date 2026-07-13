FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema BEFORE npm install
COPY prisma ./prisma

# Install dependencies (postinstall can now find schema)
RUN npm install

# Copy the rest of the project
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]