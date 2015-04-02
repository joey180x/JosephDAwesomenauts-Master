<?php
	require_once(__DIR__ . "/../model/config.php");

	$array = array(
			'exp'=> '',
			'exp1'=> '',
			'exp2'=> '',
			'exp3'=> '',
			'exp4'=> '',

		);

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
	//now have username and password that was send in by the form

	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
	//select where our username is equal to the username the user submitted through the form
	//will retrieve info from database

	if ($query->num_rows === 1) {
		$row = $query->fetch_array();
		//triple = checks if it is the same type
		//getting array of information and storing it in $row

		if ($row["password"] === crypt($password, $row["salt"])) {
				$_SESSION["authenticated"] = true;
				$array["exp"] = $row["exp"];
				$array["exp1"] = $row["exp1"];
				$array["exp2"] = $row["exp2"];
				$array["exp3"] = $row["exp3"];
				$array["exp4"] = $row["exp4"];

				echo json_encode($array);
				//echoing out the whole array as one statement
		}
		else {
			echo "<p>Invalid username and password";
		}	
	}
	else {
		echo "<p>Invalid username and password</p>";
	}
