import { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
    contactNumber: { type: String },
}

export const UserSchema = new Schema({
    name: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
    contactNumber: { type: String },
});
