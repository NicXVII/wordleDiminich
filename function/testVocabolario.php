<?php
session_start();
require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        if (isset($data['word'])) {
            $word = $data['word'];
            $query = "CALL testVocabolario (?)";
            $statement = mysqli_prepare($db, $query);

            if ($statement) {
                mysqli_stmt_bind_param($statement, "s", $word);
                mysqli_stmt_execute($statement);
                $queryResult = mysqli_stmt_get_result($statement);
                mysqli_stmt_close($statement);

                $data = mysqli_fetch_assoc($queryResult);

                $result = [
                    'success'    =>  true,
                    'data'   =>  $data,
                ];
            } else {
                $result = [
                    'success'    =>  false,
                    'message'   =>  'Query execution failed',
                ];
            }
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Word not provided',
            ];
        }

        mysqli_close($db);
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);