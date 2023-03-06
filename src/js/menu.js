
//menu apposito per il tipo di cliente che sei
var link = "/progetto_m306/pages/authentication/login.html";
var account = "";
if (typeof userData === 'undefined') {
    account = "Login";
}
else if (userData.isTaxi) {
    account = "Taxi";
    link = "/progetto_m306/pages/taxiUC.html";
}
else {
    account = "Cliente";
    link = "/progetto_m306/pages/clientiUC.html";
}

// Selezioniamo l'elemento <div> con id "container"
var container = document.getElementById("container");

// Definiamo il codice HTML da inserire
var html = `
        <div class="navT">
            <div class="icon"></div>
        </div>

        <div id="menu">
            <ul>
                <li><a style="color: white;" href="/progetto_m306/index.html">Hom<span class="space">e</span></a></li>
                <li><a style="color: white;" href="${link}">${account}<span class="space"></span></a></li>
                <li><a style="color: white;" href="#">Projec<span class="space">t</span></a></li>
                <li><a style="color: white;" href="#">Contac<span class="space">t</span></a></li>
            </ul>
        </div>
`;

// Inseriamo il codice HTML nell'elemento <div> con id "container"
container.innerHTML = html;


$(".navT").on("click", function () {
    $(this).toggleClass("active");
    $("#menu").toggleClass("open");
    $(".content").toggleClass("shift");
});