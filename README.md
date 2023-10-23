# Trade Cars

## Submission

URL of website: https://tradecars.onrender.com/

Exposed API:

Fault tolerance/error handling features implemented in your system:
- User must be logged in to:
    - Purchase
    - Sell
    - Change password
    - Logout
- Changing password:
    - Need to type correct email
    - Must have valid token and userID to view change password screen
- Sell Car
    - Car will not be listed if invalid user

The test cases for frontend and the test scripts (e.g. a list of CURL commands / POSTMAN Requests) for the server end of your web application / service:
1. Register a new user: 
    Command: curl -X POST -H "Content-Type: application/json" -d '{"username":"curlTest","password":"SecurePassword123","email":"curltest@test.com"}' https://tradecars.onrender.com/register; echo

2. Login with the new user: 
    Command:  curl -X POST -H "Content-Type: application/json" -d '{"email":"stu_zhang@example.com","password":"SecurePassword123"}' https://tradecars.onrender.com/login; echo

    Output: Something like {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NjE0ODgsImV4cCI6MTY5NTg2NTA4OH0.hvlqMqk9OSxGO0MrBa7xPLvTBx5yc8UviQXmk3BTIMU"}

3. Copy the token from the response of the login request and use it to access the protected route: 
    Command: curl -H "Authorization: Bearer <token>" https://tradecars.onrender.com/protected; echo

    Example: curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NTk2MjksImV4cCI6MTY5NTg2MzIyOX0.36m_RUvp_F6m7Oq-mt9RAz6FNeiEDPFCgXnFxZT4ids" https://tradecars.onrender.com/protected; echo

4. Logout: 
    Command: curl -X POST -H "Authorization: Bearer <token>" https://tradecars.onrender.com/logout; echo

    Example: curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NTk2MjksImV4cCI6MTY5NTg2MzIyOX0.36m_RUvp_F6m7Oq-mt9RAz6FNeiEDPFCgXnFxZT4ids" https://tradecars.onrender.com/logout; echo

5. Add a new car listing:
    Command: curl -X POST --cookie "token=<token>" -H "Content-Type: application/json" -d '{"make":"testMake","model":"testModel","year":2000,"mileage":10000,"description":"test desc","price":5000}' https://tradecars.onrender.com/addcar


The test cases for verifying the correct use of caching related HTTP headers and the corresponding test results:

### A summary of your database design:

### Users Table

This table contains information about the users of the system.

| Field     | Type         | Description                  |
|-----------|--------------|------------------------------|
| user_id   | String       | (Primary Key) Unique identifier for the user, can be an email. |
| username  | String       | Username of the user.         |
| password  | String       | Password of the user.         |
| email     | String       | Email address of the user.   |
| purchased | Array        | Previous purchases of the user |

#### Relationships

- One-to-Many with the Cars table through user_id.


### Cars Table

This table contains information about the cars associated with the users.

| Field       | Type          | Description                   |
|-------------|---------------|-------------------------------|
| car_id      | String        | (Primary Key) Unique identifier for the car.|
| user_id     | String        | (Foreign Key) Identifier for the associated user. Links to Users table. |
| make        | String        | Make of the car.              |
| model       | String        | Model of the car.             |
| year        | Integer       | Manufacturing year of the car.|
| mileage     | Integer       | Mileage of the car.           |
| description | Text          | Description of the car.       |
| price       | Decimal       | Price of the car.             |

#### Relationships

- Many-to-One with the Users table through user_id.



## Getting started

Use the following commands to set up dev environment:

1. If you have ssh key uploaded to GitLab:  
`git clone git@gitlab.ecs.vuw.ac.nz:nwen304_group/trade-cars.git`  
else:  
`git clone https://gitlab.ecs.vuw.ac.nz/nwen304_group/trade-cars.git`  

2. Inside cloned repository, install node modules:  
`npm ci`  
OR  
`npm install`  
I recommend using `npm ci` because this will install the exact package versions specified in package-lock.json. `npm install` will install the latest versions and this can sometimes break the app, only use this if `npm ci` for some reason does not work, or if you want to add a new package.  

3. `node index.js` to run server






## Testing

### Test Authentication

#### 1. Register a new user: 
    Command: curl -X POST -H "Content-Type: application/json" -d '{"username":"stu_zhang","password":"SecurePassword123","email":"stu_zhang@example.com"}' http://localhost:5001/register; echo

#### 2. Login with the new user: 
    Command:  curl -X POST -H "Content-Type: application/json" -d '{"email":"stu_zhang@example.com","password":"SecurePassword123"}' http://localhost:5001/login; echo

    Output: Something like {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NjE0ODgsImV4cCI6MTY5NTg2NTA4OH0.hvlqMqk9OSxGO0MrBa7xPLvTBx5yc8UviQXmk3BTIMU"}

#### 3. Copy the token from the response of the login request and use it to access the protected route: 
    Command: curl -H "Authorization: Bearer <token>" http://localhost:5001/protected; echo

    Example: curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NTk2MjksImV4cCI6MTY5NTg2MzIyOX0.36m_RUvp_F6m7Oq-mt9RAz6FNeiEDPFCgXnFxZT4ids" http://localhost:5001/protected; echo

#### 4. Logout: 
    Command: curl -X POST -H "Authorization: Bearer <token>" http://localhost:5001/logout; echo

    Example: curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTE0YzE5ZTk5YjZhZTg5NGI0ODQ3Y2MiLCJpYXQiOjE2OTU4NTk2MjksImV4cCI6MTY5NTg2MzIyOX0.36m_RUvp_F6m7Oq-mt9RAz6FNeiEDPFCgXnFxZT4ids" http://localhost:5001/logout; echo

### Test New Listing

#### 1. Add a new car listing:
    Command: curl -X POST --cookie "token=<token>" -H "Content-Type: application/json" -d '{"make":"testMake","model":"testModel","year":2000,"mileage":10000,"description":"test desc","price":5000}' http://localhost:5001/addcar