const { default: mongoose } = require("mongoose");

const PollAnswerSchema = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref: "poll", required: true},
  question_Id: {type: mongoose.Types.ObjectId, ref: "poll_question", required: true},
  active: {type: Boolean, required: true, default: false},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
  content: {type: String}
}, {
  toJSON: {virtuals: true}
});

module.exports = {
  PollAnswerModel: mongoose.model("poll_answer", PollAnswerSchema)
};