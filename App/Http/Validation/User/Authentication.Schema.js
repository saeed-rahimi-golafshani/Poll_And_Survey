const createHttpError = require("http-errors");
const joi = require("joi");
const { MOBILE_PATTERN, EMAIL_PATTERN } = require("../../../Utills/Contents");

const registerSchema = joi.object({
  firstname: joi.string().trim().min(2).max(30).error(createHttpError.BadRequest("ساختار نام اشتباه است")),
  lastname: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest(" ساختار نام خانوادگی اشتباه است")),
  mobile: joi.string().length(11).pattern(MOBILE_PATTERN).trim().error(createHttpError.BadRequest("ساختار شماره تلفن همراه اشتباه است")),
  email: joi.string().trim().pattern(EMAIL_PATTERN).error(createHttpError.BadRequest("ساختار ایمیل وارد شده اشتباه است")),
  password: joi.string().trim().min(6).max(16).error(createHttpError.BadRequest("ساختار رمز عبور اشتباه است")),
  // repeate_password: joi.string().trim().min(6).max(16).error(createHttpError.BadRequest("ساختار رمز عبور اشتباه است")),
});
const loginSchema = joi.object({
  mobile: joi.string().length(11).pattern(MOBILE_PATTERN).trim().error(createHttpError.BadRequest("ساختار شماره تلفن همراه اشتباه است")),
  password: joi.string().trim().min(6).max(16).error(createHttpError.BadRequest("ساختار رمز عبور اشتباه است"))
});

module.exports = {
  registerSchema,
  loginSchema
}