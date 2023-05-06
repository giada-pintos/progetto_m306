var map, geocoder, start, end, prezzo;
var userData = JSON.parse(localStorage.getItem('userData'));



function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 46.97447029890155, lng: 8.248959611213872 },
  });
  directionsRenderer.setMap(map);

  var autocompleteStart = new google.maps.places.Autocomplete(
    document.getElementById("start")
  );
  var autocompleteEnd = new google.maps.places.Autocomplete(
    document.getElementById("end")
  );


  map.addListener("click", function (event) {
    // Crea il link con la posizione di partenza e destinazione scelte dall'utente
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var link =
      "https://www.google.com/maps/dir/?api=1&" +
      "origin=" +
      encodeURI(start) +
      "&destination=" +
      encodeURI(end) +
      "&travelmode=driving";

    // Apri l'applicazione Google Maps con il link creato
    if (start != "" && end != "") {
      window.open(link);
    }
  });
}






function calcolaIndicazioni() {
  start = document.getElementById("start").value;
  end = document.getElementById("end").value;

  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "blue",
    },
  });

  directionsRenderer.setMap(map);

  var request = {
    origin: start,
    destination: end,
    travelMode: "DRIVING",
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);

      var distanza = result.routes[0].legs[0].distance.text;
      var tempo = result.routes[0].legs[0].duration.text;
      var prezzo_partenza = 20;
      prezzo = prezzo_partenza + (parseFloat(distanza) * 2.8);

      document.getElementById("indicazioni").innerHTML =
      '<div class="card">' +
      '<div class="card-body">' +
        '<h3 class="card-title">Distanza: ' + distanza + '</h3>' +
        '<p class="card-text">Tempo di percorrenza: ' + tempo + '</p>' +
        '<p class="card-text">Prezzo: ' + prezzo + ' CHF</p>' +
        '<button class="btn btn-primary" onclick="availabilityCheck()">Controlla disponibilità</button>' +
        '<button class="btn btn-primary" id="prenotazioneBtn" onclick="prenota()" disabled>Prenota Corsa</button>' +
      '</div>' +
    '</div>';

    }
  });
}


function availabilityCheck() {
  var myTaxist = document.getElementById("availableTaxi");
  myTaxist.innerHTML = "";

  fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      const taxiUsers = data.users.filter(user => user.isTaxi === true && user.status === 1);

      if (taxiUsers.length > 0) {
        taxiUsers.forEach(user => {
          //creazione di una sezione per ogni tassista disponibile
          var singleTaxist = document.createElement("section");
          const text = document.createElement("h2");
          const status = document.createElement("h2");

          //status
          status.textContent = `LIBERO`;
          status.setAttribute("align", "right");
          status.style.color = 'green';

          //contenuto della piccola box
          text.textContent = `${user.firstName} ${user.lastName} - ${user.car}`;

          //availableTaxi � in style, per modificare la grafica dei tassisti disponibili per favore utilizzare solo quello
          singleTaxist.setAttribute("class", "availableTaxi");
          singleTaxist.appendChild(text);
          singleTaxist.appendChild(document.createElement("br"));
          singleTaxist.appendChild(status);
          myTaxist.appendChild(singleTaxist);
        });

        document.getElementById("prenotazioneBtn").disabled = false;

      }
      else {
        document.getElementById("prenotazioneBtn").disabled = true;

      }
    })
    .catch(error => console.error(error));
}



function prenota() {
    const metodoPagamento = prompt("Inserisci il metodo di pagamento (es. carta di credito, PayPal):");
    const importo = prezzo; // Importo simulato da pagare
    const confermaPagamento = confirm(`Confermi il pagamento di ${importo}� con ${metodoPagamento}?`);

    if (confermaPagamento) {
        const prenotazione = {
            id_cliente: userData.userId,
            id_tassista: null,
            start: start,
            end: end,
            prezzo: prezzo,
            metodoPagamento: metodoPagamento,
        };

        // Converti l'oggetto prenotazione in una stringa JSON
        const prenotazioneJSON = JSON.stringify(prenotazione);

        // Fai qualcosa con la stringa JSON, ad esempio inviala al server
        console.log(prenotazioneJSON);

        // Codice per eseguire il pagamento
        alert("Pagamento effettuato con successo!");
    } else {
        alert("Pagamento annullato.");
    }
}




function usaPosizioneCorrente() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      geocoder.geocode({ location: pos }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            document.getElementById("start").value = results[0].formatted_address;
          } else {
            window.alert("Nessun risultato trovato");
          }
        } else {
          window.alert("Geocoder fallito: " + status);
        }
      });
    });
  } else {
    window.alert("Geolocalizzazione non supportata da questo browser");
  }
}