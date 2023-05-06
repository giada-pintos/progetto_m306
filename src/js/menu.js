
//menu apposito per il tipo di cliente che sei
var link = "login";
var account = "";
try {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData.isTaxi === true) {
        account = "Taxi";
        link = "taxiUC";
    }
    else if (userData.isTaxi === false) {
        account = "Cliente";
        link = "clientiUC";
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
                <li><a style="color: white;" href="#">Projec<span class="space">t</span></a></li>
                <li><a style="color: white;" href="#">Contac<span class="space">t</span></a></li>
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