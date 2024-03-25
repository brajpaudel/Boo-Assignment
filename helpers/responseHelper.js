const respondSuccess = async (res, statusCode, title, message, data = [], error) => res.status(statusCode).send({ success: true, title, message, data, error });

const respondError = async (res, statusCode, title, message, error) => res.status(statusCode).send({ success: false, title, message, error });

module.exports = { respondSuccess, respondError };
