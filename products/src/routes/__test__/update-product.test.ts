import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it(`returns a 404 if the provided id does not exist`, async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
        await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signIn())
        .send({
            title: 'product 1',
            price: 20
        })
        .expect(404);
})

it(`returns a 401 if the user is not authenticated`, async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/products/${id}`)
        .send({
            title: 'product 1',
            price: 21
        })
        .expect(401);
})

it(`returns a 401 if the user does not own the ticket`, async () => {
    const response = await request(app)
        .post('/api/products')
        .set('Cookie', global.signIn())
        .send({
            title: 'product 2',
            price: 21
        });

    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', global.signIn())
        .send({
            title: 'new product',
            price: 22
        })
        .expect(401);

})

it(`returns a 400 if the user provides an invalid title or price`, async () => {
    
    const cookie = global.signIn();

    const response = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({
            title: 'product 2',
            price: 21
        });
    
    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 22
        })
        .expect(400);


    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new product',
            price: -22
        })
        .expect(400);



})

it(`update the product provided valid input`, async () => {
    const cookie = global.signIn();

    const response = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({
            title: 'product 2',
            price: 21
        });

    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'updated name',
            price: 200
        })
        .expect(200)

    const ticketResponse = await request(app)
        .get(`/api/products/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('updated name');
    expect(ticketResponse.body.price).toEqual(200);
})
