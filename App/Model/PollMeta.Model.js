const { default: mongoose } = require("mongoose");

const PollMeta = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref: "poll", required: true},
  key: {type: String},
  content: {type: String}
})

module.exports = {
  PollMetModel: mongoose.model("poll_meta", PollMeta)
};