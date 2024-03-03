import {connect} from '../../../config/mongoose';
import Product from '../../../models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Create a new product
export async function POST(req, res) {
    try{
        // Get input data
        const { title, category, properties, description, photos, price } = await req.json();

        // Verify no empty fields
        if (!title || !category || !description || !price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create new product
        const product = new Product({ 
            title, category, properties, description, photos, price 
        });

        // Save product to db
        await product.save();

        // Return success message
        return NextResponse.json({message: "Product created successfully"}, product, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Get all products
export async function GET(req, res) {
    try {
        // get all products
        const products = await Product.find();

        // Return products
        return NextResponse.json(products);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Update a product
export async function PUT(req, res) {
    try {
        // Get input data
        const { _id, title, category, properties, description, photos, price } = await req.json();

        // Verify no empty fields
        if (!_id || !title || !category || !description || !price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Update product
        const product = await Product.findOneAndUpdate({ _id }, { title, category, properties, description, photos, price }, { new: true });

        // Return success message
        return NextResponse.json({ message: "Product updated successfully" }, product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, res) {
    try {
        // Get input data
        const { id } = await req.json();

        // Verify no empty fields
        if (!id) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if product exists
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Delete product
        await Product.deleteOne({ _id: id });

        // Return success message
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}