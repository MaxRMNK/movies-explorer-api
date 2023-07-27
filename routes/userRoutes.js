const router = require('express').Router();

const { validateUpdateUser } = require('../utils/validation');
const { getCurrentUser, updateUserInfo, getUsers } = require('../controllers/users');

// ------------------------------------------------------------
// Роут для получения информации о текущем пользователе
router.get('/me', getCurrentUser);

// Роут обновления данных пользователя - имя и описание
router.patch('/me', validateUpdateUser, updateUserInfo);

// !!! Удалить при деплое
// Роут (путь, маршрут, эндпоинт) для получения пользователей
router.get('/', getUsers);

module.exports = router;
