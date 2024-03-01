import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
    parentCategory: { 
        type: String,
        unique: true,
        trim: true,
        default: 'N/A'
    }
});

const Category = models.Category || mongoose.model("Category", categorySchema);
export default Category;