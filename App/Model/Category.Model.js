const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
  parent_Id: {type: mongoose.Types.ObjectId, ref: "category"},
  title: {type: String, required: true},
  meta_title: {type: String, default: ""},
  slug: {type: String, required: true},
  content: {type: String}
});

module.exports = {
  CategoryModel: mongoose.model("category", CategorySchema)
}