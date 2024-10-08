const Joi = require("joi");

const leadValidator = async (req, res, next) => {
  try {
    // Define the Joi validation schema
    const opportunitySchema = Joi.object({
      leadname: Joi.string().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/) // Only digits allowed
        .required(),
      email: Joi.string().email().required(),
      feeQuoted: Joi.number().integer().required(),
      batchTiming: Joi.string().required(),
      leadStatus: Joi.string().required(),
      leadSource: Joi.string().required(),
      course: Joi.string().required(),
      selectedClassMode: Joi.string().required(), // Example of an enum-like validation
    });

    const value = await leadValidator.validateAsync(req.body);
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
