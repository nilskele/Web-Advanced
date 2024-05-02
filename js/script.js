
function validateForm() {
    // Elementen selecteren
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var messageError = document.getElementById("messageError");

    var isValid = true;

    // Elementen manipuleren
    if (name === "") {
        nameError.innerText = "Vul uw naam in";
        document.getElementById("name").classList.add("error");
        isValid = false;
    } else {
        nameError.innerText = "";
        document.getElementById("name").classList.remove("error");
    }


    if (email === "") {
        emailError.innerText = "Vul uw e-mailadres in";
        document.getElementById("email").classList.add("error");
        isValid = false;
    } else {
        emailError.innerText = "";
        document.getElementById("email").classList.remove("error");
    }


    if (message === "") {
        messageError.innerText = "Vul uw bericht in";
        document.getElementById("message").classList.add("error");
        isValid = false;
    } else {
        messageError.innerText = "";
        document.getElementById("message").classList.remove("error");
    }


    var validatieBericht = document.getElementById("validatieBericht");
    if (!isValid) {
        validatieBericht.innerText = "Vul alle verplichte velden in.";
        validatieBericht.classList.add("error");
    } else {
        validatieBericht.innerText = "Formulier succesvol ingediend!";
        validatieBericht.classList.remove("error");
        document.getElementById("contact_form").reset(); 
        

    }
}