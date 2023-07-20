// Файл конфигурации. Собраны все настройки

// const rateLimit = require('express-rate-limit'); // Подключение модуля rate-limit

// Ключ для генерации и проверки токена
const { NODE_ENV, SECRET_KEY_ENV, MONGO_DB_ENV } = process.env;

const SECRET_KEY_DEV = 'dev-secret-key'; // Cекретный ключ для режима разработки
const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : SECRET_KEY_DEV;

const { PORT = 3000 } = process.env;

// MONGO_DB_ENV = 'mongodb://127.0.0.1:27017/bitfilmsdb', // При деплое обновить .env
const MONGO_DB_DEV = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DB = NODE_ENV === 'production' ? MONGO_DB_ENV : MONGO_DB_DEV;

// Домены, с которых разрешены кросс-доменные запросы для модуля cors (или мидлвары cors.js)
const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
];

// // Настройки модуля rate-limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // за 15 минут
//   max: 100, // С каждого IP можно совершать до 100 запросов на 'window' (за 15 минут)
//   // standardHeaders: true, // Информация об ограничении возвращается в заголовках 'RateLimit-*'
//   // legacyHeaders: false, // Отключить заголовки 'X-RateLimit-*'
// });

module.exports = {
  SECRET_KEY,
  PORT,
  MONGO_DB,
  allowedCors,
  // limiter,
};
