import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import {createClient, getClientById, updateClient, deleteClient, getClientByName} from '../helpers/general'
import request from 'supertest'

describe('Create client', () => {
  describe('Create client with only required credentials', () => {
    let response
    before(async () => {
      response = await createClient(
        faker.name.fullName(),
        faker.phone.number(),
        ''
      )
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
          description: 'new added',
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
      response = await createClient(
        '',
        faker.phone.number(),
        faker.internet.email()
      )
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(400)
    })

    it('Response body returns correct message Client create error', () => {
      expect(response.body.message).to.eq('Client create error')
    })
  })

  describe('Create client with empty phone field', () => {
    // баг - клинт не должен быть создан. Обязательные поля - имя и телефон
    let response
    before(async () => {
      response = await createClient(
        faker.name.fullName(),
        '',
        faker.internet.email()
      )
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
      response = await createClient(
        faker.name.fullName(),
        faker.phone.number(),
        ''
      )
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
describe('Get client by id', () => {
  describe('Get client by correct id', () => {
    let response, clientId
    const clientName = faker.name.fullName()
    const clientPhone = faker.phone.number()
    const clientEmail = faker.internet.email()

    before(async () => {
      clientId = (await createClient(clientName, clientPhone, clientEmail)).body
        .payload
      response = await getClientById(clientId)
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body return correct message Get Client by id ok', () => {
      expect(response.body.message).to.eq('Get Client by id ok')
    })

    it('Response body returns correct client id', () => {
      expect(response.body.payload._id).to.eq(clientId)
    })

    it('Response body returns correct client name', () => {
      expect(response.body.payload.name).to.eq(clientName)
    })

    it('Response body returns correct client phone', () => {
      expect(response.body.payload.phone).to.eq(clientPhone)
    })

    it('Response body returns correct client email', () => {
      expect(response.body.payload.email).to.eq(clientEmail)
    })
  })

  describe('Get client by incorrect id', () => {
    let response
    before(async () => {
      response = await getClientById('6461f8a98f1e783e12d94cb3')
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })

    it('Response body return correct message No client for provided id', () => {
      expect(response.body.message).to.eq('No client for provided id')
    })
  })

  describe('Get client by invalid id syntax', () => {
    let response
    before(async () => {
      response = await getClientById('000000')
    })

    it('Response status code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })

    it('Response body return correct message Client get error', () => {
      expect(response.body.message).to.eq('Client get error')
    })
  })
})
describe('Get client by name', () => {
  describe('Get client by correct name', () => {
    let response
    const clientName = faker.name.fullName()

    before(async () => {
      await createClient(clientName, faker.phone.number(), faker.internet.email())
      response = await getClientByName(clientName)
      console.log(response.body)
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body return correct message Get ClientSearch ok', () => {
      expect(response.body.message).to.eq('ClientSearch ok')
    })

    it('Response body returns correct number of found clients', () => {
      expect(response.body.payload.pager.itemsCount).eq(1)
    })
  });
});
describe('Get all clients', () => {
  let response
  before(async () => {
    response = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .set('Authorization', process.env.TOKEN)
    //console.log(response.body)
  })

  it('Response status code is 200', () => {
    expect(response.statusCode).to.eq(200)
  })

  it('Response body returns correct message ClientSearch ok', () => {
    expect(response.body.message).to.eq('ClientSearch ok')
  })

  it('Response body returns more than 1 clients', () => {
    expect(response.body.payload.items.length).to.be.gt(1)
  });
})
describe('Update client', () => {
  let clientId
  let res
  const clientName = 'Anna Brown'
  const clientPhone = '555555'
  let response
  let getClientRes

  before( async () => {
    clientId = (await createClient(faker.name.fullName(), faker.phone.number(), faker.internet.email())).body.payload
    res = await getClientById(clientId)
    response = await updateClient(clientName, clientPhone, clientId)
    getClientRes = await getClientById(clientId)

    console.log(res.body, clientName, clientPhone, clientId)
    console.log(getClientRes.body)
  });

  it('Response status code is 200', () => {
    expect(response.statusCode).to.eq(200)
  });

  it('Response message is Client updated', () => {
    expect(response.body.message).to.eq('Client updated')
  });

  // it('Varify the updated client name', () => {
  //   expect(getClientRes.body.payload.name).to.eq(clientName)
  // });
  //
  // it('Validaterify the updated client phone', () => {
  //   expect(getClientRes.body.payload.phone).to.eq(clientPhone)
  // });
});

describe('Delete client ', () => {
  describe('Delete client with valid id', () => {
    let clientId
    let response
    let getClientRes
    before(async () => {
      clientId = (await createClient(faker.name.fullName(), faker.phone.number(), faker.internet.email())).body.payload
      response = await deleteClient(clientId)
      getClientRes = await  getClientById(clientId)
    });

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body returns correct message Client created', () => {
      expect(response.body.message).to.eq('Client deleted')
    })

    it('Varify that client was deleted', () => {
      expect(getClientRes.body.message).to.eq('No client for provided id')
    });
  });

  describe('Delete client with invalid id', () => {
    let clientId = '64251a961c1ebf7414544829'
    let response
    before(async () => {
      response = await deleteClient(clientId)
    });

    it('Response status code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })

    it('Response body returns correct message Client created', () => {
      expect(response.body.message).to.eq('Client not found')
    })
  });

  describe('Delete client with no id', () => {
    let response
    before(async () => {
      response = await deleteClient('')
    });

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })

    it('Response body returns correct message Client created', () => {
      expect(response.body.message).to.eq('API not found')
    })
  });
});