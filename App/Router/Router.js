const { verifyAccessToken } = require("../Http/Middleware/VerifyAccessToken");
const redisClient = require("../Utills/Init_Redis");
const { AdminApiRoutes } = require("./Admin/Admin.Routes");
const { IndexApi } = require("./Api/Home.Routes");
const { UserApiRoutes } = require("./User/Authentication.Routes");
const router = require("express").Router();
(async () => {
  await redisClient.set("key", "value");
  const value = redisClient.get("key");
  console.log(value);
})();

router.use("/", IndexApi);
router.use("/user", UserApiRoutes);
router.use("/admin", verifyAccessToken, AdminApiRoutes);

module.exports = {
  AllApiRoutes: router  
}