<?php
	require_once(__DIR__ . "/../model/database.php");
	session_start();
	session_regenerate_id(true);
	//everytime the file is called upon its 
	//going to regenerate the id aand delete the old session

	$path = '/JosephDAwesomenauts/php/';
	//pathway to blog
	
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";
	//Database variables and information
	//helping us connect to database

	if (!isset($_SESSION["connection"])) {
		//isset determines if the variable has a value
		//if it doesent we have to create a new database variable and
		//store it in there

		$connection = new Database($host, $username, $password, $database);
		//new object stored in connection
		//having access to having access to function in database.php
	
		$_SESSION["connection"] = $connection;
		//created database object and storing in in our connection
		//variable to assign is to our session variable called connection
	}

?>
