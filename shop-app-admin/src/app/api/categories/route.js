import { connect } from '@/config/mongoose';
import Category from '@/models/Category.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Create a new category
export async function POST(req, res) {
    try {
        // Get input data
        const { name, properties } = await req.json();

        // Verify no empty fields
        if (!name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create new category
        const category = new Category({
            name, properties
        });

        // Save category to db
        await category.save();

        return NextResponse.json({ message: "Category created successfully", category }, { status: 201 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}


// Get all categories
export async function GET(req, res) {
    try {
        // get all categories
        const categories = await Category.find();

        // Return categories
        return NextResponse.json(categories);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}