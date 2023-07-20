const mongoose = require('mongoose');
const { isEmail } = require('validator');

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
    select: false, // При запросе (GET) данных пользователя пароль отправляться не будет
  },
  name: {
    type: String,
    // required: true,
    // default: 'Жак-Ив Кусто',
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
