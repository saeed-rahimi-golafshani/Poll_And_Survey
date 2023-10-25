const { default: mongoose } = require("mongoose");

const PollSchema = new mongoose.Schema({
  host_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
  title: {type: String, required: true},
  meta_title: {type: String},
  slug: {type: String},
  summery: {type: [String]},
  type: {type: String},
  published: {type: Boolean},
  createdAt: {type: String, required: true, default: ""},
  updatedAt: {type: String},
  publishedAt: {type: String},
  startAt: {type: String},
  endAt: {type: String},
  content: {type: String}
}, {
  toJSON: {virtuals: true}
});

module.exports = {
  PollModel: mongoose.model("poll", PollSchema)
};