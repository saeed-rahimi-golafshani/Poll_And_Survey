const { default: mongoose } = require("mongoose");

const PollQuestionSchema = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref: "poll", required: true},
  type: {type: String, required: true},
  active: {type: Boolean, required: true, default: false},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
  content: {type: String}
}, {
  toJSON: {virtuals: true}
});

module.exports = {
  PollQuestionModel: mongoose.model("poll_question", PollQuestionSchema)
}