require("dotenv").config();
const Application = require("./App/Server");
const port = process.env.APPLICATION_PORT;
const dburl = process.env.MONODB_URL;
new Application(port, dburl)