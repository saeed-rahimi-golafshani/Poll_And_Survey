const { default: mongoose } = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: {type: String, required: true},
  meta_title: {type: String, default: ""},
  slug: {type: String, required: true},
  content: {type: String}
});

module.exports = {
  TagModel: mongoose.model("tag", TagSchema)
}