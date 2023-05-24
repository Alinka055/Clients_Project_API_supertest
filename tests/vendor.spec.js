import {
  createVendor,
  getVendorById,
  getVendorByName, getAllVendors,
} from '../helpers/general'
import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import request from 'supertest'

describe('Vendor', () => {
  describe('Create vendor', () => {
    describe('Create vendor with only required credentials', () => {
      let response
      const vendorNane = faker.name.fullName()

      before(async () => {
        response = await createVendor(vendorNane)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message vendor created', () => {
        expect(response.body.message).to.eq('Vendor created')
      })

      it('Response body returns vendor id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create vendor with all fields filled out', () => {
      let response
      const vendorNane = faker.name.fullName()
      const vendorPhone = faker.phone.number()
      const vendorEmail = faker.internet.email()
      const vendorDescription = faker.company.name()

      before(async () => {
        response = await request(process.env.BASE_URL)
          .post('/v5/vendor')
          .send({
            name: vendorNane,
            phone: vendorPhone,
            email: vendorEmail,
            description: vendorDescription,
          })
          .set('Authorization', process.env.TOKEN)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message vendor created', () => {
        expect(response.body.message).to.eq('Vendor created')
      })

      it('Response body returns vendors id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create vendor with empty name field', () => {
      let response
      const vendorPhone = faker.phone.number()
      const vendorEmail = faker.internet.email()
      const vendorDescription = faker.company.name()

      before(async () => {
        response = await request(process.env.BASE_URL)
          .post('/v5/vendor')
          .send({
            name: '',
            phone: vendorPhone,
            email: vendorEmail,
            description: vendorDescription,
          })
          .set('Authorization', process.env.TOKEN)
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Vendor create error', () => {
        expect(response.body.message).to.eq('Vendor create error')
      })
    })

    describe('Create vendor with all fields is being empty', () => {
      let response
      before(async () => {
        response = await createVendor('')
      })
      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Vendor create error', () => {
        expect(response.body.message).to.eq('Vendor create error')
      })
    })
  })

  describe('Get vendor by id', () => {
    describe('Get vendor by correct id', () => {
      let response, vendorId
      const vendorName = faker.name.fullName()

      before(async () => {
        vendorId = (await createVendor(vendorName)).body.payload
        response = await getVendorById(vendorId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get Vendor by id ok', () => {
        expect(response.body.message).to.eq('Get Vendor by id ok')
      })

      it('Response body returns correct vendor id', () => {
        expect(response.body.payload._id).to.eq(vendorId)
      })

      it('Response body returns correct vendor name', () => {
        expect(response.body.payload.name).to.eq(vendorName)
      })
    })

    describe('Get vendor by incorrect id', () => {
      let response
      before(async () => {
        response = await getVendorById('6461f8a98f1e783e12d94cb3')
      })

      it('Response status code is 404', () => {
        expect(response.statusCode).to.eq(404)
      })

      it('Response body return correct message No vendor for provided id', () => {
        expect(response.body.message).to.eq('No vendor for provided id')
      })
    })

    describe('Get vendor by invalid id syntax', () => {
      let response
      before(async () => {
        response = await getVendorById('000000')
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body return correct message Vendor get error', () => {
        expect(response.body.message).to.eq('Vendor get error')
      })
    })
  })

  describe('Get vendor by name', () => {
    describe('Get vendor by correct name', () => {
      let response
      const vendorName = faker.name.fullName()

      before(async () => {
        await createVendor(vendorName)
        response = await getVendorByName(vendorName)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get VendorSearch ok', () => {
        expect(response.body.message).to.eq('VendorSearch ok')
      })

      it('Response body returns correct number of found vendors in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(1)
      })

      it('Response body returns correct number of found vendors in items', () => {
        expect(response.body.payload.items.length).eq(1)
      })
    })

    describe('Get vendor by incorrect name', () => {
      let response

      before(async () => {
        await createVendor(faker.name.fullName())
        response = await getVendorByName('AAAAA')
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get VendorSearch ok', () => {
        expect(response.body.message).to.eq('VendorSearch ok')
      })

      it('Response body returns correct number of found vendors in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(0)
      })

      it('Response body returns correct number of found vendors in items', () => {
        expect(response.body.payload.items.length).eq(0)
      })
    })
  })

  describe('Get all vendors', () => {
    let response
    before(async () => {
      response = await getAllVendors()
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body returns correct message VendorSearch ok', () => {
      expect(response.body.message).to.eq('VendorSearch ok')
    })

    it('Response body returns more than 1 vendors', () => {
      expect(response.body.payload.items.length).to.be.gt(1)
    })
  })
})
