const { default: mongoose } = require("mongoose");

const BrowserSchema = new mongoose.Schema({
  user_Id: {type: mongoose.Types.ObjectId, ref: "user"},
  browser: {type: String},
  version: {type: String},
  os: {type: String},
  platform: {type: String},
  source: {type: String},
  geoIp: {type: Object},
  isMobile: {type: Boolean, default: false},
  isDesktop: {type: Boolean, default: false}
});

module.exports = {
  BrowserModel: mongoose.model("browser", BrowserSchema)
}