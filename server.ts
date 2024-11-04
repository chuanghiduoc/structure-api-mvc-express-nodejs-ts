import dotenv from 'dotenv';
import { Server } from 'http';
import app from './src/app';
import cluster from 'cluster';
import os from 'os';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFile });

const PORT = process.env.PORT || 4000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
  });
} else {
  // Workers can share any TCP connection
  const server: Server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} by worker ${process.pid}`);
  });

  process.on('SIGINT', () => {
    server.close(() => {
      console.log(`Express server exited for worker ${process.pid}`);
      process.exit(0); // Ensure the worker exits
    });
  });
}
