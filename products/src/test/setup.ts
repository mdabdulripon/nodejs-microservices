import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
   var signIn: () => string[];
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const c of collections) {
        await c.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});


// Add global methods || property of Node js
global.signIn = () => {
    // Build a JWT payload. {id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    
    // Build Session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that Session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take Json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // Return a string thats the cookie with the encoded data
    return [`session=${base64}`];
}