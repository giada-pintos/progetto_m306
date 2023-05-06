var userData = JSON.parse(localStorage.getItem('userData'));

$(document).ready(function () {
    var inCorso = document.getElementById("inCorso");
    inCorso.innerHTML = "";

    //filtrare le prenotazioni e conoscere il nome di un utente grazie a id_cliente
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            fetch('/prenotazioni.json')
                .then(response => response.json())
                .then(prenotazioni => {
                    var prenotazioniFiltrate = prenotazioni.prenotazioni.filter(prenotazione => prenotazione.terminata === false && prenotazione.id_tassista === userData.userId);
                    const clienti = data.users;
                    prenotazioniFiltrate.forEach(prenotazione => {
                        const cliente = clienti.find(c => c.userId === prenotazione.id_cliente);
                        console.log("Prenotazione ID: " + prenotazione.id_cliente + ", Nome: " + cliente.firstName + ", Cognome: " + cliente.lastName);


                        //creazione di una sezione per ogni tassista disponibile
                        var richiesta = document.createElement("section");
                        const name = document.createElement("h2");
                        const tragitto = document.createElement("h2");

                        //tragitto
                        tragitto.textContent = "Da " + prenotazione.start + " a " + prenotazione.end;
                        tragitto.setAttribute("align", "right");

                        //name
                        name.textContent = cliente.firstName + " " + cliente.lastName;

                        //inAttesa � in style, per modificare la grafica delle richieste in attesa per favore utilizzare solo quello
                        richiesta.setAttribute("class", "inAttesa");
                        richiesta.appendChild(name);
                        richiesta.appendChild(document.createElement("br"));
                        richiesta.appendChild(tragitto);
                        inCorso.appendChild(richiesta);
                    });

                    var inAttesa = document.getElementById("inAttesa");
                    inAttesa.innerHTML = "";

                    //disabilito la possibilita di prendere altri clienti se ce gia una prenotazione in corso, oppure se il tassista � in status 0
                    if (prenotazioniFiltrate.length > 0 || userData.status === 0) {
                        inAttesa.style.display = "none";

                    }

                    //filtrare le prenotazioni e conoscere il nome di un utente grazie a id_cliente
                    const prenotazioniFiltrateDisponibili = prenotazioni.prenotazioni.filter(prenotazione => prenotazione.terminata === false && prenotazione.id_tassista === null);
                    prenotazioniFiltrateDisponibili.forEach(prenotazione => {
                        const cliente = clienti.find(c => c.userId === prenotazione.id_cliente);
                        console.log("Prenotazione ID: " + prenotazione.id_cliente + ", Nome: " + cliente.firstName + ", Cognome: " + cliente.lastName);

                        //creazione di una sezione per ogni corsa disponibile
                        var richiesta = document.createElement("section");
                        const name = document.createElement("h2");
                        const tragitto = document.createElement("h2");
                        const prezzo = document.createElement("h2");
                        const accettaCorsa = document.createElement("button");

                        //prezzo
                        prezzo.textContent = prenotazione.prezzo + " CHF";

                        //button accettazione corsa
                        accettaCorsa.textContent = "Accetta corsa";
                        accettaCorsa.setAttribute("onclick", "accettaCorsa()");

                        //tragitto
                        tragitto.textContent = "Da " + prenotazione.start + " a " + prenotazione.end;
                        tragitto.setAttribute("align", "right");


                        //name
                        name.textContent = cliente.firstName + " " + cliente.lastName;


                        //inAttesa � in style, per modificare la grafica delle richieste in attesa per favore utilizzare solo quello
                        richiesta.setAttribute("class", "inAttesa");
                        richiesta.appendChild(name);
                        richiesta.appendChild(document.createElement("br"));
                        richiesta.appendChild(tragitto);
                        richiesta.appendChild(prezzo);
                        richiesta.appendChild(accettaCorsa);
                        inAttesa.appendChild(richiesta);
                    });
                });
        });
});


function accettaCorsa() {
    alert("corsa accettata");
}

$(document).ready(function () {
    // Otteniamo il nome e il cognome dall'oggetto userData
    const nomeCognome = userData.firstName + " " + userData.lastName;

    // Aggiorniamo il testo nel div #nome_cognome
    $("#nome_cognome").text(nomeCognome);

    //se status è su 1 allora il tassista è disponibile
    if (userData.status == 1) {
        $('input[type="checkbox"]').prop("checked", true);
        $("#inAttesa").show(); // rendi il div #inAttesa visibile
    } else {
        $('input[type="checkbox"]').prop("checked", false);
        $("#inAttesa").hide(); // nascondi il div #inAttesa
    }

    // Salviamo l'oggetto userData nella localStorage al cambio di stato del checkbox
    $("#myStatus").change(function () {
        var status = ($(this).is(":checked")) ? 1 : 0;
        userData.status = status;
        localStorage.setItem("userData", JSON.stringify(userData));


        // rendi il div #inAttesa visibile o lo nascondi
        if (userData.status == 1) {
            $("#inAttesa").show();
        } else {
            $("#inAttesa").hide();
        }
    });
});

