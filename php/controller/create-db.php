<?php
	require_once(__DIR__ . "/../model/config.php");
	//for direct connection to database

	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
			. "id int(11) NOT NULL AUTO_INCREMENT," 
			. "username varchar(30) NOT NULL,"
			. "email varchar(50) NOT NULL,"
			. "password char(128) NOT NULL,"
			. "salt char(128) NOT NULL,"
			. "exp int(4),"
			. "exp1 int(4),"
			. "exp2 int(4),"
			. "exp3 int(4),"
			. "exp4 int(4),"
			. "PRIMARY KEY (id))");
			//no hackers = salt
			//user must have a username, password and 
			//emails have to have characters and can have 50 max
			//30 characters in a username
			//username cant be blank
			//increments id automatically
			//storing value if query is sucessful (true/false)

	if ($query) {
		echo "<p>Succesfully created table: users</p>";	
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>" ;
	}
	//creating table for users
