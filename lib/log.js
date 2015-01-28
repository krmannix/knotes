var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var json = require(__dirname + '/info.json');
var currentDir = path.resolve(".");

var startLog = function(args) {
	if (args.length > 0) {
		var option = args.shift().trim();
		/* Printing out a specific number of messages */
		if (isInt(option)) {
			var num = parseInt(option, 10),
				messages;
			if (num < 1) {
				printError("Enter a number greater than 0");
				return true;
			}
			/* Printing out a specific number of messages for a project */
			if (args.length > 1 && args.shift().trim() === '-p') {
				var projectName = args[0];
				var projectIndex = -1;
				for (var i = 0; i < json.projects.length; i++) 
					if (json.projects[i].project === projectName) {
						projectIndex = i;
						break;
					}
				if (projectIndex > -1) messages = json.projects[i].log;
				if (projectIndex == -1) {
					printError("There is no project with that name");
					return true; // No project
				} else if (!messages) {
					printError("There are no logs for this project");
					return true; // No logs yet
				}
			} else {
				/* Printing out a specific number of messages for this location */
				var locationIndex = -1;
				for (var i = 0; i < json.locations.length; i++) {
					if (json.locations[i].location === gitPath) locationIndex = i;
					break;
				}
				if (locationIndex > -1) messages = json.locations[i].log;
				if (locationIndex == -1 || !messages) {
					printError("There are no logs for this directory");
					return true; // No logs yet
				}
			}
			for (var i = 0; i < num; i++) {
				// Print out the messages
				printMessage(messages[messages.length - (1 + i)]);
			}
			return true;
		} else {
			switch (option) {
				case '-p':
					var projectName = args[0];
					var projectIndex = -1;
					for (var i = 0; i < json.projects.length; i++) 
						if (json.projects[i].project === projectName) {
							projectIndex = i;
							break;
						}
					if (projectIndex > -1) messages = json.projects[i].log;
					if (projectIndex == -1) {
						printError("There is no project with that name");
						return true; // No project
					} else if (!messages) {
						printError("There are no logs for this project");
						return true; // No logs yet
					} else {
						printMessage(messages[messages.length-1]);
						return true;
					}
					break;
				case '-all':
					if (args.length === 2 && args[0] === '-p') {
						var projectName = args[0];
						var projectIndex = -1;
						for (var i = 0; i < json.projects.length; i++) 
							if (json.projects[i].project === projectName) {
								projectIndex = i;
								break;
							}
						if (projectIndex > -1) messages = json.projects[i].log;
						if (projectIndex == -1) {
							printError("There is no project with that name");
							return true; // No project
						} else if (!messages) {
							printError("There are no logs for this project");
							return true; // No logs yet
						} else {
							for (var i = 0; i < messages.length; i++) {
								printMessage(messages[i]);
							}
							return true;
						}
					} else {
						var locationIndex = -1, messages;
						for (var i = 0; i < json.locations.length; i++) {
							if (json.locations[i].location === gitPath) locationIndex = i;
							break;
						}
						if (locationIndex > -1) messages = json.locations[i].log;
						if (locationIndex == -1 || !messages) {
							printError("There are no logs");
							return true;
						}
						for (var i = 0; i < messages.length; i++) {
							printMessage(messages[i]);
						}
						return true;
					}
					return true;
					break;
				default:
					return false;
					break;
			}
		}
	} else {
		/* Printing out 5 messages for this location */
		var locationIndex = -1, messages;
		for (var i = 0; i < json.locations.length; i++) {
			if (json.locations[i].location === gitPath) locationIndex = i;
			break;
		}
		if (locationIndex > -1) messages = json.locations[i].log;
		if (locationIndex == -1 || !messages) {
			printError("There are no logs for this directory");
			return true; // No logs yet
		}
		var l = (messages.length >= 5) ? 5 : messages.length;
		for (var i = 0; i < l; i++) {
			// Print out the messages
			printMessage(messages[messages.length - (1 + i)]);
		}
	}
}

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

function printMessage(message) {
	console.log(chalk.cyan(message));
}

function printError(err) {
	console.log(chalk.red(err));
}

module.exports.startLog = startLog;