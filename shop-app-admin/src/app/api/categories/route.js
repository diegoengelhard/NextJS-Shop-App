import {connect} from '@/config/mongoose';
import Category from '@/models/Category.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Create a new category
export async function POST(req, res) {
    try {
        // Get input data
        const { name, parentCategory } = await req.json();

        // Verify no empty fields
        if (!name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create new category
        const category = new Category({ 
            name,
            parent: parentCategory || undefined,
        });

        // Save category to db
        await category.save();

        return NextResponse.json({ message: "Category created successfully" }, category, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Get all categories
export async function GET(req, res) {
    try {
        // get all categories
        const categories = await Category.find().populate('parent', null, null, { strictPopulate: false })

        // Return categories
        return NextResponse.json(categories);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}