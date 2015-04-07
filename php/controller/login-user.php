<?php
	require_once(__DIR__ . "/../model/config.php");

	//building new array
	//stores all exp info in one object
	$array = array(
		'exp'=> '',
		'exp1'=> '',
		'exp2'=> '',
		'exp3'=> '',
		'exp4'=> '',
	);
	//new username variable
	//gets input from post
	//filtering by sanitizing the string
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	//$_SESSION is where database connection is stored
	//sql statement that selects all
	//username is selected by the query
	//storing salt and password in query variable
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

	//checks if records were stored in query
	if($query->num_rows == 1){
		//fetches array stored in query and stores it in row
		$row = $query->fetch_array();

		//=== checks if they are the same type
		//checks if hashed password stored in database is equal to new hashed password stored as salt
		//crypt function is case sensitive
		if($row["password"] === crypt($password, $row["salt"])) {
			//confirms that user has logged in/been authenticated
			$_SESSION["authenticated"] = true;
			//setting array exp to user exp
			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			//stores name of player at all times
			$_SESSION["name"] = $username;
			//echoing out whole array as one statement
			echo json_encode($array);
		}

		else{
			echo "Invalid username and password";
		}
	}

	//if query couldnt store a username
	else{
		echo "Invalid username and password";
	}