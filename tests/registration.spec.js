import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'
import { faker } from '@faker-js/faker'

describe('Register/create new user', () => {
  describe.only('Register/create new user with valid credentials', () => {
    let response
    let companyName = faker.company.name()
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = 'user_' + Date.now() + '@gmail.com'
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ companyName, firstName, lastName, email, password })
    })
    //console.log(companyName, firstName, lastName, email, password)
    it('Response status code is 201', () => {
      expect(response.statusCode).to.eq(201)
    })
    it('Response status message is User created successfully. Please check your email and verify it', () => {
      expect(response.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })

  describe('Register/create new user with missing company name', () => {
    let response
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.name.lastName() + '@gmail.com'
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ firstName, lastName, email, password })
    })
    it('Response status code is 201', () => {
      expect(response.statusCode).to.eq(201)
    })
    it('Response status message is User created successfully. Please check your email and verify it', () => {
      expect(response.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })

  describe('Register/create new user with missing first name', () => {
    let response
    let lastName = faker.name.lastName()
    let email = faker.name.lastName() + '@gmail.com'
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ lastName, email, password })
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response status message is User was not created', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })

  describe('Register/create new user with missing last name', () => {
    let response
    let firstName = faker.name.firstName()
    let email = faker.name.lastName() + '@gmail.com'
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ firstName, email, password })
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response status message is User was not created', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })

  describe('Register/create new user with missing email', () => {
    let response
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ firstName, lastName, password })
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response status message is User was not created', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })

  describe('Register/create new user with missing password', () => {
    let response
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.name.lastName() + '@gmail.com'
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ firstName, lastName, email })
    })

    it('Response status code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response status message is Wrong password format', () => {
      expect(response.body.message).to.eq('Wrong password format')
    })
  })

  describe('Register/create new user with existing email', () => {
    let response
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let password = faker.word.adjective()
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ firstName, lastName, email: process.env.EMAIL, password })
    })

    it('Response status code is 409', () => {
      expect(response.statusCode).to.eq(409)
    })
    it('Response status message is User with this e-mail exists', () => {
      expect(response.body.message).to.eq('User with this e-mail exists')
    })
  })
})