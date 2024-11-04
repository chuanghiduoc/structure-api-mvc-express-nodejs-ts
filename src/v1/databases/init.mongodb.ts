import mongoose from 'mongoose';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFile });

// Kết nối đến MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB successfully!...'))
  .catch((err) => console.error('Error: connect::: ', err));

// Tất cả các phương thức thực thi sẽ log đầu ra ra console
mongoose.set('debug', true);

// Vô hiệu hóa màu trong chế độ debug
mongoose.set('debug', { color: false });

// Lấy đầu ra thân thiện với mongodb-shell (ISODate)
mongoose.set('debug', { shell: true });

export default mongoose;
