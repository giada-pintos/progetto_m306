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
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            if (checkUserExists(data, firstName, lastName)) {
                errorLabel.innerHTML = "";
                if (userData.isTaxi) {
                    window.location = "../../pages/taxiUC.html";
                } else {
                    window.location = "../../pages/clientiUC.html";
                }
            } else {
                errorLabel.innerHTML = "Password o Nome utente errati.";
                errorLabel.style.color = "red";
            }
        });
    });

function checkUserExists(data, firstName, lastName) {
    const foundUser = data.users.find(user => user.firstName === firstName && user.lastName === lastName);
    if (foundUser) {
        localStorage.setItem('userData', JSON.stringify(foundUser));
        userData = foundUser;
        return true;
    }
    return false;
}


