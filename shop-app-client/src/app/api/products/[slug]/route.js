import { connect } from '@/config/mongoose';
import Product from '@/models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request, { params }) {
    try {
        const id = params.slug;
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return NextResponse.error(new Error('Product not found'), { status: 404 });
        }
        return NextResponse.json({ product: product.toObject() });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}