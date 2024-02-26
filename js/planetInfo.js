// planetInfo.js

let apiKey; // Global variabel för att lagra API-nyckeln

// Funktion för att hämta API-nyckeln
export async function fetchApiKey() {
    try {
        // Skicka en POST-begäran till servern för att hämta API-nyckeln
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
            method: 'POST', // Använder POST-metoden för att hämta API-nyckeln
        });
        // Omvandla svaret till JSON
        const data = await resp.json();
        // Spara API-nyckeln i den globala variabeln
        apiKey = data.key;
    } catch (error) {
        // Om något går fel, logga felet och kasta det igen
        console.error('Error fetching API key:', error);
        throw error;
    }
}

// Funktion för att hämta data
export async function fetchData() {
    try {
        // Om API-nyckeln inte är hämtad än, hämta den först
        if (!apiKey) {
            await fetchApiKey(); // Anropa fetchApiKey-funktionen för att hämta nyckeln
        }

        // Skicka en GET-begäran till servern för att hämta data, med API-nyckeln i headers
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET', // Använder GET-metoden för att hämta planetdata
            headers: {'x-zocom': apiKey} // Skicka med API-nyckeln i headers för autentisering
        });
        // Omvandla svaret till JSON
        const data = await resp.json();
        // Returnera data
        return data.bodies;
    } catch (error) {
        // Om något går fel, logga felet och kasta det igen
        console.error('Error fetching data:', error);
        throw error;
    }
}


export function showPopupInfo(planet) {
    // Om det redan finns en öppen popup, stäng den
    if (document.querySelector('.popup-container')) {
        document.querySelector('.popup-container').remove();
    }

    // Skapa popup-container-element
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    // Skapa popup-content-element för att visa planetens information
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    // Skapa en h1 för planetens namn
    const nameH1 = document.createElement('h1');
    nameH1.textContent = `${planet.name}`;
    popupContent.appendChild(nameH1);

    // Skapa en h2 för planetens latinska namn
    const latinNameH2 = document.createElement('h2');
    latinNameH2.textContent = `${planet.latinName}`;
    popupContent.appendChild(latinNameH2);

    // Skapa en p för planetens beskrivning
    const descP = document.createElement('p');
    descP.textContent = `${planet.desc}`;
    popupContent.appendChild(descP);

    // Skapa en h2 för "OMKRETS:"
    const circumferenceH2 = document.createElement('h3');
    circumferenceH2.textContent = "OMKRETS:";
    popupContent.appendChild(circumferenceH2);

    // Skapa en p för planetens omkrets
    const circumferenceP = document.createElement('p');
    circumferenceP.textContent = `${planet.circumference} km`;
    popupContent.appendChild(circumferenceP);

    // Skapa en h2 för "KM FRÅN SOLEN:"
    const distanceFromSunH2 = document.createElement('h3');
    distanceFromSunH2.textContent = "KM FRÅN SOLEN:";
    popupContent.appendChild(distanceFromSunH2);

    // Skapa en p för planetens avstånd från solen
    const distanceFromSunP = document.createElement('p');
    distanceFromSunP.textContent = `${planet.distance} km`; // Uppdatera detta beroende på API:ets datastruktur
    popupContent.appendChild(distanceFromSunP);

    // Skapa en h2 för "TEMPERATUR DAG:"
    const dayTempH2 = document.createElement('h3');
    dayTempH2.textContent = "TEMPERATUR DAG:";
    popupContent.appendChild(dayTempH2);

    // Skapa en p för planetens dagtemperatur
    const dayTempP = document.createElement('p');
    dayTempP.textContent = `${planet.temp.day} C`; // Uppdatera detta beroende på API:ets datastruktur
    popupContent.appendChild(dayTempP);

    // Skapa en h2 för "TEMPERATUR NATT:"
    const nightTempH2 = document.createElement('h3');
    nightTempH2.textContent = "TEMPERATUR NATT:";
    popupContent.appendChild(nightTempH2);

    // Skapa en p för planetens natttemperatur
    const nightTempP = document.createElement('p');
    nightTempP.textContent = `${planet.temp.night} C`; // Uppdatera detta beroende på API:ets datastruktur
    popupContent.appendChild(nightTempP);

    // Skapa en h2 för "ETT VARV RUNT SOLEN:"
    const orbitalPeriodH2 = document.createElement('h3');
    orbitalPeriodH2.textContent = "ETT VARV RUNT SOLEN:";
    popupContent.appendChild(orbitalPeriodH2);

    // Skapa en p för planetens omloppstid runt solen
    const orbitalPeriodP = document.createElement('p');
    orbitalPeriodP.textContent = `${planet.orbitalPeriod} dygn`; // Uppdatera detta beroende på API:ets datastruktur
    popupContent.appendChild(orbitalPeriodP);

    // Skapa en h2 för "ETT VARV RUNT EGEN AXEL:"
    const rotationPeriodH2 = document.createElement('h3');
    rotationPeriodH2.textContent = "ETT VARV RUNT EGEN AXEL:";
    popupContent.appendChild(rotationPeriodH2);

    // Skapa en p för planetens rotationsperiod
    const rotationPeriodP = document.createElement('p');
    rotationPeriodP.textContent = `${planet.rotationPeriod} dygn`; // Uppdatera detta beroende på API:ets datastruktur
    popupContent.appendChild(rotationPeriodP);

    // Skapa en h2 för "MÅNAR:"
    const moonsH2 = document.createElement('h3');
    moonsH2.textContent = "MÅNAR:";
    popupContent.appendChild(moonsH2);

    // Skapa en p för antalet månar
    const moonsP = document.createElement('p');
    moonsP.textContent = `${planet.moons}`;
    moonsP.classList.add('moon-names'); // Lägg till klassen 'moon-names' till paragrafen
    popupContent.appendChild(moonsP);


    // Skapa stäng-knapp för popup-fönstret
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');

    // Lägg till stäng-knappen till popup-container
    popupContainer.appendChild(closeButton);

    // Lägg till popup-content till popup-container
    popupContainer.appendChild(popupContent);

    // Lägg till popup-container till body-elementet
    document.body.appendChild(popupContainer);

    // Lägg till klickhändelse till stäng-knappen för att stänga popup-fönstret
    closeButton.addEventListener('click', () => {
        popupContainer.remove();
    });

    // Lägg till keydown-händelse till document för att stänga popup-fönstret
    // när användaren trycker på Esc-tangenten
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            popupContainer.remove();
        }
    });
    // När popup-fönstret visas
    popupContainer.classList.add('popup-container-active');

    // När popup-fönstret göms
    popupContainer.classList.remove('popup-container-active');

    
}
