// Импорт модулей логгирования
const winston = require('winston');
const expressWinston = require('express-winston');

// Логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Логгер ошибок
// Нужен, чтобы в случае возникновения ошибки в лог записывалась информация о ней —
// имя ошибки, сообщение и ее стектрейс
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
