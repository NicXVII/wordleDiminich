<?php
session_start(); // Initialize session

$result = array(); 
$json = file_get_contents('php://input');
$data = json_decode($json, true);

header('Content-Type: application/json'); // Set Content-Type header to JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($data['word'])) {
        $word = "andrea";
       // $word = $data['word'];
        $trovata = 1;

        // Handle database connection if needed
        /*
        $db = mysqli_connect("your_host", "your_username", "your_password", "your_database");

        if (!$db) {
            $result = [
                'success'    =>  false,
                'message'   =>  'Failed to connect to database',
            ];
        } else {
            $query = "CALL testVocabolario('$word')";
            $statement = mysqli_prepare($db, $query);

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
            }

            mysqli_close($db);
        }
        */
        addInArray($trovata,$word);
        // Assuming $trovata is your indicator of success/failure
        $result = [
            'success' => true,
            'data' => $trovata,
            'word' => $word,
        ];

        



    } else {
        $result = [
            'success'    =>  false,
            'message'   =>  'Word not provided',
        ];
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);



function addInArray($trovata, $word,)
{
          // Store word in session if $trovata is 1
          if ($trovata === 1) {
            if (!isset($_SESSION['paroleUsate'])) {
                $_SESSION['paroleUsate'] = array();
            }

            if(in_array($word, $_SESSION['paroleUsate'])) 
                return;
            array_push($_SESSION['paroleUsate'], $word);
            print_r($_SESSION['paroleUsate']); // Use print_r() to display the array contents
        }
}