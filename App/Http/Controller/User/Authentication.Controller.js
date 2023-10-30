const createHttpError = require("http-errors");
const { UserModel } = require("../../../Model/User.Model");
const Controller = require("../Controller");
const { registerSchema, loginSchema } = require("../../Validation/User/Authentication.Schema");
const { hashString, convertGregorianToPersionToday } = require("../../../Utills/Public_Function");
const { PasswordModel } = require("../../../Model/Password.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../../../Utills/Token");
const { LoginModel } = require("../../../Model/Login.Model");
const { BrowserModel } = require("../../../Model/Browser.Model");
const ip = require("ip");

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
  async login(req, res, next){
    try {
      const requestBody = await loginSchema.validateAsync(req.body);
      const { mobile, password } = requestBody;
      const user = await UserModel.findOne({mobile});
      if(!user) throw new createHttpError.BadRequest("درخواست نا معتبر، شماره موبایل یا رمز عبور را درست وارد کنید");
      const getPassword = await PasswordModel.findOne({user_Id: user._id});
      const confirmPassword = bcrypt.compareSync(password, getPassword.password);
      if(!confirmPassword) throw new createHttpError.BadRequest("درخواست نا معتبر، شماره موبایل یا رمز عبور را درست وارد کنید");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      if(accessToken && refreshToken){
        const checkLogin = await LoginModel.findOne({user_Id: user._id});
        const checkBrowser = await BrowserModel.findOne({user_Id: user._id});
        const ip_number = ip.address();
        let userAgent = {
          browser: req.useragent.browser,
          version: req.useragent.version,
          os: req.useragent.os,
          platform: req.useragent.platform,
          source: req.useragent.source,
          geoIp: req.useragent.geoIp,
          isMobile: req.useragent.isMobile,
          isDesktop: req.useragent.isDesktop
        };
        console.log("seaadddddddddddddddddddddd");
        req.headers.useragent = userAgent
        if(checkLogin && checkBrowser){
          const browserUpdate = await BrowserModel.deleteOne({user_Id: user._id});
          if(browserUpdate.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
          const updateLoginResault = await LoginModel.deleteOne({user_Id: user._id});
          if(updateLoginResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
        }
        const browserCreate = await BrowserModel.create(
          {
            user_Id: user._id,
            browser: userAgent.browser, 
            version: userAgent.version, 
            os: userAgent.os, 
            platform: userAgent.platform, 
            source: userAgent.source, 
            geoIp: userAgent.geoIp, 
            isMobile: userAgent.isMobile, 
            isDesktop: userAgent.isDesktop
          });
      if(!browserCreate) throw new createHttpError.InternalServerError("خطای سروری");
      const loginCreate = await LoginModel.create({user_Id: user._id, browser_Id: browserCreate._id, ip_Number: ip_number})
      if(!loginCreate) throw new createHttpError.InternalServerError("خطای سروری");  
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
            accessToken,
            // refreshToken
        }
    });
        
      } 
    } catch (error) {
      next(error)
    }
  }
  async checkExistUser(mobile){
    const user = await UserModel.findOne({mobile});
    if(user) throw new createHttpError.BadRequest("کاربر با مشخصات زیر از قبل ثبت نام کرده است");
    return user
  };
}

module.exports = {
  AuthenticationController: new AuthenticationController()
};