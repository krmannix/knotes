var json = require(__dirname + '/info.json');
var fs = require('fs-extra');
var Promise = require('bluebird');
var chalk = require('chalk');


var startTodo = function(args) {
	if (args.length === 0) {
		/* Display list of todos.tasks */
		var l = (json.todos.tasks.length >= 10) ? 10 : json.todos.tasks.length;
		for (var i = 0; i < l; i++) {
			// Display tasks
			printTask(i, json.todos.tasks[i]);
		}
		return true;
	} else {
		var option = args.shift().trim();
		switch (option) {
			case '-l':
				/* Display 10 most recent todos.tasks */
				var l = (json.todos.completed.length >= 10) ? 10 : json.todos.completed.length;
				for (var i = 0; i < l; i++) {
					// Display tasks
					printTask(i, json.todos.completed[json.todos.completed.length - (i+1)]);
				}
				return true;
				break;
			case '-c':
				if (args.length == 1 && isInt(args[0])) {
					/* Complete a task */
					var num = parseInt(args[0], 10);
					if (json.todos.tasks.length < num || json.todos.tasks.length === 0) {
						console.log("Task " + num + " does not exist");
						return true;
					} else {
						json.todos.completed.push(json.todos.tasks.splice(num-1, 1)[0]);
						return writeJSON(json).then(function (result) { return result; });
					}
				} else return false;
			case '-a':
				if (args.length === 1) {
					// Add a task
					json.todos.tasks.push({task: args[0], date: new Date().toLocaleDateString("en-US")});
					return writeJSON(json).then(function (result) { return result; });
				} else if (args.length === 2 && isInt(args[1])) {
					// Add task to a position
					json.todos.tasks.splice(parseInt(args[1], 10), 0, {task: args[0], date: new Date().toLocaleDateString("en-US")});
					return writeJSON(json).then(function (result) { return result; });
				} else return false;
				break;
			case '-m':
				if (args.length === 3 && isInt(args[0]) && isInt(args[1]) && json.todos.tasks.length >= (Math.max(parseInt(args[0], 10), parseInt(args[1], 10)))) {
					var a = parseInt(args[1]);
					var b = parseInt(args[2]);
					var temp = json.todos.tasks[a];
					json.todos.tasks[a] = json.todos.tasks[b];
					json.todos.tasks[b] = temp;
					return writeJSON(json).then(function (result) { return result; });
				} else {
					console.log("There was a problem with your command");
					return true;
				};
				break;
			default:
				return false;
		}
	}
}

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

function writeJSON(json_) {
	return new Promise(function (resolve, reject) {
		fs.writeJson(__dirname + '/info.json', json_, function (err) {
			if (err === null) resolve(true);
			else resolve(false);
		});
	});
}

function printTask(i, task_) {
	console.log(chalk.yellow('\t[' + (i+1) + '] ') + task_.task);
}


module.exports.startTodo = startTodo;