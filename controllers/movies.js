const mongoose = require('mongoose');
const movieModel = require('../models/movieSchema');

const ValidationError = require('../utils/errors/ValidationError'); // 400 Bad Request
// const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401 Unauthorized
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403 Forbidden
const NotFoundError = require('../utils/errors/NotFoundError'); // 404 Not Found
// const ConflictError = require('../utils/errors/ConflictError'); // 409 Conflict
// const UnhandledError = require('../utils/errors/UnhandledError'); // 500 Internal Server Error

// const ERROR_DUPLICATE_KEY = 11000; // Ошибка, которую выдает mongo, если ключ (поле) неуникально.

// Роут получения всех сохраненных фильмов
const getMovies = (req, res, next) => {
  const { _id } = req.user; // ID пользоваля, из токена

  movieModel.find({ owner: _id })
    // .orFail(new ValidationError('Некорректный запрос'))
    // .populate('owner')
    .then((movies) => res.status(200).send(movies)) // { data: movies }
    .catch(next);
};

// Добавление фильма в сохраненные
const createMovie = (req, res, next) => {
  const { _id } = req.user; // ID пользоваля, из токена
  // const {
  //   country, director, duration, year, description,
  //   image, trailer, nameRU, nameEN, thumbnail, movieId,
  // } = req.body;

  movieModel.create({ owner: _id, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      // if (err.code === ERROR_DUPLICATE_KEY) { // 11000
      //   next(new ConflictError('Такой фильм уже добавлен в сохраненные'));
      // } else
      if (err instanceof mongoose.Error.ValidationError) {
        // Выловим первую ошибку валидатора из Схемы. С остальными разберемся потом.
        const errorFields = Object.keys(err.errors);
        const errorFirstField = err.errors[errorFields[0]];

        if (errorFirstField) {
          // Если ошибка поймана валидатором Схемы - берем текст из нее
          next(new ValidationError(errorFirstField.message));
        } else {
          next(new ValidationError('Ошибка валидации, переданы некорректные данные'));
        }
      } else {
        next(err);
      }
    });
};

// Удаление фильма из закладок
// Переписать, сделать проще и короче?
const deleteMovie = async (req, res, next) => {
  try {
    // console.log('deleteMovie req.params', req.params);
    const { bookmarkId } = req.params; // ID удаляемого фильма, из URL
    // bookmarkId используется в:
    // + movieRoutes.js
    // + controllers/movies.js
    // + utils/validation.js
    const { _id } = req.user; // ID пользоваля, из токена

    // Ждем пока найдется фильм с таким ID, и идем дальше
    const bookmark = await movieModel.findById(bookmarkId);

    if (bookmark === null) {
      throw new NotFoundError('Фильм не найден');
    } else {
      const bookmarkOwnerId = bookmark.owner.toString();

      // Проверяем является ли пользователь, который пытается удалить фильм, его владельцем.
      if (_id === bookmarkOwnerId) {
        // Удаляем фильм; отправляем код состояния и сообщение
        movieModel.deleteOne(bookmark)
          .then(() => res.status(200).send({
            message: 'Фильм успешно удален из сохраненных',
          }))
          .catch(next);
      } else {
        // Выдаем ошибку, если фильм удаляет не тот пользователь, который его добавил
        throw new ForbiddenError('Такого фильма нет в сохраненных');
      }
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError('Некорректный ID фильма'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
