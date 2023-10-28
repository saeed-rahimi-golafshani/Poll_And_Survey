const jwt = require("jsonwebtoken")
const { Promise } = require("mongoose")
const { UserModel } = require("../Model/User.Model");
const { ACCESS_Token_SECRETKEY, REFRESH_TOKEN_SECRETKEY } = require("./Contents");
const createHttpError = require("http-errors");
const redisClient = require("./Init_Redis");

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
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile
    };
    const option = {
      expiresIn: "1y"
    };
    jwt.sign(payload, REFRESH_TOKEN_SECRETKEY, option, async(error, token) => {
      if(error) reject(createHttpError.InternalServerError("خطای سروری"));
      await redisClient.SETEX(userId, (360*24*60*60), token);
      resolve(token)
    })
  })
}

module.exports = {
  signAccessToken,
  signRefreshToken
}