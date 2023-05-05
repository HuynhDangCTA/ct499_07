const mongoose = require("mongoose");
// dinh nghia cac truogn trong csdl
const postSchema = mongoose.Schema({
  name: String,
  category: String,
  content: String,
  gender: String,
  image: String,
  date: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
