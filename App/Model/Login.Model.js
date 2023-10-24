const { default: mongoose } = require("mongoose");

const LoginSchema = new mongoose.Schema({
  user_Id: {type: mongoose.Types.ObjectId, ref: "user"},
  browser_Id: {type: mongoose.Types.ObjectId, ref: "browser"},
  ip_Number: {type: String},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
})

module.exports = {
  LoginModel: mongoose.model("login", LoginSchema)
};