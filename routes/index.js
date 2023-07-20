const router = require('express').Router();
// const { celebrate, Joi, Segments } = require('celebrate');

// const regex = /^(https?:\/\/)(www\.)?[^\s]*$/;
// // ^(https?:\/\/)?(www\.)?[\w\d\.\-\_\~\:\/\?#\[\]@!\$&'\(\)\*\+,;=]+#?$

const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const userRoutes = require('./usersRouter');
// const movieRouter = require('./moviesRouter');

const NotFoundError = require('../utils/errors/NotFoundError'); // 404 Not Found

router.post('/signup', createUser); // Роут регистрации
router.post('/signin', login); // Роут входа

// router.use('/users', userRoutes); // Защищено авторизацией
router.use('/users', auth, userRoutes); // Защищено авторизацией
// router.use('/cards', auth, cardRoutes); // Защищено авторизацией

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
// router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена 111')));

/**
 * Если вызываем Роутер без пути, тогда в вызываемом файле пути указываются полностью.
 * Если вызываем Роутер с указанием пути, тогда пути здесь и вызываемом файле суммируются:
 * Видео "Как развернуть сервер" 0:58:30+
 */
// router.use('/users', userRoutes);
// router.use(userRoutes);

// Так все роуты идущие после будут доступны только авторизованным пользователям
// router.use(auth);

module.exports = router;
