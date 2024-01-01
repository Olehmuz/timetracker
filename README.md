# ITFIN clone

Contacts :<br/>
Oleh Muzychuk<br/>
<a href="mailto:olehmuz87@gmail.com">Email</a><br/>
<a href="https://t.me/alegmuz" target="_blank">Telegram</a>

# Tech Stack

Front-end: TypeScript, React, Redux toolkit

Back-end: TypeScript, Nest.js, MongoDB(CosmosDB), Mongoose, Swagger UI, Passport, Jest

Azure: Web App, Cosmos DB

<a href="https://itfin-react.azurewebsites.net/" target="_blank">Azure link(Front-end)</a>
<a href="https://itfin-back.azurewebsites.net/" target="_blank">Azure link(API)</a>

<a href="https://miro.com/app/board/uXjVMAa76Ek=/?share_link_id=503285943783" target="_blank">Description of the architecture and infrastructure used in the project.</a>

### Link to front-end Project
<a href="https://github.com/Olehmuz/timetracker-front-end" target="_blank">ITFIN-clone front-end repository</a>

# How to run a project on localhost 
### To start server
Install dependencies `npm ci`
Start with `npm run dev`
### Environment variable that you have to provide

* PORT : The port on which the application will run
* MONGODB_URI : MongoDB URI that gives access to your database
* SECRET_JWT_ACCESS_TOKEN : Secret phrase for your access token
* SECRET_JWT_REFRESH_TOKEN : Secret phrase for your refresh token
* SALT : Salt for bcrypt
* DEFAULT_ACTIVE_PROJECT_ID: Default active project id
* DEFAULT_ACTIVE_POSITION_ID: Default active position id
* VACATION_DAYS_PER_MONTH: Count of vacation days given by month

# Decomposition of project tasks
### Main functionality

- [x] Tracking system
- [x] Salary calculator
- [x] Vacation calculator
### Layout 

- [x] Profile page
- [x] Crew page
- [x] About page
- [x] Tracktime page
- [x] Header component

### Authorization
    
- [x] Backend auth service setup
    - [x] Refresh token generator
    - [x] Access token generator
- [x] Registration , login , logout functionality in auth service
- [x] Auth routes on server
- [x] Client-side connection with OAuth
- [x] Client-side auth handling
	- [x] axios interceptor setup
	- [x] Redux toolkit setup
	- [x] Protected rotes
### Database

- [x] Mongo DB
- [x] Create Azure Cosmos DB and connect it
- [x] Mongoose connection (ORM) 
- [x] User repository logic
- [x] Base repository
### Tests

- [x] Jest setup
- [x] Tracker alogorithm unit tests
	- [x] Vacation calculations 
	- [x] Sick leaves calculations 
	- [x] Salary calculations 
- [x] Postman collection for main API routes
### Azure

- [x] Azure web apps setup
- [x] Azure Cosmos DB setup
- [x] Aplication Insights
- [x] Deploy API to azure
	- [x] CI/CD for backend
- [x] Deploy Client-side to azure
	- [x] CI/CD for front-end
