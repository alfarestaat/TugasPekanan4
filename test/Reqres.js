const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require('dotenv').config()
chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)

describe("Test Get single users", function(){
    it("User can get single users", function(done){
        api.get("/api/users/5")
        .set('Content-Type', 'Application/json')
        .end(function(error, response){
            console.log(response.body)
            expect(response.status).to.equals(200)
            expect(response.body.data.id).to.equal(5); 
            expect(response.body.data.email).to.equal("charles.morris@reqres.in"); 
            expect(response.body.data.first_name).to.equal("Charles"); 
            expect(response.body.data.last_name).to.equal("Morris"); 
            expect(response.body.data.avatar).to.equal("https://reqres.in/img/faces/5-image.jpg"); 
            global.email = response.body.data.email;
            global.name = response.body.data.first_name+" "+response.body.data.last_name;
            done();
        })
    })   
})

describe("Test User Register", function(){
    it("User can register", function(done){
        api.post("/api/register")
        .set('Content-Type', 'Application/json')
        .send( {
            email: global.email,
            password: 'pistol'
        })
        .end(function(error, response){
            console.log(response.body)
            expect(response.status).to.equals(200)
            expect(response.body.id).to.equal(5); 
            done();
        })
    })   
})

describe("Test User Login", function(){
    it("User can login", function(done){
        api.post("/api/login")
        .set('Content-Type', 'Application/json')
        .send( {
            email: global.email,
            password: 'pistol'
        })
        .end(function(error, response){
            console.log(response.body)
            expect(response.status).to.equals(200)
            expect(response.body).to.have.a.property('token');
            done();
        })
    })   
})

describe("Test Create Users", function(){
    it("User can Create Users", function(done){
        api.post("/api/users")
        .set('Content-Type', 'Application/json')
        .send( {
            name: global.name,
            job: 'QA Engineer'
        })
        .end(function(error, response){
            console.log(response.body)
            expect(response.status).to.equals(201)
            expect(response.body.name).to.equal("Charles Morris"); 
            expect(response.body.job).to.equal("QA Engineer"); 
            global.id = response.body.id
            done();
        })
    })   
})

describe("Test Update Users", function(){
    it("User can Update Users", function(done){
        api.put("/api/users/"+global.id)
        .set('Content-Type', 'Application/json')
        .send( {
            name: global.name+" Update",
            job: 'QA Engineer Update'
        })
        .end(function(error, response){
            console.log(response.body)
            expect(response.status).to.equals(200)
            expect(response.body.name).to.equal("Charles Morris Update"); 
            expect(response.body.job).to.equal("QA Engineer Update"); 
            done();
        })
    })   
})
