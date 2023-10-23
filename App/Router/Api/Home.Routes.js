const HomeController = require("../../Http/Controller/Api/Home.Controller");
const router = require("express").Router();

router.get("/", HomeController.indexPage)

module.exports = {
  IndexApi: router
}