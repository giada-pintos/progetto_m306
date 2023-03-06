//dichiaro il mio form con utente e password
const form = document.querySelector('form');
if (typeof userData === 'undefined') {
    var userData = undefined;
}

//errore aggiunto al form
var errorLabel = document.createElement("label");
errorLabel.innerHTML = "";
form.appendChild(errorLabel);

//Cattura dati dal json
fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            //faccio il get del first e lastname
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            checkUserExists(data, firstName, lastName);

            //controllo se l'utente esiste
            if (checkUserExists(data, firstName, lastName)) {
                errorLabel.innerHTML = "";

                //controllo se taxista oppure cliente
                if (userData.isTaxi) {
                    window.location = "../../pages/taxiUC.html";

                }
                else if (!userData.isTaxi) {
                    window.location = "../../pages/clientiUC.html";

                }
            }
            else {
                errorLabel.innerHTML = "Password o Nome utente errati.";
                errorLabel.style.color = "red";
            }
        });
    });


//Confronta dati 
function checkUserExists(data, firstName, lastName) {
    const foundUser = data.users.find(user => user.firstName === firstName && user.lastName === lastName);
    if (data.users.some(user => user.firstName === firstName && user.lastName === lastName)) {

        //istanzio l'utente come SINGLETON per tutta la sessione
        localStorage.setItem('userData', JSON.stringify(foundUser));
        userData = JSON.parse(localStorage.getItem('userData'));

        return true;
    }
    return false;
}


