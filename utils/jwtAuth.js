// Почему так лучше: подключение пакета JWT, секретный ключ, настройка его срока жизни,
// генерация и проверка токена находятся в одном месте.
// см. вебинар: Наталья Дружинина, cohort_61, 2023-06-02.
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('./config');

const signToken = (payload) => jwt.sign(payload, SECRET_KEY, {
  expiresIn: '7d', // Срок жизни токена: Сейчас - 7 дней.
});
// return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

// До верификации ключа из env и dev
const checkToken = (token) => jwt.verify(token, SECRET_KEY);
// return jwt.verify(token, SECRET_KEY);

module.exports = {
  signToken,
  checkToken,
};
