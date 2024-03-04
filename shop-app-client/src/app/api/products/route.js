import { connect } from '@/config/mongoose';
import Product from '@/models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

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