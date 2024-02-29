var paroleUsate = [];
var lettereUsate = [];
document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
    unsetReadOnly(0);
    fetchRandomId();
});
//------------------------------------------------------------------------------------------------------

/*function createBtn(index) {
    var div = document.createElement("div");
    div.classList.add("griglia-btn");
    var divMadre = document.getElementById("griglia-griglia");
    var btn = document.createElement('button');
    btn.id = index + "btn";
    btn.addEventListener("click", function() {
        //btn.disabled = true; // Disabilita il pulsante quando viene cliccato
        //fetchWord(index);
    });
    div.appendChild(btn);
    divMadre.appendChild(div);
}*/


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
    addLettereUSate();
    sort();
    printLetereUsate();
    console.log(word);
    if(word.length != 5)
        return;

    /*var btn = document.getElementById(id+"btn");
    btn.disabled = true;*/
    if (noWhiteSpaces)
        fetchAll(word,id);
}


function printLetereUsate()
{
    var div = document.getElementById('wordUsed');
    div.innerHTML = '';


    div.innerHTML = lettereUsate
}
function fetchAll(word,id)
{

    fetchVocabolario(word,id);
    fetchCaratteri(word,id);
    fetchParola(word,id);

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

function sort()
{
    paroleUsate.sort();
lettereUsate.sort();
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
            console.log(data.data);
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
    if (id == 5) {
        return;
    }

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
            console.log(data.data);
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



function fetchParola(word,id) {
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
            console.log(data.data);
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
            console.log(data.id);
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
function createGriglia()
{
    var div = document.getElementById('griglia-griglia');
    for(var index=0;index < 6; index++)
    {
        var riga = document.createElement('div');
        //colonna.classList.add('riga');
        riga.id = index + "riga";
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
        //createBtn(index);

    }
}
function addListenerInput(input, index) {
    input.addEventListener('keyup', (event) => {
        var pos = parseInt(input.getAttribute('position'));
        
        // Verifica se il tasto premuto è una lettera dell'alfabeto
        if (event.keyCode < 65 || event.keyCode > 90) 
            return;

        if (pos < 4) { 
            var nextpost = pos + 1;
            var nextInput = document.getElementById(index + "" + nextpost); 
            if (nextInput !== null) { 

                nextInput.focus();
            }
        } else {
            fetchWord(parseInt(index));

            if(index < 5)
            {

            var nextInput = document.getElementById((parseInt(index) + 1) + "" + 0); 
            
            nextInput.focus();
            }
        }
    });
}



