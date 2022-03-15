import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app } from '../app';

declare global {
   var signIn: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
global.signIn = async () => {
    const email = 'test@test.com';
    const password = 'password'

    const response = await request(app)
        .post('/api/users/signUp')
        .send({ email, password })
        .expect(201)
    
    const cookie = response.get("Set-Cookie");

    return cookie;
}