const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer.
    type: Number,
    required: true,
    // unique: true,
  },
  nameRU: { // название фильма на русском языке. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "название фильма на русском языке" должно быть заполнено'],
  },
  nameEN: { // название фильма на английском языке. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "название фильма на английском языке" должно быть заполнено'],
  },
  country: { // страна создания фильма. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "страна создания фильма" должно быть заполнено'],
  },
  director: { // режиссёр фильма. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "режиссёр фильма" должно быть заполнено'],
  },
  duration: { // длительность фильма. Обязательное поле-число.
    type: Number,
    required: [true, 'Поле "длительность фильма" должно быть заполнено'],
  },
  year: { // год выпуска фильма. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "год выпуска фильма" должно быть заполнено'],
  },
  description: { // описание фильма. Обязательное поле-строка.
    type: String,
    required: [true, 'Поле "описание фильма" должно быть заполнено'],
  },
  image: { // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки на постер',
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
  trailerLink: { // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки на трейлер фильма',
    },
  },
  owner: { // _id пользователя, который сохранил фильм. Обязательное поле.
    // type: Array,
    // default: [],
    // Спринт 13. Тема 5/10: Базы данных. Урок 9/10: Настраиваем связи.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
