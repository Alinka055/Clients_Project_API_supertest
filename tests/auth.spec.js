import {expect} from "chai";
import request from 'supertest';

describe('Authorization test', () => {
    describe('Authorization with valid data', () => {

//console.log(response.body )
        it('Response status code is 200', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '123123'})
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message ', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '123123'})
            expect(response.body.message).to.eq('Auth success')
        })
    })
})