<?php
	require_once(__DIR__ . "/../model/config.php");
	//connecting to config

	unset($_SESSION["authenticated"]);
	//unsetting session variable so we can log out user

	session_destroy();
	//destroying session and creating a new one not logged in

	header("Location: " . $path . "index.php");
	//exact location i want this file to send me to