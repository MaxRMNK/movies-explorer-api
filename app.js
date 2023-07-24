/* eslint-disable no-console */
// Раскомментировать перед Пулл-реквестом строку в .eslintrc !!!

require('dotenv').config(); // Для получения SECRET_KEY из переменной окружения.

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors'); // модуль CORS (В ПР15 была мидлвара)

// Стандартный обработчик ошибок Celebrate. Заменил на свой.
// const { errors } = require('celebrate');

const router = require('./routes'); // Файл index берется по-умолчанию, указывать не надо

const { joiErrorHandler } = require('./middlewares/joiErrorHandler'); // Мой обработчик ошибок Celebrate
const { errorHandler } = require('./middlewares/error'); // Мой обработчик всех ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger'); // Логгеры

const { limiter } = require('./utils/limiter'); // Подключение и настройки rate-limiter
const {
  MONGO_DB, // URL Базы данных
  PORT, // Порт подключения
  allowedCors, // URL для CORS
} = require('./utils/config');

const app = express();

app.use(limiter); // Ограничение количества запросов с IP
app.use(helmet()); // Помогает защитить приложения Express, установив HTTP заголовки ответов.

// Подключение к mongo + Обработка ошибок подключения.
mongoose.connect(MONGO_DB)
  .then(() => { console.log('Успешное подключение к базе данных'); })
  .catch(() => { console.log('Ошибка подключения к базе данных'); });

app.use(express.json()); // Сборка пакетов в JSON-формате. Вместо bodyParser теперь express

app.use(cors({ allowedCors }));

app.use(requestLogger); // Логгер запросов. Gодключать до всех обработчиков роутов
app.use(router);
app.use(errorLogger); // Логгер ошибок. Подключать после обработчиков роутов и до ошибок

// app.use(errors()); // Стандартный обработчик ошибок Celebrate.
app.use(joiErrorHandler); // Мой обработчик ошибок Celebrate
app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение прослушивает порт ${PORT}`); // App listening on port ${PORT}
});
