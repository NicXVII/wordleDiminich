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

var sucessoVocabolario = true;

async function fetchAll(word, id) {
    try {
        await fetchVocabolario(word, id);

        if (sucessoVocabolario === true) {
            let promises = [
                fetchParola(word, id),
                fetchCaratteri(word, id)
            ];

            await Promise.all(promises);

            printColors(id);
            workWithWords();
            printCaratteriUsati();
            printTentativiRimasti();
        } else {
            //console.log('sucessoVocabolario is false.');
        }
    } catch (error) {
        console.error('Si è verificato un errore durante il recupero dei dati:', error);
    }
}




function printCaratteriUsati()
{
    var div = document.getElementById('caratteriUsatiValue');

    div.textContent = lettereGiuste.length+lettereUsate.length;
}

function printTentativiRimasti() {
    var div = document.getElementById('tentativiRimastiValue');

    div.textContent = 6 - paroleUsate.length;

    var tentativiRimasti = 6 - paroleUsate.length;

    if(tentativiRimasti <= 3)
        div.classList.add('blinking');

    setColorBasedOnTentativiRimasti(div, tentativiRimasti);
}

function setColorBasedOnTentativiRimasti(div, tentativiRimasti) {
    if(tentativiRimasti === 0)
        return;
    if (tentativiRimasti >= 4) {
        div.style.color = 'green';
    } else if (tentativiRimasti >= 2) {
        div.style.color = 'orange';
    } else {
        if(!rightWord)
            popUp("Ultimo Tentativo", "Fai molta attenzione", "error");


        div.style.color = 'red';
    }
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
                var check = data.data[0];
                if(check === undefined)
                    check = data.data[1];


                if (check === 1) {
                    sucessoVocabolario = true;
                    paroleUsate.push(data.word);
                    setReadOnly(id);
                    unsetReadOnly(id + 1);
                }else
                {   
                    //unsetReadOnly(id);
                    sucessoVocabolario = false;
                    removeInput(id);
                }
                //console.log(sucessoVocabolario);
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


function removeInput(id)
{
    for(var i = 0; i< 5; i++)
    {
        var input = document.getElementById(id+""+i);
        input.value = '';
    }
    var input1 = document.getElementById(id+""+0);
    input1.focus();
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
                //console.log(data.data);

                posCaratteri.push(data.data);
                //console.log(posCaratteri);
                //console.log(posCaratteri.length);
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
                //console.log(data.data);
                positions.push(data.data);
                //console.log(positions);
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
            console.log(data.data);
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
            input.classList.add('riga');
            input.id = index + ""+ position;
            input.setAttribute('position', position);
            addListenerInput(input,index);
            riga.appendChild(input);
        }
        div.appendChild(riga);
        setReadOnly(index);
    }
    var input = document.getElementById(0+""+0);
    input.focus();
}


function addListenerInput(input, index) {
    
    input.addEventListener('keydown', (event) => {
        var readonly = input.getAttribute('readonly');
        //console.log(readonly);
        //console.log(event.keyCode);
        
        if(readonly)
            return;
        var pos = parseInt(input.getAttribute('position'));
        //console.log("Position "+pos);
        setTimeout(()=>{
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
        },);


    });
}


var rightWord = null;

function printColors(index) 
{
   //console.log("Positions " + positions[index] );
    if(positions[index] === undefined)
        return;


    var pos = positions[index];
    //console.log("Test arancio "+ pos);
    rightWord = true;
    var grey = 0;
    for (var i = 0; i < 5; i++) {
        var input = document.getElementById(index + "" + i);
        //console.log("pos: "+ pos[i]);
        if (pos[i] == 1) {
            //console.log("Green");
            input.classList.add("green");
            input.classList.add('correct');
            //input.classList.add('rotated');
        } else {
            rightWord = false;

            if(posCaratteri[index] === undefined)
            {
                input.classList.add("grey");
                grey++;
            }else
            {
                var temp = posCaratteri[index];


                if (temp[i] == 1)
                    input.classList.add("ocra");
                else
                {
                    input.classList.add("grey");
                    grey++;
                }
            }
        }
    }
    var riga = document.getElementById(index + "riga");

    if(grey === 5)
    {
        riga.classList.add('shake');
    }


    //console.log(rightWord + " index: "+ index);
    if(rightWord)
    {
        addEffect(index);
        //riga.classList.add('correctWord');
        popUp("Parola Indovinata","You won","success");
        createBtnReload();
        //console.log("right word");
        setReadOnlyAll(index);
        return;
    } 
    if(index === 5)
    {
        //console.log("wrong word");
        setReadOnlyAll(index);
        popUp("Parola non Indovinta", "Hai perso","error");
        createBtnReload();

    }

    
}

function addEffect(index)
{
    for(var i = 0; i< 5; i++)
    {
        var input = document.getElementById(index+""+i);
        //console.log(input);
        input.classList.add('correctWord');
    }
}


function createBtnReload() {
    var div = document.body.querySelector('header');
    var btn = document.createElement("button");
    btn.textContent = "Rigioca!!!!!!!!";
    btn.className = "reload-button"; 
    div.appendChild(btn);
    btn.addEventListener("click", function() {
        location.reload();
    });
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


