import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

it(`has a route listening to /api/products for post request`, async () => {
    const response = await request(app)
        .post('/api/products')
        .send({});

    expect(response.status).not.toEqual(400);
});

it(`can only be accessed if the user is signed in`, async () => {
    await request(app)
        .post('/api/products')
        .send({})
        .expect(401);
});

it(`return a status other then 401 if user is signed in`, async () => {
    const response = await request(app)
        .post('/api/products')
        .set('Cookie', global.signIn())
        .send({});

    expect(response.status).not.toEqual(401);
});

it(`returns an error if an invalid title is provided`, async () => {
    await request(app)
        .post('/api/products')
        .set('Cookie', global.signIn())
        .send({
            title: '',
            price: 20,
        })
        .expect(400)   
});

it(`returns an error if an invalid price is provided`, async () => {
    await request(app)
        .post('/api/products')
        .set('Cookie', global.signIn())
        .send({
            title: 'product one',
            price: -20,
        })
        .expect(400)   

});

it(`creates a produces with valid input`, async () => {
    let products = await Product.find({});

    expect(products.length).toEqual(0);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signIn())
        .send({
            title: 'product one',
            price: 20,
        })
        .expect(201)   
    
    products = await Product.find({});
    expect(products.length).toEqual(1);
    expect(products[0].title).toEqual('product one');
    expect(products[0].price).toEqual(20);
});
