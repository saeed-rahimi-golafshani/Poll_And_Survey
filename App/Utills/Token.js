const jwt = require("jsonwebtoken")
const { Promise } = require("mongoose")
const { UserModel } = require("../Model/User.Model");
const { ACCESS_Token_SECRETKEY } = require("./Contents");
const createHttpError = require("http-errors");

function signAccessToken(userId){
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile
    };
    const option = {
      expiresIn: "24h"
    };
    jwt.sign(payload, ACCESS_Token_SECRETKEY, option, (error, token) => {
      if(error) reject(createHttpError.InternalServerError("خطای سروری"))
      resolve(token)
    })
  })
};
function signRefreshToken(userId){
  return new Promise(async(resolve, reject) => {
    
  })
}

module.exports = {
  signAccessToken
}