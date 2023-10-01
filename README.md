# Trade Cars



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