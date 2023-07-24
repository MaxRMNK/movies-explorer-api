const router = require('express').Router();

const validation = require('../utils/validation');
const movieControllers = require('../controllers/movies');

// ------------------------------------------------------------
// Роут для получения информации о фильмах добавленных в закладки текущим пользователем
router.get('/', movieControllers.getMovies);

// Роут добавления фильма в закладки
router.post('/', validation.validateCreateMovie, movieControllers.createMovie);

// Роут удаления фильма из закладок
router.delete('/:bookmarkId', validation.validateDeleteMovie, movieControllers.deleteMovie);
// Название bookmarkId (строка=>объект) выбрано чтобы не путать с полем Схемы movieId (число!),
// которое приходит вместе с другими данными фильма и сохраняется в БД под этим (movieId) именем.
// bookmarkId используется в:
// + movieRoutes.js
// + controllers/movies.js
// + utils/validation.js

module.exports = router;
