const router = require('express').Router();

const validation = require('../utils/validation');
const userControllers = require('../controllers/users');

// ------------------------------------------------------------
// Роут для получения информации о текущем пользователе
router.get('/me', userControllers.getCurrentUser);

// Роут обновления данных пользователя - имя и описание
router.patch('/me', validation.validateUpdateUser, userControllers.updateUserInfo);

// Удалить роуты
// Роут (путь, маршрут, эндпоинт) для получения пользователей
router.get('/', userControllers.getUsers);

// // Роут для получения пользователя по ID в URL
// router.get('/:userId', userControllers.getUserById);

module.exports = router;
