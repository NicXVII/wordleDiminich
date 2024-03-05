<?php
session_start();
require_once("database.php");

$result = array(); 

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $query = "CALL getIdRandom()";
        $statement = mysqli_prepare($db, $query);

        if ($statement) {
            mysqli_stmt_execute($statement);
            $data = mysqli_stmt_get_result($statement);
            $id = mysqli_fetch_assoc($data);
            mysqli_stmt_close($statement);
            $_SESSION['id'] = $id['idParola'];
            $idValue = $id['idParola'];

            $result = [
                'success'    =>  true,
                'data'   =>  $idValue,
            ];
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Query execution failed',
            ];
        }

        mysqli_close($db); // Close the database connection
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Non puoi accedere a questa pagina direttamente.',
    ];
}

echo json_encode($result);
