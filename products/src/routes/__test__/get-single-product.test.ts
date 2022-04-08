import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it(`returns 404 if the product is not found`, async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/products/${id}`)
        .send()
        .expect(404);
});

it(`returns the ticket if the ticket is found`, async () => {
    const response = await request(app)
        .post(`/api/products`)
        .set('Cookie', global.signIn())
        .send({
            title: 'product 1',
            price: 200
        })
        .expect(201);
    
    const productResponse = await request(app)
        .get(`/api/products/${response.body.id}`)
        .send()
        .expect(200);

    expect(productResponse.body.title).toEqual('product 1');
    expect(productResponse.body.price).toEqual(200);
});
