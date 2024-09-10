const Joi = require("joi");

const userValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(4).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
        .required(),
      email: Joi.string().email().required(),
    });
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400);
    res.send({
      error: "Bad request",
      errorDescription: "failed in validating the request payload ",
      status: error.message.replaceAll('"', ""),
    });
  }
};

module.exports = userValidator;
