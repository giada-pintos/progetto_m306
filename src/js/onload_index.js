//Inizializzo il mio
var userData = JSON.parse(localStorage.getItem('userData'));

function startUp(user) {
    const geocoder = new google.maps.Geocoder();
    const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latLng = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                geocoder.geocode({ location: latLng }, (results, status) => {
                    if (status === "OK") {
                        const address = results[0].formatted_address;
                        user.currentPosition = address;
                        console.log(`Position updated for ${user.firstName} ${user.lastName}`);
                    } else {
                        console.error(`Geocode failed due to: ${status}`);
                    }
                });
            },
            error => console.error(`Position error: ${error.message}`),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, 30000);
    return interval;
}

const intervalId = startUp(userData);