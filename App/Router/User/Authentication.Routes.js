const { AuthenticationController } = require("../../Http/Controller/User/Authentication.Controller");
const router = require("express").Router();

router.post("/register", AuthenticationController.register)

module.exports = {
  UserApiRoutes: router
}