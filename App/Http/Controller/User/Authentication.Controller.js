const createHttpError = require("http-errors");
const { UserModel } = require("../../../Model/User.Model");
const Controller = require("../Controller");
const { registerSchema } = require("../../Validation/User/Authentication.Schema");
const { hashString, convertGregorianToPersionToday } = require("../../../Utills/Public_Function");
const { PasswordModel } = require("../../../Model/Password.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");

class AuthenticationController extends Controller{
  async register(req, res, next){
    try {
      const registerBody = await registerSchema.validateAsync(req.body);
      const { firstname, lastname, mobile, email, password } = registerBody;
      await this.checkExistUser(mobile);
      const createTime = convertGregorianToPersionToday();
      const updateTime = convertGregorianToPersionToday();
      const username = registerBody.firstname + registerBody.lastname 
      const user = await UserModel.create(
        {
          firstname, 
          lastname, 
          username,
          mobile, 
          email, 
          createdAt: createTime,
          updatedAt: updateTime
        });
      if(!user) throw new createHttpError.InternalServerError("خطای سروری");
      const hashPassword = hashString(password);
      const createPassword = await PasswordModel.create(
        {
          user_Id: user._id,
          password: hashPassword,
          createdAt: createTime,
          updatedAt: updateTime
        });
      if(!createPassword){
        const deleteUser = await UserModel.deleteOne({_id: user._id});
        if(deleteUser.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
        throw new createHttpError.InternalServerError("خطای سروری");
      } 
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "ثبت نام با موفقیت انجام شد"
        }
      });

      
    } catch (error) {
      next(error)
    }
  };
  
  async checkExistUser(mobile){
    const user = await UserModel.findOne({mobile});
    if(user) throw new createHttpError.BadRequest("کاربر با مشخصات زیر از قبل ثبت نام کرده است");
    return user
  };
}

module.exports = {
  AuthenticationController: new AuthenticationController()
};