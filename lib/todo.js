
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
					var num = parseInt(args[0], 10)
				} else return false;
		}
	}
}

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}


module.exports.startTodo = startTodo;