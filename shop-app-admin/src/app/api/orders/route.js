import { connect } from '@/config/mongoose';
import Order from '@/models/Order.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Get all orders
export async function GET(req, res) {
    try {
        // get all orders
        const orders = await Order.find().sort({createdAt:-1});

        // Return orders
        return NextResponse.json(orders);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}