<?php
session_start();
require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);

header('Content-Type: application/json'); // Imposta l'header Content-Type a JSON

if(true) {
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $word = "andrea";
        $query = "CALL testVocabolario('$word')";
        $statement = mysqli_prepare($db, $query);

        if ($statement) {
            mysqli_stmt_execute($statement);
            $data = mysqli_stmt_get_result($statement);
            $row = mysqli_fetch_all($data, MYSQLI_ASSOC);
            mysqli_stmt_close($statement);

            $result = [
                'success'    =>  true,
                'data'   =>  $row,
            ];
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Query execution failed',
            ];
        }

        mysqli_close($db);
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Word not provided',
    ];
}

echo json_encode($result);