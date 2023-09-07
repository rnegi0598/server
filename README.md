# API Documentation

## Authentication

### Register a User

Endpoint `POST /api/register`  
Register a new user.  
Request
```json
{
  "name": "john doe",
  "email": "john_doe@gmail.com",
  "password": "securepassword"
}
```

Response

- `200 OK`: User registered successfully.Returns the user.
```json
{
    "success": true,
    "message": "User registered successfully",
    "user":"new_user_object_here"
}
```
- `400 Bad Request` : Validation error
- `500 Internal Server Error` : Registration failed

### Login a User
Endpoint `POST /api/login`  
Log in with an existing user account.
Request 
```json
{
  "email": "john_doe@gmail.com",
  "password": "securepassword"
}
```  
Response   
- `200 OK`: Login successful. Returns an access token.
```json
{
    "success": true,
    "message": "User logged in successfully",
    "token":"your_access_token_here",
}
```
- `400 Bad Request`: Validation error
- `500 Internal Server Error`: Login failed

## User Profile

### Get Current User
Endpoint : `GET /api/user`  
Get information about the currently logged-in user.  
Response   
- `200 OK` : User information retrieved successfully.Returns the user.
```json
{
    "user":"user_here"
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error` : Unable to retrieve user.

## Loan Management

### Get All Loans for a User

Endpoint:` GET /api/user/loans`
Retrieve all loans for the currently logged-in user.

Response   
- `200 OK`: Loans retrieved successfully.Return loans array.
```json
{
   "success": true,
    "message": "Loans retrieved successfully",
    "loans": "loan_arr_here"
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`: Unable to retrieve loans.


### Create a Loan

Endpoint: `POST /api/user/loans`  
Create a new loan for the currently logged-in user.  
Request 
```json
{
  "type": "business",
  "amount": 2300,
  "term":2
}
```  
Response
- `200 OK`: Loan created successfully.
```json
{
   "success": true,
    "message":"Your loan application has been received and is pending approval"
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`: Loan creation failed.


### Get Loan Details
Endpoint: `GET /api/user/loans/:id`  
Retrieve details of a specific loan.  
Response   
- `200 OK`: Loan details retrieved successfully. Returns loan array.
```json
{
   "success": true,
    "message": "Loan retrieved successfully",
    "loan":"loan_array_here",
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`: Unable to retrieve loan details.

### Repay a Loan
Endpoint: `POST /api/user/loans/:id/repay`
Submit a repayment for a specific loan.  
Request 
```json
{
  "amount": 2300,
}
```  
Response
- `200 OK`: Loan repayment successful.Returns loan array.
```json
{
   "success":true,
    "message":"Loan repayment successful",
    "loan":"loan_arr_here"
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`: Loan repayment failed.


## Admin Access


### Get All Loans for Admin
Endpoint: `GET /api/admin/loans`   
Retrieve all loans for admin approval.

Response
- `200 OK`: Loan repayment successful. Returns loan array.
```json
{
   "success": true,
    "message": "Loans retrieved successfully",
    "loans":"loans_array_here",
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`: Unable to retrieve loans.

### Approve a Loan
Endpoint: `POST /api/admin/loans/:id/approve`
Approve a specific loan.   
Response
- `200 OK`: Loan approved successfully. Returns loan array.
```json
{
   "success": true, 
   "message": "Loan approved successfully",
    "loan":"loan_array_here"
}
```
- `401 Unauthorized` : User not authenticated.
- `500 Internal Server Error`:  Loan approval failed.