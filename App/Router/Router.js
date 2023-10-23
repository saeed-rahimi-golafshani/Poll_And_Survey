const { IndexApi } = require("./Api/Home.Routes");
const router = require("express").Router();

router.use("/", IndexApi)

module.exports = {
  AllApiRoutes: router  
}