var json = require(__dirname + '/info.json');

var startTodo = function(args) {
	if (args.length === 0) {
		/* Display list of todos */
	} else {
		var option = args.shift().trim();
		switch (option) {
			case '-l':
				/* Display 10 most recent todos */
				break;
			case '-c':
				if (args.length == 1 && isInt(args[0])) {
					/* Complete a task */
					var num = parseInt(args[0], 10);
					if (json.todos.tasks.length < num) {
						console.log("Task " + num + " does not exist");
						return true;
					} else {
						return writeJSON(json.todos.tasks.splice(num, 1));
					}
				} else return false;
			case '-a':
				if (args.length === 1) {
					// Add a task
					return writeJSON(json.todos.tasks.push({todo: args[0], date: new Date().toLocaleDateString("en-US")}));
				} else if (args.length === 2 && isInt(args[1])) {
					// Add task to a position
					return writeJSON(json.todos.tasks.splice(parseInt(args[1], 10), 0, {todo: args[0], date: new Date().toLocaleDateString("en-US")}));
				} else return false;
				break;
			case '-m':
				if (args.length === 3 && isInt(args[0]) && isInt(args[1])) {
					var a = parseInt(args[1]);
					var b = parseInt(args[2]);
					var temp = json.todos.tasks[a];
					json.todos.tasks[a] = json.todos.tasks[b];
					json.todos.tasks[b] = temp;
					return writeJSON(json, 0, {todo: args[0], date: new Date().toLocaleDateString("en-US")});
				} else return false;
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
	fs.writeJson(__dirname + '/info.json', json_, function (err) {
		if (err) return false;
		else return true;
	});
}


module.exports.startTodo = startTodo;