const Redis = require('ioredis');
const redisClient = new Redis(process.env.REDIS_URL); // Adjust for your environment
module.exports = redisClient;
