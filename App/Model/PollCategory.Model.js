const { default: mongoose } = require("mongoose");

const PollCategorySchema = new mongoose.Schema({
  poll_Id: {type: mongoose.Types.ObjectId, ref:"poll", required: true},
  category_Id: {type: mongoose.Types.ObjectId, ref: "category", required: true}
});

module.exports = {
  PollCategoryModel: mongoose.model("poll_category", PollCategorySchema)
}