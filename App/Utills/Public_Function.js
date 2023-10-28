const bcrypt = require("bcrypt");
const momentJalali = require("moment-jalali");

function hashString(str){
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt)
};
function convertGregorianToPersionToday(){ 
  const date = new Date();
  return momentJalali(date).format('jYYYY-jMM-jDD HH:mm:ss');
};

module.exports = {
  hashString,
  convertGregorianToPersionToday
}