# Login and User Account Management System for NodeJS



## Features ##
- Create New user account
- View User profile
- Ability to Update Account
- Ability to Delete Account
- User login
- Blowfish-based Scheme Password Encryption
- Validations
	- Username and email are unique
	- All fields are required
- Notification as a popup when Update/Delete process is done.


## Node-Login is built on top of the following libraries ##

- [Node.js](http://nodejs.org/) - Application Server
- [Express.js](http://expressjs.com/) - Node.js Web Framework
- [MongoDb](http://mongodb.org/) - Database Storage
- [Jade](http://jade-lang.com/) - HTML Templating Engine
- [Stylus](http://stylus-lang.com/) - CSS Preprocessor
- [Moment.js](http://momentjs.com/) - Lightweight Date Library
- [Twitter Bootstrap] - UI Component & Layout Library

## Installation & Setup ##

1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Clone this repository and install its dependencies.
		
		> git clone git://github.com/braitsch/node-login.git node-login
		> cd node-login
		> npm install

	If you want to change database config then go to app.js and change your database server,database name,database password & database port
		
3. In a separate shell start the MongoDB daemon.

		> mongod

4. From within the node-login directory in other shell tab, start the server.

		> node app.js

	If you not always open this  tab then you have to run these command in directory to start and stop process.
	For start process
		pm2 start app.js
	For Stop process 
		pm2 stop all
		
5. Open a browser window and navigate to: [http://localhost:4300](http://localhost:4300)




## Contributing ##

Questions and suggestions for improvement are welcome.