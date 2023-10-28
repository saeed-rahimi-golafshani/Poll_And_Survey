const { default: mongoose } = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
  password: {type: String, required: true},
  type: {type: String},
  active: {type: Boolean, default: true},
  forget_Password: {type: String},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
})

module.exports = {
  PasswordModel: mongoose.model("password", PasswordSchema)
}