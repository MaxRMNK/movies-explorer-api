const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  director: { // режиссёр фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  duration: { // длительность фильма. Обязательное поле-число.
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  description: { // описание фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки на постер',
    },
  },
  trailerLink: { // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки на трейлер фильма',
    },
  },
  thumbnail: { // мини изображение к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки на миниатюру постера',
    },
  },
  owner: { // _id пользователя, который сохранил фильм. Обязательное поле.
    type: Array,
    default: [],
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer.
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском языке. Обязательное поле-строка.
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке. Обязательное поле-строка.
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
