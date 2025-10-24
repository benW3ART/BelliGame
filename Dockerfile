FROM node:18-alpine

WORKDIR /app

# Copy game directory
COPY game/ ./game/

# Install dependencies
WORKDIR /app/game
RUN npm install

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
