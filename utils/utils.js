// Массив доменов, с которых разрешены кросс-доменные запросы
// Для модуля cors (или мидлвары cors.js)
const allowedCors = [
  'http://localhost:3000',
];

const {
  // Локалхост
  MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  // Виртуальная машина
  // MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  // PORT = 3000,
} = process.env;

module.exports = {
  allowedCors,
  MONGO_DB,
  PORT,
};
