// const { celebrate, Joi, Segments } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const {
  lengthId, regexYoutubeUrl, regexUrl, dataMessageJoi,
  // minCharacters, maxCharacters, minPass,
} = require('./constants');

// Регистрация
module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(), // .min(minPass)
    name: Joi.string().required(), // .min(minCharacters).max(maxCharacters)
  }),
}, { messages: dataMessageJoi });

// Вход
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(), // .min(minPass)
  }),
}, { messages: dataMessageJoi });

// Обновление данных профиля
module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(), // .min(minCharacters).max(maxCharacters)
  }),
}, { messages: dataMessageJoi });

// Добавление фильма в закладки
module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regexUrl).required(), // .uri() - надо тестировать, странно работает
    thumbnail: Joi.string().pattern(regexUrl).required(),
    trailerLink: Joi.string().pattern(regexYoutubeUrl).required(),
  }),
}, { messages: dataMessageJoi });

// Удаление фильма из закладок
module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    bookmarkId: Joi.string().length(lengthId).hex().required(),
    // bookmarkId используется в:
    // + movieRoutes.js
    // + controllers/movies.js
    // + utils/validation.js
  }),
}, { messages: dataMessageJoi });
