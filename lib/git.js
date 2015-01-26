var fs = require('fs-extra');
var path = require('path');
var currentDir = path.resolve(".");

function upPath(path) {
    var the_arr = path.split('/');
    the_arr.pop();
    return the_arr.join('/');
}

function findGitFolder(path) {
	if (path) {
		if (fs.existsSync(path + '/.git')) return path;
		else return findGitFolder(upPath(path));
	} else return null;
}

module.exports.gitPath = function() {
	var gitPath = findGitFolder(currentDir);
	if (gitPath) {
		return gitPath;
	} else {
		console.log("This does not appear to be a git repository.");
		process.exit(0);
	}
}




