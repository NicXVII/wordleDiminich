<?php
session_start();
//require_once("database.php");

$result = array(); 


header('Content-Type: application/json'); // Imposta l'header Content-Type a JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    $numeroCasuale = rand(0, 192);

   $_SESSION['parolaDaCercare'] = 'kanye';



    //$_SESSION['word'] = $word;
    //echo $numeroCasuale;

   /* $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {*/
        //$word = "andrea";
        $_SESSION['id'] = $numeroCasuale;
        $result = [
            'success'    =>  true,
            'id'   =>  $numeroCasuale,
        ];
        //$query = "CALL testVocabolario('$word')";
        /*$statement = mysqli_prepare($db, $query);


        if ($statement) {
            mysqli_stmt_execute($statement);
            $data = mysqli_stmt_get_result($statement);
            mysqli_stmt_close($statement);

            $result = [
                'success'    =>  true,
                'data'   =>  $data,
            ];
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Query execution failed',
            ];
        }*/

        //mysqli_close($db);
    }
/*}*/ else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Word not provided',
    ];
}

echo json_encode($result);