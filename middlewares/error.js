const errorHandler = (err, req, res, next) => {
  console.log('Ошибка:', err);

  const {
    statusCode = 500, // Будет присвоен статус по-умолчанию, если statusCode пустой
    message = 'На сервере произошла ошибка', // Будет присвоен если нет текста ошибки
  } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = { errorHandler };
