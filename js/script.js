
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
  
    const cityName = document.createElement('h3');
    cityName.textContent = name;
    cityName.classList.add('city_name');
    weatherDiv.appendChild(cityName);
  
    const postalCode_nr = document.createElement('h3');
    postalCode_nr.textContent = postalCode;
    postalCode_nr.classList.add('city_postal_code');
    weatherDiv.appendChild(postalCode_nr);
  
    //spread
    for (const property in rest) {
      const propertyElement = document.createElement('h3');
      propertyElement.textContent = `${property}: ${rest[property]}`;
      propertyElement.classList.add(`city_${property}`);
      weatherDiv.appendChild(propertyElement);
    }
  
    document.getElementById(frameId).appendChild(weatherDiv);
  };
  const clearInput = () => {
    document.getElementById('postalCodeInput').value = '';
  };
  
const clearWeather = (frameId) => {
  const weatherDiv = document.getElementById(frameId);
  weatherDiv.innerHTML = '';
};

// Self-executing
(function() {

    const isSubscribed = localStorage.getItem('subscribed');
  
  
    if (!isSubscribed) {
  
        const popup = document.createElement('div');
        popup.classList.add('popup');
        //template literals
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Abonneer op onze nieuwsbrief</h2>
                <p>Blijf op de hoogte van onze laatste nieuwtjes en updates!</p>
                <form id="subscribeForm">
                    <input type="email" id="emailInput" placeholder="Voer uw e-mailadres in" required>
                    <button type="submit">Abonneren</button>
                </form>
                <button id="closePopup">Sluiten</button>
            </div>
        `;
        document.body.appendChild(popup);
  
        function popupClosedCallback() {
          console.log("Popup is toe zonder te submitten.");
        }
    
        document.getElementById('closePopup').addEventListener('click', () => {
          popup.style.display = 'none';
          popupClosedCallback(); 
        });
    
  
  
        document.getElementById('subscribeForm').addEventListener('submit', (event) => {
            event.preventDefault(); 
            const email = document.getElementById('emailInput').value;
            localStorage.setItem('subscribed', true);
            alert('Bedankt voor uw abonnement!');
            popup.style.display = 'none';
        });
    }
  })();
  