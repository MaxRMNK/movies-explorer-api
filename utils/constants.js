// Все константы, чтобы не искать их по отдельным файлам.

// Для Схем - userSchema.js и movieSchema.js
// Для Валидации celebrate - utils/validation.js
// const minCharacters = 2;
// const maxCharacters = 30;
// const minPass = 6; // Это не работает, т.к. в БД попадает уже хэш
module.exports.lengthId = 24;

// eslint-disable-next-line max-len
// module.exports.regexYoutubeUrl = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([\w-]{11})(?:.+)?$/;
module.exports.regexYoutubeUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[^\s]*)*\/?$/;
module.exports.regexUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[^\s]*)*\/?$/;
// const regex = /^(https?:\/\/)(www\.)?[^\s]*$/;
// const regex = /^(https?:\/\/)?(www\.)?[\w\d\.\-\_\~\:\/\?#\[\]@!\$&'\(\)\*\+,;=]+#?$/;

module.exports.dataMessageJoi = {
  'any.required': 'Поле {#label} обязательно для заполнения', // Если одно из полей небыло отправлено
  'string.empty': 'Поле {#label} не может быть пустым', // Если поле небыло заполнено
  'string.email': 'Неправильный формат электронной почты',
  'string.base': 'Поле {#label} должно быть строкой',
  'number.base': 'Поле {#label} должно быть числом', // Число
  'string.min': 'Поле {#label} должно быть не менее {#limit} знаков',
  'string.max': 'Поле {#label} должно быть не более {#limit} знаков',
  'string.length': 'Некорректный ID', // '{#label} length must be {#limit} characters long'
  'string.hex': 'В ID используются запрещенные символы', // '{#label} must only contain hexadecimal characters'
  'string.pattern.base': 'Значение поля {#label} не соответствует заданному шаблону',
  // 'string.uri': 'В поле {#label} должен быть указан URL',
};

// module.exports = {
//   lengthId, regexYoutubeUrl, regexUrl, dataMessageJoi,
//   // minCharacters, maxCharacters, minPass,
// };
