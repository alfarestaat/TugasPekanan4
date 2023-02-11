# TugasPekanan4
Tugas Pekanan 4 - API Automation using Mocha Chai Supertest (Sanber Code - Alfaresta)
<br>
Recording execution script: https://drive.google.com/file/d/189C4rp6CGfDz-0RNwdsHr_vvTONEzbcr/view?usp=share_link
<br>
How to Run this repository:
1. Clone this repository
```
git clone https://github.com/alfarestaat/TugasPekanan4.git
```
2. Install npm with
```
npm install
```
3. Run mocha test
```
npm run test
```
<br>
I create (CRUD flow) with assert positive and negative scenario Product KasirAja using Mocha Chai Supertest.
<br>List scenario and test case:
<br>1. User Login: 
    <br>a. A user can log in with a valid email and password also can get information accessToken.
    <br>Expected Result: Access token can't to be a null. Also use response "accessToken" to be environment.
<br>2. Add Product: 
    <br>a. Positive: Using from environment "accessToken", a product can be added with a valid request payload. 
    <br>Expected Result: The response should have a status of 201. Also use response "productId" to be environment.
    <br>b. Negative: Using from environment "accessToken", User can't Add Product because Price must be greater than Cost. 
    <br>Expected Result: The response should have a status of 400.
<br>3. Get Product: 
    <br>a. Positive: Using from environment "accessToken" and "productId", a product can be retrieved by Product ID. 
    <br>Expected Result: Have property status, code, name, description, price, cost, cost_average, category_name, category_id, and stock at response.
    <br>b. Negative: Using from environment "accessToken", An error will be returned if a product id is not found. 
    <br>Expected Result: The response should have a message "id tidak valid".
<br>4. Update Product: 
    <br>a. Positive: Using from environment "accessToken" and "productId", a product can be updated with a valid request payload. 
    <br>Expected Result: The response should have a product name "Updated Produk Fares".
    <br>b. Negative: Using from environment "accessToken" and "productId", An error will be returned if a product cannot be updated because value 'category_id' is not String. 
    <br>Expected Result: The response should have a message "category_id must be a string".
<br>5. Delete Product: 
    <br>a. Positive: Using from environment "accessToken" and "productId", a product can be deleted. 
    <br>Expected Result: The response should have a status "success" and a message "Product berhasil dihapus".
    <br>b. Negative: Using from environment "accessToken" and "productId", An error will be returned if a product cannot be deleted. 
    <br>Expected Result: The response should have a message "id tidak valid".