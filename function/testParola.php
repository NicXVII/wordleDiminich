<?php
session_start();
//require_once("database.php");

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);

header('Content-Type: application/json'); // Set the Content-Type header to JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($data['word'])) {
    /* $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {*/
        //$word = "andrea";
        //$word = "andrea"; // Assuming $word is defined elsewhere
        $wordToSearch = $_SESSION['parolaDaCercare'];
        $word = $data['word'];
        $positions = confrontWord($word, $wordToSearch);
        $rightLetters = checkWordPresents($word, $positions);

        $result = [
            'success'       =>  true,
            'data'          =>   $result,
            'letters'       => $rightLetters,
            'positions'     => $positions
        ];
    /*}*/ // The commented else block seems unnecessary

} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Word not provided',
    ];
}

echo json_encode($result);

function checkWordPresents($word, $positions)
{
    $wordPresents= array();

    for($i = 0; $i < 5; $i++) 
    {
        if($positions[$i] == '1')
        {
            $wordPresents[] = $word[$i];
        }
    }
    return $wordPresents;
}


function confrontWord($word, $wordToFind)
{
    $wordPresents = array();
    for($i = 0; $i < 5; $i++)
    {
        if($word[$i] === $wordToFind[$i])
        {
            $wordPresents[] = 1;
        }
        else
        {
            $wordPresents[] = 0;
        }
    }
    return $wordPresents;
}
