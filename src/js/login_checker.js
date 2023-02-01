
//Cattura dati dal json
fetch('https://api.npoint.io/1853f3e2c5fc0070977e')
    .then(response => response.json())
    .then(data => {
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            console.log(checkUserExists(data, firstName, lastName));
        });
    });


//Confronta dati 
function checkUserExists(data, firstName, lastName) {
    return data.users.some(user => user.firstName === firstName && user.lastName === lastName);
}

