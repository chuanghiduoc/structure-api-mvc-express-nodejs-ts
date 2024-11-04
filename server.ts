import dotenv from 'dotenv';
import { Server } from 'http';
import app from './src/app';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFile });

const PORT = process.env.PORT || 4000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Express server exited`));
});
