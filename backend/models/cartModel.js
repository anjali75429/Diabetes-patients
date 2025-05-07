const { Schema, model } = require('../connection');

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'products' },
      name: { type: String, required: true },              
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },           
      image: { type: String, required: true }              
    }
  ],
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = model('cart', cartSchema);
