document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
});

//------------------------------------------------------------------------------------------------------

function createBtn(index)
{
    /*var div = document.getElementById("griglia-btn");*/
    var div = document.createElement("div");
    div.classList.add("griglia-btn");
    var divMAdre = document.getElementById("griglia-griglia");
    var btn = document.createElement('button');
    btn.id = index+"btn"
    btn.addEventListener("click", function(){
        //console.log(btn.id);
        //fetchWord(index);
    });
    div.appendChild(btn);
    divMAdre.appendChild(div);
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
    fetchVocabolario(word);
    //implementa logica fetching
}

function fetchVocabolario(word) {
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
            input.id = index + ""+ position;
            //input.classList.add('inputElement');
            riga.appendChild(input);
        }
        div.appendChild(riga);
        createBtn(index);

    }
}