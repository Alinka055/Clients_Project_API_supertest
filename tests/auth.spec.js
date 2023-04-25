import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Authorization test', () => {
  describe('Authorization with valid credentials', () => {
      let response
      before(async () => {
          response = await request(process.env.BASE_URL)
              .post('/v5/user/login')
              .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
      })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message',  () => {
      expect(response.body.message).to.eq('Auth success')
    })
    it('Response body returns token', () => {
      expect(response.body.payload.token).to.be.a('string')
    })
  })

  describe('Authorization with invalid email', () => {
    let response
    before(async () => {
      response = await request(process.env.BASE_URL)
          .post('/v5/user/login')
          .send({ email: 'forest@bear.com', password: 123123 })
    })
    it('Response body returns code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message',() => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization with invalid password', () => {
    let response
    before(async () => {
      response = await request('https://clientbase-server.herokuapp.com')
          .post('/v5/user/login')
          .send({ email: 'forest@owner.com', password: '5555' })
    })
    it('Response body returns code is 400',() => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message',() => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without email', () => {
    let response
    before(async () => {
      response = await request('https://clientbase-server.herokuapp.com')
          .post('/v5/user/login')
          .send({ password: '123123' })
    })
    it('Response body returns code is 400',() => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without password', () => {
    let response
    before(async () => {
      response = await request('https://clientbase-server.herokuapp.com')
          .post('/v5/user/login')
          .send({ email: 'forest@owner.com' })
    })
    it('Response body returns code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without any credentials', () => {
    let response
    before(async () => {
      response = await request('https://clientbase-server.herokuapp.com')
          .post('/v5/user/login')
    })
    it('Response body returns code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })
})