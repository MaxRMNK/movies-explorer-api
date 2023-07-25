const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401 Unauthorized

const auth = (req, res, next) => {
  const { authorization } = req.headers; // Токен из заголовка запроса
  // Проверяем, что авторизационный заголовок есть и начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try { // верифицируем токен
    payload = checkToken(token);
  } catch (err) { // отправим ошибку, если не получилось
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
