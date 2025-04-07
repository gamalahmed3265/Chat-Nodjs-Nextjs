import Joi from "joi";
// Define the validation schema
export const authSignUpValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profilePic: Joi.string().optional,
});
export const authSignInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
