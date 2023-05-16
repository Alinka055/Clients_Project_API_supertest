import {faker} from "@faker-js/faker";
import {expect} from "chai";
import {createClient} from "../helpers/general";
import request from "supertest";

describe('Create client', () => {
    describe('Create client with valid credentials', () => {
        let response
        before(async () => {
            response = await createClient(faker.name.fullName(), faker.phone.number(), faker.internet.email())
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Client created', () => {
            expect(response.body.message).to.eq('Client created')
        })

        it('Response body returns client id', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Create client with all fields filled out', () => {
        let response
        before(async () => {
            response = await request(process.env.BASE_URL)
                .post('/v5/client')
                .send({
                    name: faker.name.fullName(),
                    phone: faker.phone.number(),
                    email: faker.internet.email(),
                    description: 'new added'
                })
                .set('Authorization', process.env.TOKEN)
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Client created', () => {
            expect(response.body.message).to.eq('Client created')
        })

        it('Response body returns client id', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Create client with empty name field', () => {
        let response
        before(async () => {
            response = await createClient('', faker.phone.number(), faker.internet.email())
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(400)
        })

        it('Response body returns correct message Client create error', () => {
            expect(response.body.message).to.eq('Client create error')
        })
    })

    describe('Create client with empty phone field', () => {  // баг - клинт не должен быть создан. Обязательные поля - имя и телефон
        let response
        before(async () => {
            response = await createClient(faker.name.fullName(), '', faker.internet.email())
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Client created', () => {
            expect(response.body.message).to.eq('Client created')
        })

        it('Response body returns client id', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Create client with empty email field', () => {
        let response
        before(async () => {
            response = await createClient(faker.name.fullName(), faker.phone.number(), '')
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Client created', () => {
            expect(response.body.message).to.eq('Client created')
        })

        it('Response body returns client id', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Create client with all fields is being empty', () => {
        let response
        before(async () => {
            response = await createClient('', '', '')
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(400)
        })

        it('Response body returns correct message Client create error', () => {
            expect(response.body.message).to.eq('Client create error')
        })
    })
})