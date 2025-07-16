


import mongoose from 'mongoose';




const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Product name required to proceed.']
    },

    description: {
        type: String,
        required: [true, 'Product description needed.']
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price field is empty.  Guess it`s free...']
    },

    category: {
        type: String,
        required: [true, 'Category needed for product.']
    },

    inStock: {
        type: Boolean,
        default: true
    },

    tags: [String],

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;