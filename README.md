# knotes
Messages for in-between commits

<h3>To-Do</h3>
* ~~Add~~
* ~~Log~~
* ~~Projects~~
* ~~Locations~~
* To Do
* Add in error messages

__Project__: 

<h4>Structure</h4>
* _Add_: 
	* `knotes add "Need to put images in folder"`
		* Adds message to JSON
	* `knotes add "Need to put images in folder" -p ProjectName
		* Adds message to specific project
* _Log_: 
	* `knotes log`
		* Shows last 5 messages
	* `knotes log -all`
		* Shows all messages
	* `knotes log -p ProjectName
		* Shows last 5 messages for specific project
	* `knotes log 30`
		* Shows 30 messages
	* `knotes log 30 -p ProjectName`
		* Shows 30 message for specific project
* _Projects_:
	* `knotes projects`
		* Shows a list of all projects for knotes stored
* _Locations_:
	* `knotes locations`
		* Shows each place where there's a knote, and it's last message
* _To Do_:
	* `knotes todo`
		* Displays todo list in a numbered list
	* `knotes todo -c 5`
		* Remove the task at #5
	* `knotes todo -l`
		* Shows 10 most recently completed tasks
	* `knotes todo -a "Task goes here"
		* Adds a task onto the list
	* `knotes todo -a "Task goes here" 3
		* Adds a task at that position, or next closest position if list is shorter
	* 'knotes todo -m 3 5'
		* Moves task at position 3 to position 5


