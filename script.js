//fonction pour ajouter un élément a l ecran
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

//fonction pour efffacer l ecran
function clearDisplay() {
    document.getElementById('display').value = '';
}
// calculer
function calculate() {
    //dans un variable on va stocker la valeur de l input
    let expression = document.getElementById('display').value;
    console.log(expression);
    let result = eval(expression);
    console.log(result)
    document.getElementById('display').value = result;
}