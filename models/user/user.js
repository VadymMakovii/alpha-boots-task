const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { HttpError } = require("../../src/helpers");

const {
  mongooseErrorHandler,
  nameValidationPattern,
  emailValidationPattern,
  emailValidationMessage,
  nameValidationMessage,
} = require("../../src/helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameValidationPattern,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailValidationPattern,
      unique: true,
      required: [true, "Email is required"],
    },
    age: {
      type: Number,
      min: 12,
      max: 120,
      default: 18,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseErrorHandler);

const validationResult = (req, res, next, schema) => {
  const result = schema.validate(req.body);
  const errorMessage = result.error?.details[0]?.message;
  if (result.error) {
    throw HttpError(400, errorMessage);
  }
  next();
};

const addUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(nameValidationPattern)
      .message(nameValidationMessage)
      .min(2)
      .max(30)
      .required(),
    age: Joi.number().integer().min(18).max(120).required(),
    email: Joi.string()
      .pattern(emailValidationPattern)
      .message(emailValidationMessage)
      .required(),
  });
  validationResult(req, res, next, schema);
};

const User = model("user", userSchema);

module.exports = {
  User,
  addUserValidation,
};
