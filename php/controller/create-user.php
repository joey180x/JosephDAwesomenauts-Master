<?php
	require_once(__DIR__ . "/../model/config.php");
	//connecting to config
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	//any invalid characters in strings are deleted
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);


	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
	//creating a unique id to use a unique random number 
	//and make it as unique as possible
	//5000 rounds to get a unique encript password
	//starting to encrypt password
	//php recongnizes the $ sign as a variable


	$hashedPassword = crypt($password, $salt);
	//returning a value stored in variable
	//creating encrypted password

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '$email',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt', "
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0, ");
	//created a query for users
	//inserting data inside of users
	//storing encrypted password inside of the database
	$_SESSION["name"] = $username;

	if($query) {
		echo "true";
		//Needs this for Ajax on index.php
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}