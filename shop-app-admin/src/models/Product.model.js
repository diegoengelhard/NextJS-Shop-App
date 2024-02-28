import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
});

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;