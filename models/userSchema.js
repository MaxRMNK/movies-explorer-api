const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcryptjs'); // Код, для которого этот модуль, будет удален?

// Определение схемы
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    // required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "пароль" должно быть заполнено'],
    // required: true,
    // minlength: 8,
    select: false, // При запросе данных пользователя (GET) пароль отправляться не будет
  },
  name: {
    type: String,
    // required: true,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Максимальная длина имени 30 символов'],
    // minlength: 2,
    // maxlength: 30,
  },
});

// Создание и экспорт модели
// Короткий вариант:
module.exports = mongoose.model('user', userSchema);
// Развернутый вариант:
// const UserModel = mongoose.model('user', userSchema);
// module.exports = UserModel;

// 'user' - имя модели = название коллекции ("таблицы") в БД.
// В БД к названию на конце добавляется 's'.

// Модель строится на основе Схемы и является «оберткой» из методов вокруг схемы.
// Благодаря ей мы можем читать, добавлять, удалять и обновлять документы в БД.
// При импорте Модели ей можно дать любое название.

//-------------------
// .
// УДАЛИТЬ ???
// .
// // Определение собственного метода (toJSON) модели.
// // Этот метод возвращает значение текущий объект убирая из него поле password.
// // Добавленные методы будут доступны только на экземплярах модели, а не на всей коллекции,
// // например, этот только внутри вызова модели UserModel (контроллера user.js).
// // eslint-disable-next-line func-names
// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };

// .
// Не надо. Код из урока. У меня он в Контроллере
// .
// // eslint-disable-next-line func-names
// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }) // Ищем пользователя по почте
//     // this - это модель user (UserModel)
//     .select('+password')
//     // Добавляет поле password в исключения, т.к. оно отключено в Схеме (см.выше)
//     .then((user) => {
//       // Если пользователь не найден - отклоняем промис
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }

//       // Если пользователь найден - сравниваем хеши
//       return bcrypt.compare(String(password), user.password)
//         .then((isValidUser) => {
//           // Если пароль не прошел проверку - отклоняем промис
//           if (!isValidUser) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }

//           // Если пароль прошел проверку - возвращаем данные пользователя
//           return user;
//         });
//     });
// };
