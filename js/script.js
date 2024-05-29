'use strict';
const Json_file = 'cities.json';

// formulier
function validateForm() {
  return new Promise((resolve, reject) => {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");

    let isValid = true;


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


    let validatieBericht = document.getElementById("validatieBericht");
    if (!isValid) {
        validatieBericht.innerText = "Vul alle verplichte velden in.";
        validatieBericht.classList.add("error");
        reject("form is niet goed gevalideerd");
    } else {
        validatieBericht.innerText = "Formulier succesvol ingediend!";
        validatieBericht.classList.remove("error");
        document.getElementById("contact_form").reset(); 
        resolve("form is goed gevalideerd")
        

        
    }
  });
}
validateForm()
  .then((message) => {
    console.log(message); 
  })
  .catch((error) => {
    console.error(error); 
  });
// weather app
const getWeatherByPostalCode = async () => {
    try {
        
        const postalCode = document.getElementById('postalCodeInput').value;
        const response = await fetch(Json_file);
        const data = await response.json();
       
        const city = data.find(city => city.postalCode === postalCode);
        if (city) {
            clearWeather('weatherByPostalCode');
            displayWeather(city, 'weatherByPostalCode');
        } else {
            
            alert('City not found.');
        }
    } catch {
        console.error('Error fetching data');
    }
};

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


// self executing subscription popup
(function() {

    const isSubscribed = localStorage.getItem('subscribed');
  
  
    if (!isSubscribed) {
  
        const popup = document.createElement('div');
        popup.classList.add('popup');

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
  
       
    
        document.getElementById('closePopup').addEventListener('click', () => {
          popup.style.display = 'none';
        });


        function submitCallback(event) {
            event.preventDefault(); 
            localStorage.setItem('subscribed', true);
            alert('Bedankt voor uw abonnement!');
            popup.style.display = 'none';
        }

        document.getElementById('subscribeForm').addEventListener('submit', submitCallback);
        
    }
  })();
  

 // Spread operator
  let spreads = [];
  
  function addSpread(){
    let spreadInput = document.getElementById('spreadInput').value.trim();
    spreads.push(parseFloat(spreadInput));
    document.getElementById('spreadInput').value = '';
    
    
  }
   function showSpread(){
    calculateMax(...spreads);
  }


  function calculateMax(...numbers) {
    let spread = document.getElementById('spread');
    spread.innerHTML = Math.max(...numbers);
  }

  const clearSpread = () => {
    document.getElementById('spreadInput').value = '';
  };

localStorage.clear();