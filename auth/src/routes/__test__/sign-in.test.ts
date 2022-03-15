import request from "supertest";
import { app } from "../../app";

it(`fails when a email that does not exist`, async () => {
    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it(`fails when an incorrect password is supplied`, async () => {
    await request(app)
        .post('/api/users/signUp')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'password1'
        })
        .expect(400);
});

it(`response with a cookie when given a valid credentials`, async () => {
    await request(app)
        .post('/api/users/signUp')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    
    const response = await request(app)
        .post('/api/users/signIn')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});