const mongoose = require('mongoose');
// Define URL Schema
const urlSchema = new mongoose.Schema({
  Category: String,
  BigUrl: String,
  ShortId: String,
  shortUrl:String,
  count:Number,
  createdAt: { type: Date, default: Date.now }
});

const urlModel = mongoose.model("URL", urlSchema);
module.exports = {
  urlModel
}