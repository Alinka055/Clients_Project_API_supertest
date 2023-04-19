import {expect} from "chai";
import request from 'supertest';

describe('Authorization test', () => {
    describe('Authorization with valid credentials', () => {

//console.log(response.body )
        it('Response status code is 200', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '123123'})
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '123123'})
            expect(response.body.message).to.eq('Auth success')
        })
        it('Response body returns token', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '123123'})
            expect(response.body.payload.token).to.be.a('string')
        })
    })
    describe('Authorization with invalid email', () => {
        it('Response body returns code is 400', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@bear.com', password: 123123})
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns error message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@bear.com', password: '123123'})
            expect(response.body.message).to.eq('Auth failed')
        })
    })
    describe('Authorization with invalid password', () => {
        it('Response body returns code is 400', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '5555'})
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns error message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com', password: '5555'})
            expect(response.body.message).to.eq('Auth failed')
        })
    })
    describe('Authorization without email', () => {
        it('Response body returns code is 400', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({password: '123123'})
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns error message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({password: '123123'})
            expect(response.body.message).to.eq('Auth failed')
        })
    })
    describe('Authorization without password', () => {
        it('Response body returns code is 400', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com'})
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns error message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: 'forest@owner.com'})
            expect(response.body.message).to.eq('Auth failed')
        })
    })
    describe('Authorization without any credentials', () => {
        it('Response body returns code is 400', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns error message', async () => {
            let response = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
            expect(response.body.message).to.eq('Auth failed')
        })
    })
})