<?php
    $db_hostname = "localhost";
    $db_username = "quintaf";
    $db_password = "Qu!nta";
    $db_database = "wordle";

    /*$db_hostname = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_database = "wordle";*/

    $db = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);