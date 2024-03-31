import {connect} from '@/config/mongoose';
import User from '@/models/User.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// connects to the database
connect();

export async function POST(req, res) {
    // Get input data
    const { name, email, password } = await req.json();

    try {
        // Verify no empty fields
        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });

        // Save user to db
        await user.save();

        // Return success message
        return NextResponse.json({ message: "User created successfully" }, user, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}