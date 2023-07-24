// Файл конфигурации. Собраны все настройки

// Ключ для генерации и проверки токена
const { NODE_ENV, SECRET_KEY_ENV, MONGO_DB_ENV } = process.env;

const SECRET_KEY_DEV = 'dev-secret-key'; // Cекретный ключ для режима разработки
const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : SECRET_KEY_DEV;

const { PORT = 3000 } = process.env;

const MONGO_DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb'; // При деплое обновить .env
// const MONGO_DB_DEV = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DB = NODE_ENV === 'production' ? MONGO_DB_ENV : MONGO_DB_DEV;

// Домены, с которых разрешены кросс-доменные запросы для модуля cors (или мидлвары cors.js)
const allowedCors = [
  'http://localhost:3000',
  // 'http://localhost:3001',
];

module.exports = {
  SECRET_KEY,
  PORT,
  MONGO_DB,
  allowedCors,
  // limiter,
};
