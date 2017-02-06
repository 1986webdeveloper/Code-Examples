This is very simple application using Node JS, React JS & MongoDb.

###A basic Login and account management system built in React.js with the following features:

* Create New user account
* View User profile
* Ability to Update Account
* Local Cookie Storage for Returning Users
* bcrypt Module for Password Encryption


###React-Login is built on top of the following libraries :

* [Node.js](http://nodejs.org/) - Application Server
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [MongoDb](http://mongodb.org/) - Database Storage
* [React.jS](http://reactjs.org/) - front end library for handling view layer
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library


##Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) &[React.js](http://reactjs.org/) if you haven't already.

2. Required modules  in these react-login app

-mongod
-Passport
-Passport-local
-express
-express-connection
-connect-flash
-bcryptjs
-body-parser
-cookie-parser
-morgan
-mongoose
-express-validator
-express-react-views
-react
-react-dom
-react-server
-superagent


3. Clone this repository and install its dependencies.

		> git clone https://github.com/1986webdeveloper/Code-Examples.git Reactjs/user-signup-login
		> cd user-signup-login
		> npm install

If you want to change database config then go to app.js and change your database server,database name,database password & database port
		
4. In a separate shell start the MongoDB daemon.

		> mongod

5. From within the react-login directory in other shell tab, start the server.

		> node app.js

	If you not always open this  tab then you have to run these command in directory to start and stop process.
	For start process
		pm2 start app.js
	For Stop process 
		pm2 stop all
		
6. Open a browser window and navigate to: [http://localhost:4000][http://localhost:4000]


##Contributing

Questions and suggestions for improvement are welcome.

