import {connect} from '../../../config/mongoose';
import Product from '../../../models/Product.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req, res) {
    try{
        const { title, description, price } = await req.json();

        if (!title || !description || !price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const product = new Product({ 
            title, description, price 
        });

        await product.save();

        return NextResponse.json({message: "Product created successfully"}, product, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}