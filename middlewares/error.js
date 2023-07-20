const errorHandler = (err, req, res, next) => {
  console.log('Ошибка:', err);

  const {
    // Возможно, нужно удалить класс UnhandledError, т.к. ошибка присваевается по-умолчанию,
    // и все данные для нее задаются здесь. Либо, данные для подстановки здесь брать из класса?
    statusCode = 500, // Будет присвоен статус по-умолчанию, если statusCode пустой
    message = 'На сервере произошла ошибка', // Будет присвоен если нет текста ошибки
  } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = { errorHandler };
