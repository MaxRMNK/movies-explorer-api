// Файл конфигурации. Собраны все настройки

// Получаем переменные из .env.
const { // Если файла .env нет или там нет этих переменных, все они будут undefined.
  NODE_ENV, PORT_ENV, SECRET_KEY_ENV, MONGO_DB_ENV,
} = process.env;

// Получаем переменные из .env.
// const { // Если файла .env нет или там нет этих переменных, задаются значения по-умолчанию.
//   NODE_ENV = 'production',
//   PORT_ENV = 3000,
//   SECRET_KEY_ENV = '0uazgjuZRgLZ5II0p01g4fVYw9yfKSTz2LqewAIjDY5Qnt9sgmY0tuX3d2jQzqsA',
//   MONGO_DB_ENV = 'mongodb://127.0.0.1:27017/bitfilmsdb',
// } = process.env;

// Режим DEV
const PORT_DEV = 3000;
const SECRET_KEY_DEV = 'dev-secret-key'; // Cекретный ключ для режима разработки
const MONGO_DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb'; // WebServer
// const MONGO_DB_DEV = 'mongodb://localhost:27017/bitfilmsdb'; // localhost

const PORT = NODE_ENV === 'production' ? PORT_ENV : PORT_DEV;
const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : SECRET_KEY_DEV;
const MONGO_DB = NODE_ENV === 'production' ? MONGO_DB_ENV : MONGO_DB_DEV;

// -----

// Домены, с которых разрешены кросс-доменные запросы для модуля cors (или мидлвары cors.js)
const allowedCors = [
  'http://localhost:3000',
  // 'http://localhost:3001',
];

// Читать еще - разбираться нужны ли эти настройки или в app.js достаточно указать просто cors()
// const corsOptions = {
//   allowedCors: [
//     'http://localhost:3000',
//     'http://localhost:3001',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

module.exports = {
  SECRET_KEY,
  PORT,
  MONGO_DB,
  allowedCors,
  // NODE_ENV,
  // PORT_ENV,
  // SECRET_KEY_ENV,
  // MONGO_DB_ENV,
};

// Было до 27.07.2023
// const { NODE_ENV, SECRET_KEY_ENV, MONGO_DB_ENV } = process.env;
// const SECRET_KEY_DEV = 'dev-secret-key'; // Cекретный ключ для режима разработки
// const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : SECRET_KEY_DEV;
// const { PORT = 3000 } = process.env;
// // const MONGO_DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb'; // При деплое обновить .env
// const MONGO_DB_DEV = 'mongodb://localhost:27017/bitfilmsdb';
// const MONGO_DB = NODE_ENV === 'production' ? MONGO_DB_ENV : MONGO_DB_DEV;
