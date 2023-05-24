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
function getAllClients(){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 40})
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
function createVendor (name){
    return request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({name})
        .set('Authorization', process.env.TOKEN)
}
function getVendorById (vendorId){
    return request(process.env.BASE_URL)
        .get(`/v5/vendor/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}
function getVendorByName (vendorName){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .send({name: vendorName})
        .set('Authorization', process.env.TOKEN)
}
function getAllVendors(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 40})
}

export {login, registration, createClient, getAllClients,getClientById, updateClient, deleteClient, getClientByName,
createVendor, getVendorById, getVendorByName,getAllVendors}
