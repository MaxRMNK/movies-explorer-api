const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 50, // Разрешенное количество запросов на 'window' с одного IP (за 15 минут)
  // standardHeaders: true, // Информация об ограничении возвращается в заголовках 'RateLimit-*'
  // legacyHeaders: false, // Отключить заголовки 'X-RateLimit-*'
  message: { message: 'Слишком много запросов. Пожалуйста, повторите попытку позже.' },
});

module.exports = { limiter };
