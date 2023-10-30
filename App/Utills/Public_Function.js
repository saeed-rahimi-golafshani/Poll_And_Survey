const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const momentJalali = require("moment-jalali");
const { default: mongoose } = require("mongoose");

function hashString(str){
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt)
};
function convertGregorianToPersionToday(){ 
  const date = new Date();
  return momentJalali(date).format('jYYYY-jMM-jDD HH:mm:ss');
};
async function checkExistOfModelByTitleWithoutFile(title, modelSchema){
  const model = await modelSchema.findOne({title});
      if(model){
          throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
      }
      return model;
};
async function checkExistOfModelById(id, modelSchema){
  if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
  const model = await modelSchema.findById(id);
  if(!model) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
  return model
};
function copyObject(obj){
  return JSON.parse(JSON.stringify(obj));
};
function deleteInvalidPropertyObject(data = {}, blackList = []){
  const nullishData = ["", " ", 0, NaN, null, undefined];
  Object.keys(data).forEach(key => {
      if(blackList.includes(key)) delete data[key];
      if(nullishData.includes(data[key])) delete data[key];
      if(typeof data[key] == "string") data[key] = data[key].trim();
      if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
      if(Array.isArray(data[key]) && data[key].length == 0) delete data[key];
  })
  return data
};


module.exports = {
  hashString,
  convertGregorianToPersionToday,
  checkExistOfModelByTitleWithoutFile,
  checkExistOfModelById,
  copyObject,
  deleteInvalidPropertyObject
}