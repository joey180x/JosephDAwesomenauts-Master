<?php
	require_once(__DIR__ . "/../model/config.php");
	//for direct connection to database
	


	//query id for each post
	//makes it go 1,2,3,4 ect.
	//max length of title is 255
	//not null means title cant be empty
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		. "id  int(11) NOT NULL AUTO_INCREMENT,"
		. "title varchar(255) NOT NULL,"
		. "post text NOT NULL,"
		. "DateTime datetime NOT NULL,"
		. "PRIMARY KEY (id))");
	//creates table for posts
	//Primary key = way tables are connected to each other
	//every post has to have a id, title, and post text

	if($query) {
		echo "<p>Succesfully created table: posts</p>.";
	}
	//echos if it has been succesfully created

	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
	//figuring out if query works or not

	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
			. "id int(11) NOT NULL AUTO_INCREMENT," 
			. "username varchar(30) NOT NULL,"
			. "email varchar(50) NOT NULL,"
			. "password char(128) NOT NULL,"
			. "salt char(128) NOT NULL,"
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
