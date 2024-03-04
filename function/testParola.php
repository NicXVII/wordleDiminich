<?php
session_start();
require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);


if (true) {
    $data['word'] = "acqua";
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $id = $_SESSION['id'];
        $word = $data['word'];
        $query = "CALL testParola (?, ?)";
        $statement = mysqli_prepare($db, $query);

        if ($statement) {
            mysqli_stmt_bind_param($statement, "is", $id, $word);
            mysqli_stmt_execute($statement);
            $queryResult = mysqli_stmt_get_result($statement);
            mysqli_stmt_close($statement);

            $data = mysqli_fetch_array($queryResult);

            $result = [
                'success'    =>  true,
                'data'   =>  $data,
                'letters' => confrontoLettere($data[0], $word),
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


function confrontoLettere($sequenza, $parola)
{
    $letters = null;
    
    for ($i = 0; $i < 5; $i++) {
         if($sequenza[$i] == 1)
            {
                $letters += $parola[$i];
            }
    }

    return $letters;
}