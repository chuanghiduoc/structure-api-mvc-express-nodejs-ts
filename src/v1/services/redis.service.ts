import client from '@/databases/init.redis';
import { promisify } from 'util';

// Sử dụng promisify để chuyển đổi các phương thức callback thành promise
const REDIS_GET = promisify(client.get).bind(client);
const REDIS_SET = promisify(client.set).bind(client);
const REDIS_LRANGE = promisify(client.lRange).bind(client);

// Xuất các hàm đã promisify
export const redis = {
  REDIS_GET,
  REDIS_SET,
  REDIS_LRANGE
};
