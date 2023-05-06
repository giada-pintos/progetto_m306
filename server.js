const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


// Serve i file statici nella cartella public
app.use(express.static('src'));

// Crea una route index
app.get('/index', (req, res) => {

    res.header('Content-Type', 'text/html');
    res.write(`
    
    <html>
        <head>
            <title>Taxi App</title>
            <link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="/css/menu.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body onload="startUp()">
            <!--MENU-->
            <div id="containerMenu"></div>

            <section class="content">
                <h1>Progetto m306 "The taxi app"<img src="/img/taxi_logo.png" width="50px" height="50px" /></h1>
                <div class="block">
                    <p>Siamo un gruppo di giovani studenti della CPT di Locarno</p>
                    <button onclick="window.location.href = 'pages/authentication/login.html';" class="log">Login</button>
                    <button onclick="window.location.href = 'pages/authentication/login.html';" class="reg">Sign up</button>
                </div>
            </section>

            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>Autori del progetto:</h3>
                            <ul>
                                <li>Abdu</li>
                                <li>Daniel</li>
                                <li>Giada</li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h3 class="text-center">Scuola:</h3>
                            <p>CPT Locarno</p>
                            <p>I3a - Sviluppatori</p>
                        </div>
                        <div class="col-md-4">
                            <h3>Link utili:</h3>
                            <ul>
                                <li><a href="#">Maps API</a></li>
                                <li><a href="#">Translate API</a></li>
                                <li><a href="#">Documentazione</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <!--SCRIPT-->
            <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
                    async></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
            <script type="text/javascript" src="js/onload_index.js"></script>
            <script type="text/javascript" src="js/menu.js"></script>
        </body>
    </html>

  `);

    res.end();
});





app.get('/pages/taxiUC', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.write(`
    <html>
      <head>
        <title>Taxi</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/menu.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
      <body onload="startUp()">
        <!--MENU-->
        <div id="containerMenu"></div>
        <section class="content">
          <div id="nome_cognome_disponibilita">
            <h2 id="nome_cognome"></h2>
            <label class="switch">
              <input type="checkbox" id="myStatus">
              <span class="slider round"></span>
            </label>
          </div>
          <div>
            <h2>Richieste - In corso</h2>
          </div>
          <div id="inCorso"></div>
          <div>
            <h2>Richieste - In sospeso</h2>
          </div>
          <div id="inAttesa"></div>
        </section>
    
        <!--SCRIPT-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="/js/menu.js"></script>
        <script type="text/javascript" src="/js/taxiUC_disponibilita_accettaCorsa_prenotazioniFiltrate.js"></script>
        <script type="text/javascript" src="/js/onload_index.js"></script>
        <script type="text/javascript">
            var userData = JSON.parse(localStorage.getItem('userData'));
            console.log(userData);

            $("#myStatus").change(function () {
                var status = ($(this).is(":checked")) ? 1 : 0;
                userData.status = status;
                console.log(userData);

                // rendi il div #inAttesa visibile o lo nascondi
                if (userData.status == 1) {
                    $("#inAttesa").show();
                } else {
                    $("#inAttesa").hide();
                }
            });

        </script>
      </body>
    </html>
  `);
    res.end();


    // leggere il contenuto del file
    fs.readFile(path.join(__dirname, 'src/data.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // convertire il contenuto in un oggetto
        const obj = JSON.parse(data);

        // trovare l'utente con userId 1 e modificare lo status
        obj.users.forEach(user => {
            if (user.userId === 1) {
                user.status = 0;
            }
        });

        // convertire l'oggetto modificato in una stringa JSON
        const json = JSON.stringify(obj);

        // scrivere la stringa JSON nel file
        fs.writeFile(path.join(__dirname, 'src/data.json'), json, 'utf8', (err) => {
            if (err) throw err;
            console.log('Status modificato');
        });
    });


});





// Avvia l'applicazione Express
app.listen(3000, () => {
    console.log('Express app listening on port 3000');

});
