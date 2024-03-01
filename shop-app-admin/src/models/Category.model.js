import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
});

const Category = models.Category || mongoose.model("Category", categorySchema);
export default Category;