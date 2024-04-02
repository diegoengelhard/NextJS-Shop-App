import { connect } from '@/config/mongoose';
import Order from '@/models/Order.model';
import User from '@/models/User.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Get orders by user email
export async function POST(req, res) {
    try {
        // Get user email
        const { email } = await req.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get orders by user email
        const orders = await Order.find({ email });

        // Return orders
        return NextResponse.json(orders);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}