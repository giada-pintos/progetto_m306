const form = document.querySelector('form');
let userData = null;
const errorLabel = document.createElement("label");
errorLabel.innerHTML = "";
form.appendChild(errorLabel);

fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const nomeUtente = document.querySelector('#nomeUtente').value;
            const password = document.querySelector('#password').value;
            if (checkUserExists(data, nomeUtente, password)) {
                errorLabel.innerHTML = "";
                if (userData.isTaxi) {
                    window.location = "taxiUC";
                } else {
                    window.location = "clientiUC";
                }
            } else {
                errorLabel.innerHTML = "Password o Nome utente errati.";
                errorLabel.style.color = "red";
            }
        });
    });

function checkUserExists(data, nomeUtente, password) {
    const foundUser = data.users.find(user => user.nomeUtente === nomeUtente && user.password === password);
    if (foundUser) {
        localStorage.setItem('userData', JSON.stringify(foundUser));
        userData = foundUser;
        return true;
    }
    return false;
}


