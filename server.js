const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();


// Serve i file statici nella cartella public
app.use(express.static('src'));


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
                    <div class="d-flex justify-content-center">
                    <button onclick="window.location.href = 'login';" class="log">Login</button>
                    <button onclick="window.location.href = 'register';" class="reg">Sign up</button>
                    </div>
                </div>
            </section>

            <footer class="fixed-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-4">
                            <h3>Autori del progetto:</h3>
                            <ul>
                                <li>Abdu</li>
                                <li>Daniel</li>
                                <li>Giada</li>
                            </ul>
                        </div>
                        <div class="col-md-4 col-3">
                            <h3 class="text-center">Scuola:</h3>
                            <p>CPT Locarno</p>
                            <p>I3a - Sviluppatori</p>
                        </div>
                        <div class="col-md-4 col-5">
                            <h3>Link utili:</h3>
                            <ul>
                                <li><a href="https://developers.google.com/maps/documentation?hl=it">Maps API</a></li>
                                <li><a href="#">Presentation PowerPoint</a></li>
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





app.get('/taxiUC', (req, res) => {


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
            <h3>Richieste - In corso</h3>
          </div>
          <div id="inCorso"></div>
          <div>
            <h3>Richieste - In sospeso</h3>
          </div>
          <div id="inAttesa"></div>
        </section>
    
        <!--SCRIPT-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="/js/menu.js"></script>
        <script type="text/javascript" src="/js/taxiUC_disponibilita_accettaCorsa_prenotazioniFiltrate.js"></script>
        <script type="text/javascript" src="/js/onload_index.js"></script>
        <script type="text/javascript">

        </script>
      </body>
    </html>
  `);
    res.end();

    //Inizializzo utente loggato
    const userData = JSON.parse(req.query.userData);

    // leggere il contenuto del file
    fs.readFile(path.join(__dirname, 'src/data.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // convertire il contenuto in un oggetto
        const obj = JSON.parse(data);

        // trovare l'utente con userId loggato e modificare lo status
        obj.users.forEach(user => {
            if (user.userId === userData.userId) {
                user.status = userData.status;
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



app.get('/clientiUC', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.write(`
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>Taxi</title>
        <meta name="viewport" content="width=device-width, initial-scale=0.8">
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/menu.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    
    </head>
    
    <body onload="startUp()">
        
            
                <!--MENU-->
                <div class="col-sm-12" id="containerMenu"></div>
    
                <section class="content mt-3 justify-content-center text-center">
                    <h3>Inserisci i seguenti dati:</h3>
                    <div class="block p-2 mt-2">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <label for="start" class="h4">Posizione di partenza:</label><br />
                                <input type="text" id="start" placeholder="Inserisci la posizione di partenza"> /
                                <button onclick="usaPosizioneCorrente()">Mia posizione</button><br />
                                <label for="end" class="h4">Destinazione:</label><br />
                                <input type="text" id="end" placeholder="Inserisci la destinazione">
                                <br><br>
                                <button onclick="calcolaIndicazioni()">Invia</button>
                                <br><br>
                            </div>
                            <div class="col-6">
                                <div class="block mt-2" id="map"></div>
                                <div id="indicazioni"></div>
                                <div id="availableTaxi"></div>
                            </div>    
                        </div>
                    </div>
                    <div class="block">
                        <div>
                            <h1>La tua corsa è stata accettata, il tassista ti contatterà a breve</h1>
                        </div>
                    </div>

                    </diV>

                    
                </section>
                
    
        <!--real key AIzaSyC6vzkzpZK90_Z332xUtnL9rxWZ_es8qHE-->
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASCBj4N9KGXvIamrcz5oZUlxyOA-L8kWE&callback=initMap&libraries=places"
            async></script>
    



        <!--SCRIPT-->
        <script src="/js/clientiUC_maps_availability_indicazioni.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="/js/menu.js"></script>
        <script type="text/javascript" src="/js/onload_index.js"></script>
    
    </body>
    
    </html>
    `)
    res.end();


    // leggere il contenuto del file
    fs.readFile(path.join(__dirname, 'src/prenotazioni.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // convertire il contenuto in un oggetto
        const obj = JSON.parse(data);

        // convertire l'oggetto modificato in una stringa JSON
        const json = JSON.stringify(obj);
        let newJson;
        if (prenotazione.id_cliente == undefined) {
            newJson = json;
        } else {
            const forAdd = json.slice(0, -2);
            newJson = forAdd.concat(",", prenotazioneJSON, "]}");
        }

        // scrivere la stringa JSON nel file
        fs.writeFile(path.join(__dirname, 'src/prenotazioni.json'), newJson, 'utf8', (err) => {
            if (err) throw err;
            console.log('Prenotazione aggiunto');
        });
    });


});



app.get('/login', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.write(`
    <html>

<head>
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=0.8">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/menu.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body>
            <!--MENU-->
            <div class="col-sm-12 col-12" id="containerMenu"></div>

            <section class="content mt-3">
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <form class="flex-column block p-3">
                        <label>Nome Utente</label>
                        <input type="text" id="nomeUtente"><br/>
                        <label class="mt-2">Password</label>
                        <input type="password" id="password"><br/>
                        <button class="log mt-2" type="submit">Submit</button>
                    </form>
                </div>
            </section>

            <footer class="fixed-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-4">
                        <h3>Autori del progetto:</h3>
                        <ul>
                            <li>Abdu</li>
                            <li>Daniel</li>
                            <li>Giada</li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-3">
                        <h3 class="text-center">Scuola:</h3>
                        <p>CPT Locarno</p>
                        <p>I3a - Sviluppatori</p>
                    </div>
                    <div class="col-md-4 col-5">
                        <h3>Link utili:</h3>
                        <ul>
                            <li><a href="https://developers.google.com/maps/documentation?hl=it">Maps API</a></li>
                            <li><a href="#">Presentation PowerPoint</a></li>
                            <li><a href="#">Documentazione</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>


    <!--SCRIPT-->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="/js/menu.js"></script>
    <script type="module" src="/js/login_checker.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>



</body>

</html>
    `)
    res.end();
});


app.get('/register', (req, res) => {
    res.header('Content-Type', 'text/html');
    const newdata = {
        isTaxi: false,
        userId: 0,
        lastName: req.query.lastName,
        firstName: req.query.firstName,
        nomeUtente: req.query.nomeUtente,
        password: req.query.password,
        status: 0,
        currentPosition: req.query.currentPosition,
        car: req.query.car
    }
    if (!(newdata.firstName == undefined)) {
        res.writeHead(302, { 'Location': '/login' });
    }
    res.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Registration</title>
        <meta name="viewport" content="width=device-width, initial-scale=0.8">
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/menu.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
   
                <!--MENU-->
                <div class="col-sm-12 col-12" id="containerMenu"></div>
                <section class="content mt-3">
                    <div>
                        <h1>Registrazione</h1>
                    </div>
                    <div>
                        <form class="flex-column justify-content-center block p-3">
                            <label>Nome:</label>
                            <input type="text" name="firstName" required><br/>
    
                            <label class="mt-2">Cognome:</label>
                            <input type="text" name="lastName" required><br/>

                            <label class="mt-2">Posizione:</label>
                            <input type="text" name="currentPosition" required><br/>

                            <label class="mt-2">Macchina:</label>
                            <input type="text" name="car" required><br/>
    
                            <label class="mt-2">Nome Utente:</label>
                            <input type="text" name="nomeUtente" required><br/>
    
                            <label class="mt-2">Password:</label>
                            <input type="password" name="password" required><br/>
    
                            <button class="log mt-2" type="submit">Submit</button>
                        </form>
                    </div>
                </section>
            <footer class="fixed-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-4">
                        <h3>Autori del progetto:</h3>
                        <ul>
                            <li>Abdu</li>
                            <li>Daniel</li>
                            <li>Giada</li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-3">
                        <h3 class="text-center">Scuola:</h3>
                        <p>CPT Locarno</p>
                        <p>I3a - Sviluppatori</p>
                    </div>
                    <div class="col-md-4 col-5">
                        <h3>Link utili:</h3>
                        <ul>
                            <li><a href="https://developers.google.com/maps/documentation?hl=it">Maps API</a></li>
                            <li><a href="#">Presentation PowerPoint</a></li>
                            <li><a href="#">Documentazione</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="/js/menu.js"></script>
        <!--<script type="module" src="/js/login_checker.js"></script>-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>

    `)
    res.end();



    // leggere il contenuto del file
    fs.readFile(path.join(__dirname, 'src/data.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // convertire il contenuto in un oggetto
        const obj = JSON.parse(data);

        var maxId = 0;
        // trovare userID più grande
        obj.users.forEach(user => {
            if (user.userId > maxId) {
                maxId = user.userId
            }
        });

        newdata.userId = maxId + 1;

        const newDataJson = JSON.stringify(newdata);

        // convertire l'oggetto modificato in una stringa JSON
        const json = JSON.stringify(obj);
        let newJson;
        if (newdata.firstName == undefined) {
            newJson = json;
        } else {
            const forAdd = json.slice(0, -2);
            newJson = forAdd.concat(",", newDataJson, "]}");
        }

        // scrivere la stringa JSON nel file
        fs.writeFile(path.join(__dirname, 'src/data.json'), newJson, 'utf8', (err) => {
            if (err) throw err;
            console.log('Utente aggiunto');
        });
    });

});




// Avvia l'applicazione Express
app.listen(3000, () => {
    console.log('Express app listening on port 3000');

});
