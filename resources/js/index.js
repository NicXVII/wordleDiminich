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


function newGame() {
    paroleUsate = [];
    lettereUsate = [];
    lettereGiuste = [];
    positions = [];
    posCaratteri = [];

 
}
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

    if(lettereUsate.length === 0)
    {
        var h1 = document.createElement('h1');
        h1.innerHTML = 'Non ci sono lettere';
        div.appendChild(h1);
    }
    var ul = document.createElement('ul');
    ul.id = 'usedLettersList';

    for (var i = 0; i < lettereUsate.length; i++) {
        var li = document.createElement('li');
        li.classList.add('dimension');
        li.textContent = lettereUsate[i];
        ul.appendChild(li);
    }

    div.appendChild(ul);
}

function fetchAll(word, id) {
    Promise.all([
        fetchVocabolario(word, id),
        fetchParola(word, id),
        fetchCaratteri(word, id)
    ]).then(() => {
        printColors(id);
        workWithWords();

    }).catch(error => {
        console.error('Si è verificato un errore durante il recupero dei dati:', error);
    });
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
    //console.log(lettereUsate);
}

function removeLettereUSate() {
    /*console.log("LEttere giuste "+ lettereGiuste);
    console.log("LEttere  "+ lettereUsate);*/

    for (var i = 0; i < lettereGiuste.length; i++) {
        var lettera = lettereGiuste[i];
        if (lettereUsate.includes(lettera)) {
            //console.log("removing "+ lettera);
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

function fetchVocabolario(word, id) {
    return new Promise((resolve, reject) => {
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
                if (data.data == 1) {
                    paroleUsate.push(data.word);
                    setReadOnly(id);
                    unsetReadOnly(id + 1);
                }
                resolve(data); // Risolve la Promise con i dati ottenuti
            } else {
                console.log('La richiesta non ha avuto successo');
                reject('La richiesta non ha avuto successo'); // Reindirizza l'errore
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
            reject(error); // Reindirizza l'errore
        });
    });
}

//------------------------------------------------------------------------------------------------------

function setReadOnlyAll(index)
{
    for(var i= index;i< 6;i++ )
    {
        //console.log("Set Read Only: "+ i);
        setReadOnly(i);
    }
}


function setReadOnly(id) {


    for (var index = 0; index < 5; index++) {
        var input = document.getElementById(id + "" + index);
        if (input) {
            input.setAttribute('readonly', 'readonly');
        }
    }
}

function unsetReadOnly(id) {
    for (var index = 0; index < 5; index++) {
        var input = document.getElementById(id + "" + index);
        if (input) {
            input.removeAttribute('readonly');
        }
    }
}

//------------------------------------------------------------------------------------------------------
function fetchCaratteri(word, id) {
    return new Promise((resolve, reject) => {
        const data = {
            word: word,
            id: id,
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
                //workWithWords();
                resolve(data); // Risolve la Promise con i dati ottenuti
            } else {
                console.log('La richiesta non ha avuto successo');
                reject('La richiesta non ha avuto successo'); // Reindirizza l'errore
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
            reject(error); // Reindirizza l'errore
        });
    });
}



function fetchParola(word, index) {
    return new Promise((resolve, reject) => {
        const data = {
            word: word,
        };

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
                positions.push(data.positions);
                addLettereGiuste(data.letters);
                resolve(data);
            } else {
                console.log('La richiesta non ha avuto successo');
                reject('La richiesta non ha avuto successo'); 
            }
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
            reject(error); 
        });
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
        } else {
            console.log('La richiesta non ha avuto successo');
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
            addListenerInput(input,index);
            riga.appendChild(input);
        }
        div.appendChild(riga);
        setReadOnly(index);

    }
}

function addListenerInput(input, index) {
    
    input.addEventListener('keyup', (event) => {
        var readonly = input.getAttribute('readonly');
        //console.log(readonly);
        if(readonly)
            return;
        var pos = parseInt(input.getAttribute('position'));
        if (event.keyCode < 65 || event.keyCode > 90) {
            
            if (event.keyCode === 8 && !readonly) {
                if (pos !== 0) {
                    var nextpost = pos - 1;
                    var nextInput = document.getElementById(index + "" + nextpost);
                    input.value = '';
                    nextInput.focus();
                    return;
                }
            }
            input.value = '';
            return;
        }
        if (pos < 4) {
            var nextpost = pos + 1;
            var nextInput = document.getElementById(index + "" + nextpost);
            if (nextInput !== null) {
                nextInput.focus();
            }
        } else {
            fetchWord(parseInt(index));
            if (index < 5) {
                var nextInput = document.getElementById((parseInt(index) + 1) + "" + 0);
                nextInput.focus();
            }
        }
    });
}


function printColors(index) 
{
    
    if(positions[index] === undefined)
        return;


    var pos = positions[index];


    var rightWord = true;
    for (var i = 0; i < 5; i++) {
        var input = document.getElementById(index + "" + i);
        
        if (typeof pos[i] === 'number' && pos[i] === 1) {
            input.classList.add("green");
        } else {
            rightWord = false;

            if(posCaratteri[index] === undefined)
            {
                input.classList.add("grey");
            }else
            {
                var temp = posCaratteri[index];


                if (typeof temp[i] === 'number' && temp[i] === 1)
                    input.classList.add("ocra");
                else
                    input.classList.add("grey");
            }
        }
    }


    if(rightWord)
    {
        popUp("Parola Indovinata","You won","success");
        setReadOnlyAll(index);
    } else
    {
        if(index === 5)
        {
            setReadOnlyAll(index);
            popUp("Parola non Indovinta", "Hai perso","error");
        }
    }

    
}


function popUp(title,text,icon) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        allowOutsideClick: false,
        allowEscapeKey: false, 
        allowEnterKey: true, 
        showConfirmButton: true,
        confirmButtonText: 'Chiudi',
        showCancelButton: false, 
        showCloseButton: false
    });

}


