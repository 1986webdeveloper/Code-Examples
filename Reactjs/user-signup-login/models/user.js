// Define Required Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var MongoDB = require('mongodb').Db; 

// User Schema
var Server = require('mongodb').Server; // MongoDb server module

//Database Details
var dbName = process.env.DB_NAME || 'loginapp'; // Db name
var dbHost = process.env.DB_HOST || 'localhost' // Host name
var dbPort = process.env.DB_PORT || 27017; // Port

//Create MongoDb Object
var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
 
 //Open Database Connection
 db.open(function (e, d) {
    if (e) {
        console.log(e);
    } else {
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, function (e, res) {
                if (e) {
                    console.log('mongo :: error: not authenticated', e);
                } else {
                    console.log('mongo :: authenticated and connected to database :: "' + dbName + '"');
                }
            });
        } else {
            console.log('mongo :: connected to database :: "' + dbName + '"');
        }
    }
});

//Get Collection For Database Operations
var users = db.collection('users'); // "users" is DB collection/table name

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

//Function For get Id
var getObjectId = function (id)
{
    return new require('mongodb').ObjectID(id);
}

var User = module.exports = mongoose.model('User', UserSchema);

//Create New User
module.exports.createUser = function(newUser, callback){
        //Encrypt Password
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

//Update User Data
module.exports.UpdateUser = function (UpdateUser, callback)
{
       //Encrypt Password
       bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(UpdateUser.password, salt, function(err, hash) {
	        UpdateUser.password = hash;
	         var query ={"_id":getObjectId(UpdateUser.iddata)};
                 users.update(query,UpdateUser);
	    });
       });
}

//Get User data by Username
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

//Get User data by UserId
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//Compare Passwords
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
