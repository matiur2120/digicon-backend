const mongoose = require('mongoose')
const cartProductSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('CartProduct', cartProductSchema);