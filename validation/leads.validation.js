const Joi = require("joi");

const leadValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      leadname: Joi.string().alphanum().min(4).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(15).required(),
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

module.exports = leadValidator;
