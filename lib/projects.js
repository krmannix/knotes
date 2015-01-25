var json = require(__dirname + '/info.json');

var startProjects = function(args) {
	if (args.length === 0) {
		if (json.projects.length === 0) {
			console.log("There are no projects");
			return true;
		} else {
			for (var i = 0; i < json.projects.length; i++) {
				console.log(json.projects[i].project);
			}
			return true;
		}
	} else {
		return false;
	}
}


module.exports.startProjects = startProjects;