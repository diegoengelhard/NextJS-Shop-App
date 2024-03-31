import {connect} from '@/config/mongoose';
import User from '@/models/User.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Fetch all admin users
export async function GET(req, res) {
    try {
        // get all users: isAdmin = true
        const users = await User.find({ isAdmin: true });

        // Return users
        return NextResponse.json(users);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Update a user: toggle isAdmin
export async function PUT(req, res) {
    try {
        // Get user email
        const { email } = await req.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Toggle isAdmin
        if (user.isAdmin) {
            user.isAdmin = false;
        } else {
            user.isAdmin = true;
        }

        // Save user
        await user.save();

        // Return success message
        return NextResponse.json({ message: "User updated successfully" }, user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}