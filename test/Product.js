const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require('dotenv').config()

chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)

describe("Test User Login", function(){
    it("User can get AccessToken", function(done){
        api.post("/authentications")
        .set('Content-Type', 'Application/json')
        .send( {
            email: 'fares.tris@gmail.com',
            password: 'tokopedia123'
        })
        .end(function(error, response){
            expect(response.body.data.accessToken).to.not.be.null;
            global.token = response.body.data.accessToken;
            done();
        })
    })   
})

describe("Test Add Product", function(){
    it("User can Add Product", function(done){
        api.post("/products")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send( {
            category_id : '95f1ff73-d675-4a4a-8d32-768cdb94e343',
            code: 'A314ASDDFIER3432',
            name: 'Produk Fares',
            description:'Test Automation Product Fares',
            price: '7000',
            cost: '5000',
            stock: '7' 
        })
        .end(function(error, response){
            expect(response.status).to.equals(201)
            global.productids = response.body.data.productId;
            console.log(response.body)
            done();
        })
    }) 
    
    it("User can't Add Product because Price must be greater than Cost", function(done){
        api.post("/products")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send( {
            category_id : '95f1ff73-d675-4a4a-8d32-768cdb94e343',
            code: 'A314ASDDFIER3432',
            name: 'Produk Fares',
            description:'Test Automation Product Fares',
            price: '4000',
            cost: '5000',
            stock: '7' 
        })
        .end(function(error, response){
            expect(response.status).to.equals(400)
            done();
        })
    })   
})

describe("Test Get Product", function(){
    it("User can get product information that has been added", function(done){
        api.get("/products/"+global.productids)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .end(function(error, response){
            expect(response.body).to.have.a.property('status');
            expect(response.body.data.product).to.have.a.property('code'); 
            expect(response.body.data.product).to.have.a.property('name'); 
            expect(response.body.data.product).to.have.a.property('description'); 
            expect(response.body.data.product).to.have.a.property('price'); 
            expect(response.body.data.product).to.have.a.property('cost'); 
            expect(response.body.data.product).to.have.a.property('cost_average'); 
            expect(response.body.data.product).to.have.a.property('category_name'); 
            expect(response.body.data.product).to.have.a.property('category_id'); 
            expect(response.body.data.product).to.have.a.property('stock'); 
            done();
        })
    })

    it("User can't Get Product because 'ID Tidak Valid'", function(done){
        api.get("/products/wrongproductid")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .end(function(error, response){
            expect(response.body.message).to.equal('id tidak valid');           
            done();
        })
    })
})

describe("Test Update Product", function(){
    it("User can Update Product", function(done){
        api.put("/products/"+global.productids)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send( {
            category_id : '95f1ff73-d675-4a4a-8d32-768cdb94e343',
            code: 'A314ASDDFIER3432',
            name: 'Updated Produk Fares',
            description:'Test Automation Product Fares Updated',
            price: '5000',
            cost: '4000',
            stock: '7' 
        })
        .end(function(error, response){
            expect(response.body.data.name).to.equal('Updated Produk Fares'); 
            done();
        })
    })

    it("User can't Update Product because value 'category_id' is not String", function(done){
        api.put("/products/"+global.productids)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send( {
            category_id : 5,
            code: 'A314ASDDFIER3432',
            name: 'Updated Produk Fares',
            description:'Test Automation Product Fares Updated',
            price: '5000',
            cost: '4000',
            stock: '7' 
        })
        .end(function(error, response){
            expect(response.body.message).to.equal('\"category_id\" must be a string');             
            done();
        })
    })
})

describe("Test Delete Product", function(){
    it("User can Delete Product", function(done){
        api.delete("/products/"+global.productids)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .end(function(error, response){
            expect(response.body.status).to.equal('success'); 
            expect(response.body.message).to.equal('Product berhasil dihapus');            
            done();
        })
    })

    it("User can't Delete Product because 'ID tidak valid'", function(done){
        api.delete("/products/wrongproductid")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .end(function(error, response){
            expect(response.body.status).to.equal('fail'); 
            expect(response.body.message).to.equal('id tidak valid'); 
            done();
        })
    })
})
