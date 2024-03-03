<?php
    session_start();
    if(!isset($_SESSION['paroleUsate']))
    {
        $_SESSION['paroleUsate']    = array(); 
        $_SESSION['lettereUsate']   = array(); 
        $_SESSION['letteeGiuste']   = array(); 
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diminich || Wordle</title>
    <link rel="stylesheet" href="resources/css/index.css">
    <link rel="stylesheet" href="resources/css/keyboard.css">
</head>
<body>
    <header>
        <h1>Wordle</h1>
    </header>
    <div class="content">
        <div class="griglia-content">
            <div class="griglia-griglia" id="griglia-griglia">
            
            </div>

            </div>
        </div>
    </div>
    <div class="wordUsed" id="wordUsed">
        <h1>Lettere Usate</h1>
    </div>
    <?php
     //require_once('components/keyboard.php')
    ?>
</body>
</html>

<script src="resources/js/index.js"></script>
<script src="resources/js/keyboard.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
