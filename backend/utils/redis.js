const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Your Redis server host
  port: process.env.REDIS_PORT || 6379,        // Your Redis server port
  password: process.env.REDIS_PASSWORD || null // If your Redis server requires a password
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
