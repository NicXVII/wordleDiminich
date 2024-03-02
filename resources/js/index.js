var paroleUsate = [];
var lettereUsate = [];
var lettereGiuste = [];
var positions = [];
var posCaratteri = [];
document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
    unsetReadOnly(0);
    fetchRandomId();
});
//------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------

function fetchWord(id)
{

    var noWhiteSpaces = true;
    //console.log("Fecthing word");
    var word = "";

    for(var index=0;index<5;index++)
    {
        //console.log(id+""+index);
        var letter = document.getElementById(id+""+index).value;
        if (letter == "")
        {
            noWhiteSpaces = false;
            return;
        }
        if(letter != undefined)
            word+=letter;
    }

    if(word.length != 5)
    return;


    //console.log(word);


    /*var btn = document.getElementById(id+"btn");
    btn.disabled = true;*/
    if (noWhiteSpaces)
        fetchAll(word,id);
}



function printLettereUsate() {
    var div = document.getElementById('wordUsed');
    div.innerHTML = '';

    var ul = document.createElement('ul');
    ul.id = 'usedLettersList';

    for (var i = 0; i < lettereUsate.length; i++) {
        var li = document.createElement('li');
        li.textContent = lettereUsate[i];
        ul.appendChild(li);
    }

    div.appendChild(ul);
}

function fetchAll(word,id)
{
    /*console.log("Fetching all word");
    console.log("Parole usate" + paroleUsate);
    console.log("Lettere usate" + lettereUsate);
    console.log("LEttere Giuste" + lettereGiuste);*/


    fetchVocabolario(word,id);
    fetchParola(word,id);

    fetchCaratteri(word,id);
    workWithWords();

}


function workWithWords()
{
    
    addLettereUSate();
    removeLettereUSate();
    sort();
    printLettereUsate();
}
function addLettereUSate()
{
    paroleUsate.forEach(function(parola) {
        for (var i = 0; i < parola.length; i++) {
            var lettera = parola[i];
            if (!lettereUsate.includes(lettera)) {
                lettereUsate.push(lettera);
            }
        }
    });
}

function removeLettereUSate() {
    /*console.log("LEttere giuste "+ lettereGiuste);
    console.log("LEttere  "+ lettereUsate);*/

    for (var i = 0; i < lettereGiuste.length; i++) {
        var lettera = lettereGiuste[i];
        if (lettereUsate.includes(lettera)) {
            console.log("removing "+ lettera);
            var index = lettereUsate.indexOf(lettera);
            //console.log(lettera);
            if (index !== -1) {
                lettereUsate.splice(index, 1);
            }
        }
    }
    //console.log("After removal: "+ lettereUsate);
    printLettereUsate();
}


function addLettereGiuste(word)
{
    for(var i = 0; i< word.length; i++)
    {
        var lettera = word[i];
        if(!lettereGiuste.includes(lettera))
        {
            lettereGiuste.push(lettera);
        }
    }
}
function sort()
{
    paroleUsate.sort();
    lettereUsate.sort();
    lettereGiuste.sort();
}

