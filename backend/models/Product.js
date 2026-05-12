const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  brand:      { type: String, required: true },
  category:   { type: String, required: true },
  shortDesc:  { type: String },
  longDesc:   { type: String },
  specs:      [{ label: String, value: String }],
  dose:       { type: String },
  packaging:  { type: String },
  image:      { type: String },
  isNewProduct: { type: Boolean, default: false },
  inStock:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
