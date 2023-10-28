const jwt = require("jsonwebtoken");
const { ACCESS_Token_SECRETKEY } = require("../../Utills/Contents");
const { UserModel } = require("../../Model/User.Model");
const createHttpError = require("http-errors");

function getToken(headers){
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if(token && ["bearer", "Bearer"].includes(bearer)) return token
} 
function verifyAccessToken(req, res, next){
  try {
      const token = getToken(req.headers);
      jwt.verify(token, ACCESS_Token_SECRETKEY, async (err, payload) => {
          try {
              if(err) throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
              const { mobile } = payload || {};
              const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
              if(!user) throw createHttpError.NotFound("حساب کاربری یافت نشد");
              req.user = user;
              return next();
          } catch (error) {
              next(error)
          }
      })
  } catch (error) {
      next(error)
  }
}

module.exports = {
  verifyAccessToken
}