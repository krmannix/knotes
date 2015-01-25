var chalk = require('chalk');
var Add = require('./add');
var Log = require('./log');
var Projects = require('./projects');
var Locations = require('./locations');
var Todo = require('./todo')

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
		case 'log':
			if (!Log.startLog(user_args)) printError();
			break;
		case 'projects':
			if (!Projects.startProjects(user_args)) printError();
			break;
		case 'locations':
			if (!Locations.startLocations(user_args)) printError();
			break;
		case 'todo':
		console.log("Before");
			if (!Todo.startTodo(user_args)) {
				console.log("Print error");

				printError();
			}
			break;
		default:
			printError();
			process.exit(0);
			break;
	}
} else {
	console.error
}