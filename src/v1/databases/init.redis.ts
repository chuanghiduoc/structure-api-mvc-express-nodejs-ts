import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL as string });

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (error) => {
  console.error('Redis Client Error:', error);
});

// Kết nối client và xử lý lỗi nếu có
client.connect().catch((err) => console.error('Connection error:', err));

export default client;
