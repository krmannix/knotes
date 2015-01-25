var chalk = require('chalk');
var Add = require('./add');

var printError = function(message) {
	if (message) console.error("Error: " + message);
	else console.error("Could not understand command!");
}

/* * * * * * * * * * * *
 * 
 *	Start process
 *
 * * * * * * * * * * * */

var user_args = process.argv.slice(2);

if (user_args.length > 0) {
	var first = user_args.shift();
	switch (first.trim()) {
		case 'add':
			if (!Add.startAdd(user_args)) printError();
			break;
		default:
			printError();
			process.exit(0);
			break;
	}
} else {
	console.error
}