const redis = require("redis");

const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("Connect To Redis..."));
redisClient.on("ready", () => console.log("Connected To Redis And Ready To Use..."));
redisClient.on("error", (err) => console.log("RedisError:", err.message));
redisClient.on("end", () => console.log("Disconnected From Redis..."));

module.exports = redisClient