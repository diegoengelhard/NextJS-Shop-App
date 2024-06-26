import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    properties: {
        type: Map,  // Using Map type for dynamic keys
        of: String  // Values are arrays of strings
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    photos: {
        type: Array,
        default: [],
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
});

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;