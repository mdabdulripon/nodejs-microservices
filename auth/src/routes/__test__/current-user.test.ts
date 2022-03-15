import request from "supertest";
import { app } from "../../app";


it(`responds with details about the current users`, async () => {
    
    const authResponse = await request(app)
        .post('/api/users/signUp')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
});
