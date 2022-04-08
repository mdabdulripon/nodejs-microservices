import request from 'supertest';
import { app } from '../../app';

const createProduct = (title: string, price: number) => {
    return request(app)
        .post(`/api/products`)
        .set('Cookie', global.signIn())
        .send({
            title: title,
            price: price
        });
}

it(`can fetch all the products`, async () => {
    await createProduct('shirt', 120);
    await createProduct('pant', 80);
    await createProduct('shoe', 180);

    const response = await request(app)
        .get(`/api/products`)
        .send()
        .expect(200);
    
    expect(response.body.length).toEqual(3);

});

