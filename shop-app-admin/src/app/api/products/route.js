import {connect} from '../../../config/mongoose';
import Product from '../../../models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Create a new product
export async function POST(req, res) {
    try{
        // Get input data
        const { title, description, price } = await req.json();

        // Verify no empty fields
        if (!title || !description || !price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create new product
        const product = new Product({ 
            title, description, price 
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
        // Get products from db
        const products = await Product.find();

        // Return products
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}