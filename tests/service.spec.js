import {faker} from "@faker-js/faker";
import {expect} from "chai";
import { vendor, service } from '../helpers'

describe('Service', () => {
    describe('Create service', () => {
        describe('Create service with only required credentials', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Service created', () => {
                expect(response.body.message).to.eq('Service created')
            })

            it('Response body returns vendor id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create service with all fields filled out', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createServiceWithAllInfo(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price(), faker.commerce.productDescription())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Service created', () => {
                expect(response.body.message).to.eq('Service created')
            })

            it('Response body returns vendors id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create service with empty name field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService('', vendorId, faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty vendorId', () => {
            let response

            before(async () => {
                response = await service.createService(faker.company.bsNoun(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty vendorPrice field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty clientPrice field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with all fields is being empty', () => {
            let response
            before(async () => {
                response = await service.createService ()
            })
            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })
    })

    describe('Get service by id', () => {
        describe('Get service by correct id', () => {
            let response, vendorId, serviceId
            const serviceName = faker.company.bsNoun()
            const vendorPrice = faker.commerce.price()
            const clientPrice = faker.commerce.price()

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                serviceId = (await service.createService(serviceName, vendorId, vendorPrice, clientPrice)).body.payload
                response = await service.getServiceById(serviceId)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service by id ok', () => {
                expect(response.body.message).to.eq('Get Service by id ok')
            })

            it('Response body returns correct service id', () => {
                expect(response.body.payload._id).to.eq(serviceId)
            })

            it('Response body returns correct service name', () => {
                expect(response.body.payload.name).to.eq(serviceName)
            })

            it('Response body returns correct vendorPrice', () => {
                expect(response.body.payload.vendorPrice).to.eq(Number(vendorPrice))
            })

            it('Response body returns correct clientPrice', () => {
                expect(response.body.payload.clientPrice).to.eq(Number(clientPrice))
            })
        })

        describe('Get service by incorrect id', () => {
            let response
            before(async () => {
                response = await service.getServiceById('6461f8a98f1e783e12d94cb3')
            })

            it('Response status code is 404', () => {
                expect(response.statusCode).to.eq(404)
            })

            it('Response body return correct message No service for provided id', () => {
                expect(response.body.message).to.eq('No service for provided id')
            })
        })

        describe('Get service by invalid id syntax', () => {
            let response
            before(async () => {
                response = await service.getServiceById('000000')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body return correct message Service get error', () => {
                expect(response.body.message).to.eq('Service get error')
            })
        })
    })

    describe.only('Get service by name', () => {
        describe('Get service by correct name', () => {
            let response
            let vendorId
            const serviceName = faker.company.bsNoun()
            const vendorName = faker.name.fullName()

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                await service.createService(serviceName, vendorId, faker.commerce.price(), faker.commerce.price())
                response = await service.getServiceByName(serviceName)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service Search ok', () => {
                expect(response.body.message).to.eq('Service Search ok')
            })

            it('Response body returns correct number of found services in itemCount', () => {
                expect(response.body.payload.pager.itemsCount).eq(1)
            })

            it('Response body returns correct number of found services in items', () => {
                expect(response.body.payload.items.length).eq(1)
            })
        })

        describe('Get service by incorrect name', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())
                response = await service.getServiceByName('wrong name')
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service Search ok', () => {
                expect(response.body.message).to.eq('Service Search ok')
            })

            it('Response body returns correct number of found vendors in itemCount', () => {
                expect(response.body.payload.pager.itemsCount).eq(0)
            })

            it('Response body returns correct number of found vendors in items', () => {
                expect(response.body.payload.items.length).eq(0)
            })
        })
    })
});