const router = require('express').Router();

const validation = require('../utils/validation');
const userControllers = require('../controllers/users');

// ------------------------------------------------------------
// Роут для получения информации о текущем пользователе
router.get('/me', userControllers.getCurrentUser);

// Роут обновления данных пользователя - имя и описание
router.patch('/me', validation.validateUpdateUser, userControllers.updateUserInfo);

// !!! Удалить при деплое !!!
// Роут (путь, маршрут, эндпоинт) для получения пользователей
// router.get('/', userControllers.getUsers);

module.exports = router;
