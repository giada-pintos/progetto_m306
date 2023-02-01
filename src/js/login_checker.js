//Cattura dati dal json
fetch('https://api.npoint.io/1853f3e2c5fc0070977e')
    .then(response => response.json())
    .then(data => {
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            console.log(data.users)
            console.log(checkUserExists(data, firstName, lastName));
        });
    });


//Confronta dati 
function checkUserExists(data, firstName, lastName) {
    const foundUser = data.users.find(user => user.firstName === firstName && user.lastName === lastName);
    if (data.users.some(user => user.firstName === firstName && user.lastName === lastName)) {
        const instance = Singleton.getInstance(foundUser);
        console.log(instance.userData);
        return true;
    }
    return false;
}


//Singleton per avere un utente per tutta la sessione
const Singleton = (function () {
    let instance;

    function createInstance(userData) {
        const object = new Object({ userData: userData });
        return object;
    }

    return {
        getInstance: function (userData) {
            if (!instance) {
                instance = createInstance(userData);
            }
            return instance;
        }
    };
})();
