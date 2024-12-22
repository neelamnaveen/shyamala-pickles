import { Schema, Document } from 'mongoose';

export interface Service extends Document {
    typeOfService: string;
    image: string;
    description: string;
}

export const ServiceSchema = new Schema({
    typeOfService: { type: String },
    image: { type: String },
    description: { type: String },
});
