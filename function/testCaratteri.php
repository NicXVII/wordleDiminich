<?php
session_start();
require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);


if (true) {
    $word = 'ACQUA'; 
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $id = intval($_SESSION['id']);
        //$word = $data['word'];
        $query = "CALL testCarattere (?, ?)";
        $statement = mysqli_prepare($db, $query);

        if ($statement) {
            mysqli_stmt_bind_param($statement, "is", $id, $word);
            mysqli_stmt_execute($statement);
            $queryResult = mysqli_stmt_get_result($statement);
            mysqli_stmt_close($statement);

            $data = mysqli_fetch_array($queryResult);

            $query = "CALL testCarattere ($id, 'acqua')";
            $res = mysqli_query($db, $query);
            $data = mysqli_fetch_array($res);
            
            $result = [
                'id' => $id,
                'success'    =>  true,
                'data'   =>  $data[0],
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