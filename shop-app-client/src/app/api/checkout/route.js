import { connect } from '@/config/mongoose';
import Product from '@/models/Product.model';
import Order from '@/models/Order.model';
import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

connect();

export async function POST(req, res) {
    try {
        // Get data
        const {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
        } = await req.json();

        // Obtain product ids from cart & delete duplicates
        const productsIds = [...new Set(cartProducts)];

        // Find products by ids
        const products = await Product.find({ _id: productsIds });

        // Map over each unique product ID
        const line_items = productsIds.map(productId => {
            // Find the product information for the current product ID
            const productInfo = products.find(p => p._id.toString() === productId);

            // Count the number of times the current product ID appears in the productsIds array
            // This gives us the quantity of this product in the cart
            const quantity = productsIds.filter(id => id === productId)?.length || 0;

            // If the quantity is greater than 0 and we found product information
            if (quantity > 0 && productInfo) {
                // Return a new cart item object
                return {
                    quantity, // The quantity of this product in the cart
                    price_data: {
                        currency: 'USD', // The currency of the price
                        product_data: { name: productInfo.title }, // The name of the product
                        unit_amount: quantity * productInfo.price * 100, // The total price for this quantity of product, in cents
                    },
                };
            }
            // If the quantity is 0 or we didn't find product information, don't return anything
            // This will result in undefined being added to the cartProducts array
        }).filter(Boolean); // Remove any undefined items from the cartProducts array

        // Create a new order
        const order = new Order({
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            line_items,
        });

        await order.save();

        // Create a new stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_URL}/success`,
            cancel_url: `${process.env.NEXT_URL}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}