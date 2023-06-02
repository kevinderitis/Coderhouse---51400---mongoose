import mongoose from "mongoose";

const userCollection = 'usuarios';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

export const userModel = mongoose.model(userCollection, UserSchema)