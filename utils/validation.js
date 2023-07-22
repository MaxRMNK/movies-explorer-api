// const { celebrate, Joi, Segments } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const regexUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[^\s]*)*\/?$/;
// const regex = /^(https?:\/\/)(www\.)?[^\s]*$/;
// const regex = /^(https?:\/\/)?(www\.)?[\w\d\.\-\_\~\:\/\?#\[\]@!\$&'\(\)\*\+,;=]+#?$/;
const regexYoutubeUrl = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([\w-]{11})(?:.+)?$/;

// Регистрация
module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

// Вход
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

// Обновление данных профиля
module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

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
    image: Joi.string().pattern(regexUrl).required(),
    thumbnail: Joi.string().pattern(regexUrl).required(),
    trailerLink: Joi.string().pattern(regexYoutubeUrl).required(),
  }),
});

// Удаление фильма из закладок
module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    bookmarkId: Joi.string().length(24).hex().required(),
  }),
});
// bookmarkId используется в:
// + movieRoutes.js
// + controllers/movies.js
// + utils/validation.js
