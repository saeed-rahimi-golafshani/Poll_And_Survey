const { IndexApi } = require("./Api/Home.Routes");
const { UserApiRoutes } = require("./User/Authentication.Routes");
const router = require("express").Router();

router.use("/", IndexApi);
router.use("/user", UserApiRoutes);

module.exports = {
  AllApiRoutes: router  
}