const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt

const UserModel = require('../models/userSchema');

const { signToken } = require('../utils/jwtAuth');

const ValidationError = require('../utils/errors/ValidationError'); // 400 Bad Request
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401 Unauthorized
// const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403 Forbidden
const NotFoundError = require('../utils/errors/NotFoundError'); // 404 Not Found
const ConflictError = require('../utils/errors/ConflictError'); // 409 Conflict
// const UnhandledError = require('../utils/errors/UnhandledError'); // 500 Internal Server Error

const SALT_ROUNDS = 10; // Надежная "соль" от 12 и больше.
const ERROR_DUPLICATE_KEY = 11000; // Ошибка, которую выдает mongo, если ключ (поле) неуникально.

// Создание пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) { // Чтобы отсечь пустые запросы еще до обращения к БД.
    throw new ValidationError('Все поля обязательны для заполнения');
    // 'Ошибка валидации, переданы некорректные данные'
  }

  bcrypt.hash(String(password), SALT_ROUNDS) // Хеширование пароля
    // String() - на всякий случай, если пользователь введет пароль-число.
    .then((hashedPassword) => {
      UserModel.create({
        name, email, password: hashedPassword,
      })
        .then(() => {
          res.status(201).send({ // HTTP_STATUS.CREATED
            name, email,
          });
        })
        .catch((err) => {
          if (err.code === ERROR_DUPLICATE_KEY) { // 11000
            next(new ConflictError('Пользователь с таким email уже существует'));
          } else if (err instanceof mongoose.Error.ValidationError) {
            // Выловим первую ошибку валидатора из Схемы. С остальными разберемся потом.
            const errorFields = Object.keys(err.errors);
            const errorFirstField = err.errors[errorFields[0]];

            if (errorFirstField) { // Если ошибка поймана валидатором Схемы - берем текст из нее
              next(new ValidationError(errorFirstField.message));
            } else {
              next(new ValidationError('Ошибка валидации, переданы некорректные данные'));
            }
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// Роут аутентификацияя пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthorizedError('Неправильные почта или пароль 1');
  }

  UserModel.findOne({ email })
    .select('+password') // Достать пароль в зону видимости
    .orFail(new UnauthorizedError('Неправильные почта или пароль 2'))
    .then((user) => Promise.all([user, bcrypt.compare(String(password), user.password)]))
    // Делаем такую конструкцию, чтобы избавиться от вложенности .then:
    // Promise.all - передает в следующий then массив "объект пользователя" и результат
    // сравнения полученного пароля с хэшем.
    // String() - на всякий случай, если пользователь введет пароль-число.
    .then(([user, isValidHash]) => {
      if (!isValidHash) {
        throw new UnauthorizedError('Неправильные почта или пароль 3');
      }

      const token = signToken({ _id: user._id }); // { _id: user._id } - payload / пейлоуд
      // console.log(`Вход выполнен: ${user.name} \nТокен: ${token}`);

      res.status(200).send({ token });
    })
    .catch(next);
};

// !!! Удалить при деплое
// Получение всех пользователей
const getUsers = (req, res, next) => {
  UserModel.find({})
    .orFail(new ValidationError('Некорректный запрос'))
    .then((users) => {
      res.status(200).send(users);
    })
    // .catch((err) => { // Это все только для тестов. Оставить только "catch(next)".
    //   if (err instanceof mongoose.Error.CastError) {
    //     // Если userId не может быть преобразован в ObjectId
    //     // err.name === 'CastError'
    //     // next(new ValidationError('Переданы некорректные данные'));
    //     next(new ValidationError('Переданы некорректные данные'));
    //   } else {
    //     next(err);
    //   }
    // });
    .catch(next);
};

// Получение информации о текущем пользователе
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user; // ID пользователя, из токена

  UserModel.findById(_id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// Обновление информации о пользователе
const updateUserInfo = (req, res, next) => {
  const { _id } = req.user; // ID пользователя, из токена
  const { name, email } = req.body;

  if (!name || !email) {
    throw new ValidationError('Некорректный запрос');
  }

  UserModel.findByIdAndUpdate(
    _id,
    { name, email },
    { new: true, runValidators: true }, // обработчик then получит на вход обновленную запись
  )
    // .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === ERROR_DUPLICATE_KEY) { // 11000
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        // Выловим первую ошибку валидатора из Схемы. С остальными разберемся потом.
        const errorFields = Object.keys(err.errors);
        const errorFirstField = err.errors[errorFields[0]];

        if (errorFirstField) { // Если ошибка поймана валидатором Схемы - берем текст из нее
          next(new ValidationError(errorFirstField.message));
        } else {
          next(new ValidationError('Ошибка валидации, переданы некорректные данные'));
        }
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  updateUserInfo,
};
