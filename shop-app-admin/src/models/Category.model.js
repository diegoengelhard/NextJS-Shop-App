import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
    parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    }
});

const Category = models.Category || mongoose.model("Category", categorySchema);
export default Category;