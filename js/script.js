
const Json_file = 'cities.json';


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

//async
const getWeatherByPostalCode = async () => {
    try {
        
        const postalCode = document.getElementById('postalCodeInput').value;
        // await
        const response = await fetch(Json_file);
        const data = await response.json();
       
        const city = data.find(city => city.postalCode === postalCode);
        if (city) {
            clearWeather('weatherByPostalCode');
            displayWeather(city, 'weatherByPostalCode');
        } else {
            
            alert('City not found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
//destructering, rest
const displayWeather = ({ name, postalCode, ...rest }, frameId) => {
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weatherData');
  
    const cityNameElement = document.createElement('h3');
    cityNameElement.textContent = name;
    cityNameElement.classList.add('city_name');
    weatherDiv.appendChild(cityNameElement);
  
    const postalCodeElement = document.createElement('h3');
    postalCodeElement.textContent = postalCode;
    postalCodeElement.classList.add('city_postal_code');
    weatherDiv.appendChild(postalCodeElement);
  
    //spread
    for (const property in rest) {
      const propertyElement = document.createElement('h3');
      propertyElement.textContent = `${property}: ${rest[property]}`;
      propertyElement.classList.add(`city_${property}`);
      weatherDiv.appendChild(propertyElement);
    }
  
    document.getElementById(frameId).appendChild(weatherDiv);
  };
  
const clearWeather = (frameId) => {
  const weatherDiv = document.getElementById(frameId);
  weatherDiv.innerHTML = '';
};