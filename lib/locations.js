var json = require(__dirname + '/info.json');

var startLocations = function(args) {
	if (args.length === 0) {
		if (json.locations.length === 0) {
			console.log("There are no locations");
			return true;
		} else {
			for (var i = 0; i < json.locations.length; i++) {
				console.log(json.locations[i].location);
			}
			return true;
		}
	} else {
		return false;
	}
}


module.exports.startLocations = startLocations;