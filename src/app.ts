import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Khởi tạo databases
import '@/databases/init.mongodb';
import '@/databases/init.redis';

const app = express();

// User middleware
app.use(helmet());
app.use(morgan('combined'));
// Compress responses
app.use(compression());
app.use(cookieParser());

// Cấu hình quản lý phiên
app.use(
  session({
    secret: 'your-secret-key', // Thay thế bằng một bí mật mạnh mẽ
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Đặt thành true nếu sử dụng HTTPS
      maxAge: 1000 * 60 * 15 // 15 phút
    }
  })
);
// Thêm body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
import router from '@/routes/index.router';
app.use(router);

// Xử lý lỗi Middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Not found'
    }
  });
});

// Error handler middleware
app.use((error: { status?: number; message?: string }, req: Request, res: Response) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
});

export default app;
