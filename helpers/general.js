import request from "supertest";
export {login, registration, createClient}

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