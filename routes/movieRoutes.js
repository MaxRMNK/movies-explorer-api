const router = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// ------------------------------------------------------------
// Роут для получения информации о фильмах добавленных в закладки текущим пользователем
router.get('/', getMovies);

// Роут добавления фильма в закладки
router.post('/', validateCreateMovie, createMovie);

// Роут удаления фильма из закладок
router.delete('/:bookmarkId', validateDeleteMovie, deleteMovie);
// Название bookmarkId (строка=>объект) выбрано чтобы не путать с полем Схемы movieId (число!),
// которое приходит вместе с другими данными фильма и сохраняется в БД под этим (movieId) именем.
// bookmarkId используется в:
// + movieRoutes.js
// + controllers/movies.js
// + utils/validation.js

module.exports = router;
