const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  role_Id: {type: mongoose.Types.ObjectId, ref: "role"},
  firstname: {type: String},
  lastname: {type: String},
  username: {type: String},
  mobile: {type: String, required: true},
  email: {type: String, lowercase: true},
  birthday: {type: String},
  active: {type: Boolean, default: true},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
  profile: {type: String},
  introduction: {type: String},
  host: {type: Boolean},
});

module.exports = {
  UserModel: mongoose.model("user", UserSchema)
};