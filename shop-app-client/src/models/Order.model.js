import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
    },
    streetAddress: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
    },
    line_items: {
        type: Object,
        required: [true, "Cart products are required"],
    },
    total: {
        type: Number,
        required: [true, "Total is required"],
    },
    paid: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;