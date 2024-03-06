import { connect } from '@/config/mongoose';
import Product from '@/models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req, res) {
    try {
        // Get product ids input data
        const { ids } = await req.json();

        // Get products from db
        const products = await Product.find({ _id: ids });

        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}