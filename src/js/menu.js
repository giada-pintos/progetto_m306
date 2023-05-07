//menu apposito per il tipo di cliente che sei
var link = "login";
var account = "";
try {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData.isTaxi === true) {
        account = "Taxi";
        link = 'taxiUC?userData=' + encodeURIComponent(JSON.stringify(userData));
    }
    else if (userData.isTaxi === false) {
        account = "Cliente";
        link = 'clientiUC?userData=' + encodeURIComponent(JSON.stringify(userData));
    }
}
catch (ex) {
    link = "login";
    account = "Login";
}



// Selezioniamo l'elemento <div> con id "container"
var containerMenu = document.getElementById("containerMenu");

// Definiamo il codice HTML da inserire
var html = `
        <div class="navT">
            <div class="icon"></div>
        </div>

        <div id="menu">
            <ul>
                <li><a style="color: white;" href="/index">Hom<span class="space">e</span></a></li>
                <li><a style="color: white;" href="${link}">${account}<span class="space"></span></a></li>
                <li><a style="color: white;" href="/register">Registratio<span class="space">n</span></a></li>
                <li><a style="color: white;" href="#">Presentazio<span class="space">n</span></a></li>
            </ul>
        </div>
`;

// Inseriamo il codice HTML nell'elemento <div> con id "containerMenu"
containerMenu.innerHTML = html;


$(".navT").on("click", function () {
    $(this).toggleClass("active");
    $("#menu").toggleClass("open");
    $(".content").toggleClass("shift");
});