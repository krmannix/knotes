var path = require('path');
var fs = require('fs-extra');
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
				console.log("Enter a number greater than 0");
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
					console.error("There is no project with that name");
					return true; // No project
				} else if (!messages) {
					console.error("There are no logs");
					return true; // No logs yet
				}
			} else {
				/* Printing out a specific number of messages for this location */
				var locationIndex = -1;
				for (var i = 0; i < json.locations.length; i++) {
					if (json.locations[i].location === currentDir) locationIndex = i;
					break;
				}
				if (locationIndex > -1) messages = json.locations[i].log;
				if (locationIndex == -1 || !messages) {
					console.error("There are no logs");
					return true; // No logs yet
				}
			}
			for (var i = 0; i < num; i++) {
				// Print out the messages
				console.log(messages[messages.length - (1 + i)]);
			}
			return true;
		}
	} else {
		/* Printing out 5 messages for this location */
		var locationIndex = -1, messages;
		for (var i = 0; i < json.locations.length; i++) {
			if (json.locations[i].location === currentDir) locationIndex = i;
			break;
		}
		if (locationIndex > -1) messages = json.locations[i].log;
		if (locationIndex == -1 || !messages) {
			console.error("There are no logs");
			return true; // No logs yet
		}
		var l = (messages.length >= 5) ? 5 : messages.length;
		for (var i = 0; i < l; i++) {
			// Print out the messages
			console.log(messages[messages.length - (1 + i)]);
		}
	}
}

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

module.exports.startLog = startLog;