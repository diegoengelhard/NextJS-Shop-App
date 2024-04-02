import { connect } from '@/config/mongoose';
import Category from '@/models/Category.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

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