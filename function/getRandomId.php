<?php
session_start();
require_once("database.php");

$result = array(); 


header('Content-Type: application/json'); // Imposta l'header Content-Type a JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    /*$numeroCasuale = rand(0, 192);

   $_SESSION['parolaDaCercare'] = 'kanye';*/





    //$_SESSION['word'] = $word;
    //echo $numeroCasuale;

   $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {

        $query = "CALL getIdAcqua()";
        $statement = mysqli_prepare($db, $query);


        if ($statement) {
            mysqli_stmt_execute($statement);
            $data = mysqli_stmt_get_result($statement);
            $id = mysqli_fetch_assoc($data);
            mysqli_stmt_close($statement);
            $_SESSION['id'] = $id;

            $result = [
                'success'    =>  true,
                'data'   =>  $id,
            ];
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Query execution failed',
            ];
        }

    }
} else
{
    $result = [
        'success'    =>  false,
        'message'   =>  'Non puoi accedere a questa pagina direttamente.',
    ];
}
echo json_encode($result);

