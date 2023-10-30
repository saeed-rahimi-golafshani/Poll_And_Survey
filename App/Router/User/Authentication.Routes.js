const { AuthenticationController } = require("../../Http/Controller/User/Authentication.Controller");
const router = require("express").Router();

router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);
router.post("/refresh_token", AuthenticationController.refreshTokenAuth);

module.exports = {
  UserApiRoutes: router 
}