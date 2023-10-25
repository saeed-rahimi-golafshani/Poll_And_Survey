const { default: mongoose } = require("mongoose");

const PollVoteSchema = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref: "poll", required: true},
  question_Id: {type: mongoose.Types.ObjectId, ref: "poll_question", required: true},
  answer_Id: {type: mongoose.Types.ObjectId, ref: "poll_answer", required: true},
  user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
  content: {type: String}
}, {
  toJSON: {virtuals: true}
});

module.exports = {
  PollVoteModel: mongoose.model("poll_vote", PollVoteSchema)
};