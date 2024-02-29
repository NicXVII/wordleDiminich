var paroleUsate = [];

document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
    unsetReadOnly(0);
});
//------------------------------------------------------------------------------------------------------

function createBtn(index) {
    var div = document.createElement("div");
    div.classList.add("griglia-btn");
    var divMadre = document.getElementById("griglia-griglia");
    var btn = document.createElement('button');
    btn.id = index + "btn";
    btn.addEventListener("click", function() {
        //btn.disabled = true; // Disabilita il pulsante quando viene cliccato
        fetchWord(index);
    });
    div.appendChild(btn);
    divMadre.appendChild(div);
}


function fetchWord(id)
{

    console.log("Fecthing word");
    var word = "";

    for(var index=0;index<5;index++)
    {
        //console.log(id+""+index);
        var letter = document.getElementById(id+""+index).value;
        if(letter != undefined)
            word+=letter;
    }
    console.log(word);
    if(word.length != 5)
        return;

    var btn = document.getElementById(id+"btn");
    btn.disabled = true;
    fetchVocabolario(word,id);
    //implementa logica fetching
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
                console.log(paroleUsate); 
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

function setReadOnly(id)
{
    if(id==5)
    return;

    for(var index = 0; index < 4;index++)
    {
        //console.log(id + "" + index);
        var input = document.getElementById(id + "" + index);
        input.setAttribute('readonly', 'readonly');
    }
}

function unsetReadOnly(id) 
{
    for (var index = 0; index < 4; index++) 
    {
        var input = document.getElementById(id + "" + index);
        input.removeAttribute('readonly');
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
        createBtn(index);

    }
}

function addListenerInput(input,index) {
    input.addEventListener('keyup', (event) => {
        console.log("Tasto alzato");
        console.log(input.getAttribute('position'));
        var pos = parseInt(input.getAttribute('position')); 
        if (pos < 4) 
        { 
            console.log("Entrato if");
            
            var nextpost = pos + 1;

            var nextInput = document.getElementById(index+"" + nextpost); 
            if (nextInput !== null) { 
                nextInput.focus();
            }
        }
    });
}


