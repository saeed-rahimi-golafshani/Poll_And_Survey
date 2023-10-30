const createHttpError = require("http-errors");
const joi = require("joi");

const createPollSchema = joi.object({
  title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان نظرسنجی اشتباه است")),
  en_title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان انگلیسی نظرسنجی اشتباه است")),
  meta_title: joi.string().trim().min(3).max(120).error(createHttpError.BadRequest("ساختار عنوان متا اشتباه است")),
  summery: joi.string().trim().error(createHttpError.BadRequest("ساختار متن کوتاه اشتباه است")),
  type: joi.boolean().error(createHttpError.BadRequest("ساختار نوع برای نظرسنجی اشتباه است")),
  published: joi.boolean().error(createHttpError.BadRequest("ساختار تصمیم برای انتشار نظرسنجی اشتباه است")),
  publishedAt: joi.string().error(createHttpError.BadRequest("ساختار زمان انتشار نظرسنجی اشتباه است")),
  startAt: joi.string().error(createHttpError.BadRequest("ساختار زمان شروع نظرسنجی اشتباه است")),
  endAt: joi.string().error(createHttpError.BadRequest("ساختار زمان پایان نظرسنجی اشتباه است")),
  content: joi.string().error(createHttpError.BadRequest("ساختار محتوا نظرسنجی اشتباه است")),
});

module.exports = {
  createPollSchema
}