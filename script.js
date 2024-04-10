//fonction pour ajouter un élément a l ecran
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

//fonction pour efffacer l ecran
function clearDisplay() {
    document.getElementById('display').value = '';
}
//methode qui permet d'afficher la fonctionde calcul
function appendfunction(func) {
    switch (func) {
        case 'sqrt':
            document.getElementById('display').value += '√(';
            break;
        case "sin":
            document.getElementById('display').value += 'sin(';
            break;
        case "cos":
            document.getElementById('display').value += 'cos(';
            break;
        case "tan":
            document.getElementById('display').value += 'tan(';
            break;
        case "exp":
            document.getElementById('display').value += '^';
            break;
        case "mod":
            document.getElementById('display').value += '%';
            break;
        case "pi":
            document.getElementById('display').value += 'π';
            break;
    }

}


function eraseLastCaracter() {
    let display = document.getElementById('display').value;
    document.getElementById('display').value = display.substring(0, display.length - 1);
}

// calculer
function calculate() {
    //si un ( est ouverte mais pas fermer on la ferme )
    let expression = document.getElementById('display').value;
    //on regarde dans expression le nombre de parenthèse ouverte
    let openParenthesis = (expression.match(/\(/g) || []).length;
    //on regarde dans expression le nombre de parenthèse ferme
    let closeParenthesis = (expression.match(/\)/g) || []).length;
    //on fait la diference entre les deux
    let difference = openParenthesis - closeParenthesis;
    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            expression += ')';
        }
    }
    //si on a  √ on remplace par Math.sqrt
    expression = expression.replace(/√/g, 'Math.sqrt');
    //si on a sin on remplace par Math.sin
    expression = expression.replace(/sin/g, 'Math.sin');
    //si on a cos on remplace par Math.cos
    expression = expression.replace(/cos/g, 'Math.cos');
    //si on a tan on remplace par Math.tan
    expression = expression.replace(/tan/g, 'Math.tan');
    //si on a ^ on remplace par Math.pow
    expression = expression.replace(/\^/g, '**');
    //si on a π on remplace par Math.PI
    expression = expression.replace(/π/g, 'Math.PI');

    //on traite les exception
    //si on un) suivi d un ( on rmplce par )*(
    expression = expression.replace(/\)\(/g, ')*(');
    //si on a pas d operateur entre un nombre et une fontion, on ajoute un *
    expression = expression.replace(/(\d+)(?![)\-+*/%.']|\d)\b/g, "$1*");
    //si on a pas d operateur devant un ( on ajoute un *)
    expression = expression.replace(/(\d+)\(/g, '$1*(');
    //si on a un nombre suivis de Math. on ajoute un *
    expression = expression.replace(/(\d+)(Math)/g, "$1*$2");
    //si l'expression finit par un * on l'enleve
    expression = expression.replace(/\*$/, '');




    console.log(expression);
    //on verifie que expression n est pas uniquement un nombre
    // let isNumber = /^\d+$/.test(expression);


    //on affiche le resultat
    console.log(isNumber);
    //on affiche le resultat
    try {
        if (expression != '' && !isNumber) {

            let result = eval(expression);
            if (result != undefined && result != Infinity && result != NaN && result != Infinity) {
            }
            document.getElementById('display').value = result;
            //on va stocker l historique des calcules dans le local storage
            let history = JSON.parse(localStorage.getItem('history')) || [];
            history.push({ calcul: expression, result: result });
            localStorage.setItem('history', JSON.stringify(history));
            displayHistory();
        }
    } catch (error) {
        document.getElementById('display').value = 'Erreur';
    }
}
//fonction qui permet d'afficher l'historique des calcules
function displayHistory() {
    // on recuper les elements de l historique
    let tableHistory = document.getElementById('tableResult');
    //on vide le tableau
    tableHistory.innerHTML = '';
    //on recuper l'historique du local storage
    let history = JSON.parse(localStorage.getItem('history')) || [];
    //on recuper les 10 dernieres valeurs
    history = history.slice(-10);
    //on va boucler sur notre tableau d'historique avec un forEach
    history.forEach(element => {
        // si l element n est pas null, on crée une ligne sinon on affiche un message d erreur
        if (element != null) {
            let tr = document.createElement('tr');
            let tdCalcul = document.createElement('td');
            tdCalcul.colSpan = 2;
            tdCalcul.textContent = element.calcul;

            let tdResult = document.createElement('td');
            tdResult.colSpan = 2;
            tdResult.textContent = element.result;
            // on ajoute les td dans la tr
            tr.append(tdCalcul, tdResult);
            // on ajout le tr dans le tbody
            tableHistory.appendChild(tr);

            let tdDelete = document.createElement('td');
            let button = document.createElement('button');
            button.textContent = '🗑';
            tdDelete.style.cursor = 'pointer';
            button.addEventListener('click', () => {
                let index = history.indexOf(element);
                history.splice(index, 1);
                localStorage.setItem('history', JSON.stringify(history));
                displayHistory();
            });
            tdDelete.appendChild(button);
            tr.appendChild(tdDelete);

        } else {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = 'pas d historique';
            tr.colSpan = 4;
            tr.textContent = 'pas d historique';
            td.appendChild(tr);
            tableHistory.appendChild(td);
        }


    });
}
displayHistory();