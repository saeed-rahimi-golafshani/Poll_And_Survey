const { default: mongoose } = require("mongoose");

const PollTagSchema = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref:"poll", required: true},
  tag_Id: {type: mongoose.Types.ObjectId, ref: "tag", required: true}
});

module.exports = {
  PollTagModel: mongoose.model("poll_tag", PollTagSchema)
}