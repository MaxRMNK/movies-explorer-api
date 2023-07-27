const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../utils/validation');

const { createUser, login } = require('../controllers/users');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');

const NotFoundError = require('../utils/errors/NotFoundError'); // 404 Not Found

router.post('/signup', validateCreateUser, createUser); // Роут регистрации
router.post('/signin', validateLogin, login); // Роут входа

router.use(auth); // Все роуты идущие после будут доступны только авторизованным пользователям

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

// ХЗ зачем закрывать от неавторизированных пользователей страницу 404,
// но по меннию ревьюера так надо.
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
// router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена 111')));

/**
 * Если вызываем Роутер без пути, тогда в вызываемом файле пути указываются полностью.
 * Если вызываем Роутер с указанием пути, тогда пути здесь и вызываемом файле суммируются:
 * Видео "Как развернуть сервер" 0:58:30+
 */
// router.use('/users', userRoutes);
// router.use(userRoutes);

// Так будут защищены авторизацией только указанные роуты
// router.use('/users', auth, userRoutes); // Защищено авторизацией
// router.use('/movies', auth, movieRoutes); // Защищено авторизацией

module.exports = router;
