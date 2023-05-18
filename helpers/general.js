import request from "supertest";

function login (email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email, password })
}
function registration (companyName, firstName, lastName, email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ companyName, firstName, lastName, email, password })
}
function createClient (name, phone, email){
    return request(process.env.BASE_URL)
        .post('/v5/client')
        .send({name, phone, email})
        .set('Authorization', process.env.TOKEN)
}
function getClientById (clientId){
    return request(process.env.BASE_URL)
        .get(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}
function getClientByName (clientName){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .send({name: clientName})
        .set('Authorization', process.env.TOKEN)
}
function updateClient(clientName, clientPhone, clientId){
    return request(process.env.BASE_URL)
        .patch(`/v5/client/${clientId}`)
        .send({name: clientName, phone: clientPhone})
        .set('Authorization', process.env.TOKEN)
}
function deleteClient(clientId){
    return request(process.env.BASE_URL)
        .delete(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}

export {login, registration, createClient, getClientById, updateClient, deleteClient, getClientByName}
