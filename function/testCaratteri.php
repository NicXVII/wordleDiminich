<?php
session_start();
//require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);

header('Content-Type: application/json'); // Imposta l'header Content-Type a JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $word = $data['word'];
    $wordToFind = $_SESSION['parolaDaCercare'];

   /* $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {*/
        //$word = "andrea";
        $datas = confrontWord($word, $wordToFind);
        $result = [
            'success'    =>  true,
            'data'   =>   $datas,
            /*'word' => $datas,*/
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


function confrontWord($word, $wordToFind)
{
    $wordPresents = array(); // Initialize an array to store the results
    
    for ($i = 0; $i < strlen($word); $i++) {
        // Check if the current character of $word is found in $wordToFind
        if (strpos($wordToFind, $word[$i]) !== false) {
            $wordPresents[] = 1;
        } else {
            $wordPresents[] = 0;
        }
    }
    
    return $wordPresents; // Return the array containing the results
}
