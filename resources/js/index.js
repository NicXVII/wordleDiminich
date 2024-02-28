document.addEventListener("DOMContentLoaded", function() {
    createGriglia();
});

function createGriglia()
{
    var div = document.getElementById('griglia');
    for(var index=0;index < 6; index++)
    {
        var riga = document.createElement('div');
        //colonna.classList.add('riga');
        for(var position=0; position<5; position++)
        {
            var input = document.createElement('input');
            //input.classList.add('inputElement');
            riga.appendChild(input);
        }
        div.appendChild(riga);
    }
}