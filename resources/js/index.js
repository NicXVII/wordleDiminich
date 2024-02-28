document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
});

//------------------------------------------------------------------------------------------------------

function createBtn(index)
{
    var div = document.getElementById(index + "riga");
    var btn = document.createElement('button');
    btn.id = index+"btn"
    btn.addEventListener("click", function(){
        console.log(btn.id);
        fetchWord();
    });
    div.appendChild(btn);
}

function fetchWord()
{
    console.log("Fecthing word");
    //implementa logica fetching
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
            //input.classList.add('inputElement');
            riga.appendChild(input);
        }
        div.appendChild(riga);
        createBtn(index);

    }
}