function fetchVocabolario(word,id) {
    const data = {
        word: word,
    };
    fetch('function/testVocabolario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            //console.log(data.data);
            if(data.data == 1)
            {

                paroleUsate.push(data.word);
                //console.log(paroleUsate); 
                setReadOnly(id);
                unsetReadOnly(id+1);               
            }
            //populate(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            //popUp("Non sono stati trovati elementi");
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}
//------------------------------------------------------------------------------------------------------
function setReadOnly(id) {


    for (var index = 0; index < 4; index++) {
        var input = document.getElementById(id + "" + index);
        if (input) {
            input.setAttribute('readonly', 'readonly');
        }
    }
}

function unsetReadOnly(id) {
    for (var index = 0; index < 4; index++) {
        var input = document.getElementById(id + "" + index);
        if (input) {
            input.removeAttribute('readonly');
        }
    }
}

//------------------------------------------------------------------------------------------------------

function fetchCaratteri(word,id) {
    const data = {
        word: word,
        id  : id,
    };
    fetch('function/testCaratteri.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            posCaratteri.push(data.data);
            //console.log(data.data);
            /*if(data.data == 1)
            {

                paroleUsate.push(data.word);
                console.log(paroleUsate); 
                setReadOnly(id);
                unsetReadOnly(id+1);               
            }*/
            //populate(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            //popUp("Non sono stati trovati elementi");
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}



function fetchParola(word,index) {
    //console.log("Index "+ index);
    const data = {
        word: word,
        //id  : index,
    };
    //console.log(data);

    fetch('function/testParola.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            console.log(data.positions);

            positions.push(data.positions);
            console.log("Lettere giuste:"+data.letters);
            addLettereGiuste(data.letters);
            printColors(index);
            /*if(data.data == 1)
            {

                paroleUsate.push(data.word);
                console.log(paroleUsate); 
                setReadOnly(id);
                unsetReadOnly(id+1);               
            }*/
            //populate(data.data);
        } else {
            console.log('La richiesta non ha avuto successo');
            //popUp("Non sono stati trovati elementi");
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}


function fetchRandomId() {

    fetch('function/getRandomId.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            //console.log(data.id);
        } else {
            console.log('La richiesta non ha avuto successo');
            //popUp("Non sono stati trovati elementi");
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}
//------------------------------------------------------------------------------------------------------

function confrontInputWithLettere() {
    var inputs = document.getElementsByClassName('input-field');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var letter = input.value;
        if (lettereUsate.includes(letter)) {
            input.style.color = 'grey';
        }
        if (lettereGiuste.includes(letter)) {
            input.style.color = 'green';
        }
    }
}



//------------------------------------------------------------------------------------------------------

function createGriglia()
{
    var div = document.getElementById('griglia-griglia');
    for(var index=0;index < 6; index++)
    {
        var riga = document.createElement('div');
        //colonna.classList.add('riga');
        riga.id = index + "riga";
        riga.classList.add('riga');
        for(var position=0; position<5; position++)
        {
            var input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('input-field');
            input.id = index + ""+ position;
            input.setAttribute('position', position);
            //input.classList.add('inputElement');
            addListenerInput(input,index);
            riga.appendChild(input);
        }
        div.appendChild(riga);
        setReadOnly(index);

    }
}
function addListenerInput(input, index) {
    input.addEventListener('keyup', (event) => {
        var pos = parseInt(input.getAttribute('position'));
        
        if (event.keyCode < 65 || event.keyCode > 90) 
        {
            input.value = '';
            return;
        }
        //colorInputBasedOnLetter(input);
        if (pos < 4) { 
            var nextpost = pos + 1;
            var nextInput = document.getElementById(index + "" + nextpost); 
            if (nextInput !== null) { 

                nextInput.focus();
            }
        } else {
            fetchWord(parseInt(index))
            //printColors(index);
            //printLetereUsate();
            if(index < 5)
            {

            var nextInput = document.getElementById((parseInt(index) + 1) + "" + 0); 
            
            nextInput.focus();
            }
        }
    });
}


function printColors(index) 
{
    console.log(positions);
    console.log("Printing colors...");
    if(positions[index] === undefined)
        return;


    var pos = positions[index];

    console.log("Pos"+pos);

    for (var i = 0; i < 5; i++) {
        var input = document.getElementById(index + "" + i);
        
        // Check if pos[i] is defined and is equal to 1
        if (typeof pos[i] === 'number' && pos[i] === 1) {
            console.log("Green");
            input.classList.add("green");
        } else {
            //console.log("Grey");
            var temp = posCaratteri[index];
            if (typeof temp[i] === 'number' && temp[i] === 1)
                input.classList.add("ocra");
            else
                input.classList.add("grey");
        }
    }
}


/*
function colorInputBasedOnLetter(input) {
    var letter = input.value;
    console.log("colorInputBasedOnLetter " +letter);

    if (lettereUsate.includes(letter)) {
        console.log("Lettere usate " + letter);
        input.classList.add('grey');

    }
    if (lettereGiuste.includes(letter)) {
        console.log("Lettere giuste " + letter);
        input.classList.add('green');
    }
}
*/




