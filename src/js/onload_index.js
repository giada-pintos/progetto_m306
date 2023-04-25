//Inizializzo il mio
var userData = JSON.parse(localStorage.getItem('userData'));



function startUp() {

    // inizializza l'API di Google Maps
    const mapsApiKey = 'AIzaSyASCBj4N9KGXvIamrcz5oZUlxyOA-L8kWE';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
    document.head.appendChild(script);

    // definisci la funzione per ottenere la posizione attuale
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('La geolocalizzazione non è supportata dal tuo browser');
            } else {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        resolve(currentPosition);
                    },
                    error => {
                        reject(`Errore nella geolocalizzazione: ${error.message}`);
                    }
                );
            }
        });
    }

    // aggiorna la posizione ogni 30 secondi
    setInterval(() => {
        getCurrentPosition()
            .then(currentPosition => {
                console.log(currentPosition.toString());
            })
            .catch(error => {
                console.error(error);
            });
    }, 30000);
}
