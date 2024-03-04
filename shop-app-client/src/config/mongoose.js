import mongoose from 'mongoose';

// Obtains MongoDB URI from environment variables
const mongodbUri = process.env.MONGODB_URI;

// Connects to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(mongodbUri);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = {
    connect
}