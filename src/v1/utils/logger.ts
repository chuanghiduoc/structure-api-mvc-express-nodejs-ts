import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: 'logs/info.log',
      level: 'info', // Ghi lại mọi log với mức độ 'info' và cao hơn
      format: format.combine(
        format.printf((info) => (info.level === 'info' ? `${info.level}: ${info.timestamp} ${info.message}` : ''))
      )
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error', // Ghi lại mọi log với mức độ 'error'
      format: format.combine(
        format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`) // Ghi lại log ở mức độ 'error'
      )
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(), // Thêm màu cho log khi in ra console
        format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`)
      )
    })
  ]
});

// Sử dụng logger
logger.info('This is an info log'); // Ghi vào info.log
logger.error('This is an error log'); // Ghi vào error.log
logger.warn('This is a warning log'); // Ghi vào info.log
logger.debug('This is a debug log'); // Không ghi vào cả hai tệp vì không phải là 'info' hoặc 'error'

export default logger;
