<?php
	require_once(__DIR__ . "/../model/config.php");
	//requiring config

	function authenticateUser() {
		if (!isset($_SESSION["authenticated"])) {
			return false;
			//if user hasent been authenticated it will
			//return false
		}
		else {
			if ($_SESSION["authenticated"] != true) {
				 return false;
			}
			else{
				return true;
				//checking if user has been authenticated
				//if its not true not authenticated
				//if both return false means session 
				//variable has been set and true
			}
		}
	}