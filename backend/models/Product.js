const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  plantName: { type: String, required: true },
  userId: { type: String, required: true },/* { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, */
  condition: { type: String, required: true },
  price: { type: Number },
  comment: { type: String },
  createAt: { type: Date, default: Date.now, required: true },
  status: { type: Boolean, default: true, require: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model('Product', productSchema);