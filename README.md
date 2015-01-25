# knotes
Messages for in-between commits

<h3>To-Do</h3>
* Read JSON that consists of paths and messages
* Add a message to a path
* See log of messages
* Add notes to "project" name
* Add in error messages

__Project__: 

<h4>Structure</h4>
* _Add_: 
	* `knotes add "Need to put images in folder"`
		* Adds message to JSON
	* `knotes add "Need to put images in folder" -p Website-Project
		* Adds message to specific project
* _Log_: 
	* `knotes log`
		* Shows last 5 messages
	* `knotes log -all`
		* Shows all messages
	* `knotes log 30`
		* Shows 30 messages
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


