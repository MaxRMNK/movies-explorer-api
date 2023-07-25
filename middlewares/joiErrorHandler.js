const { CelebrateError } = require('celebrate');

const ValidationError = require('../utils/errors/ValidationError'); // 400 Bad Request

// Middleware для обработки ошибок Celebrate и Joi.
// Меняет стандартный формат в котором Celebrate отдает ошибку пользователю.
const joiErrorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    // if (err.message === 'Validation failed') { // Было
    // console.log('*Celebrate Error*');
    // console.log(err);

    const errorBody = err.details.get('body'); // 'details' is a Map()
    const errorParams = err.details.get('params'); // 'details' is a Map()
    // console.log('** errorBody*', errorBody);
    // console.log('** errorParams*', errorParams);

    if (!errorBody) {
      const { details: [errorDetails] } = errorParams;
      throw new ValidationError(`Celebrate: ${errorDetails.message}`);
    }

    const { details: [errorDetails] } = errorBody;
    throw new ValidationError(`Celebrate: ${errorDetails.message}`);
  }

  next(err);
};

module.exports = { joiErrorHandler };

/**
  // console.log('sdsdfsdfsd', err);
  // console.log('ssdfsdf', err.statusCode);

  // err.message = errorDetails.message;
  // console.log('--err', errorBody);
  // console.log('---- errorDetails', errorDetails.message); // errorDetails.message
  // res.status(400).send({ message: errorDetails.message });

  // console.log('--err.details', err.details);

  // console.log('---errorBody', err.details.entries());
  // console.log('err.details.get(\'body\')', err.details.get("body"));

  // if (err && err.joi) {
  //   // Получение первого сообщения об ошибке из объекта ошибки Joi
  //   const errorMessage = err.joi.details[0].message;
  //   res.status().json({ error: errorMessage });
  // }

*/
