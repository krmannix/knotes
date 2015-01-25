var path = require('path');
var fs = require('fs-extra');
var json = require(__dirname + '/info.json');
var currentDir = path.resolve(".");

var startAdd = function(args) {
	if (args.length > 0) {
		var message = args.shift(); // Should be the message
		if (args.length > 0) {
			var option = args.shift().trim();
			switch (option) {
				case '-p':
					if (args.length === 1) {

						/* Adding message to a specific project */
						var projectName = args.shift().trim();
						var projectIndex = -1;
						for (var i = 0; i < json.projects.length; i++) {
							if (json.projects[i].project === projectName) {
								projectIndex = i;
								break;
							}
						}
						if (projectIndex > -1) json.projects[projectIndex].log.push(message);
						else json.projects.push({project: projectName, log: [message]});
						return writeJSON(json).then(function (result) { return result; });
					} else return false;
					break;
				default:
					return false;
			}
		} else {
			/* Adding message for this location */
			var locationIndex = -1;
			for (var i = 0; i < json.locations.length; i++) {
				if (json.locations[i].location === currentDir) locationIndex = i;
				break;
			}
			if (locationIndex > -1) json.locations[locationIndex].log.push(message);
			else {
				json.locations.push({location: currentDir, log: [message]});
			}
			return writeJSON(json).then(function (result) { return result; });
		}
		return true;
	} else {
		return false;
	}	
};

function writeJSON(json_) {
	return new Promise(function (resolve, reject) {
		fs.writeJson(__dirname + '/info.json', json_, function (err) {
			console.log("Writing " + (err === null));
			if (err === null) {
				console.log("THISB APPEAR");
				resolve(true);
			}
			else resolve(false);
		});
	});
}

module.exports.startAdd = startAdd;