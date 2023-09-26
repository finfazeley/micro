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