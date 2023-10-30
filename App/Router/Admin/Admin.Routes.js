const { AdminApiPollRoutes } = require("./Poll.Routes");
const router = require("express").Router();

router.use("/poll", AdminApiPollRoutes)

module.exports = {
  AdminApiRoutes: router 
}