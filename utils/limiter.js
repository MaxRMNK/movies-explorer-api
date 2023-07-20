const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // С каждого IP можно совершать до 100 запросов на 'window' (за 15 минут)
  // standardHeaders: true, // Информация об ограничении возвращается в заголовках 'RateLimit-*'
  // legacyHeaders: false, // Отключить заголовки 'X-RateLimit-*'
});

module.exports = { limiter };
