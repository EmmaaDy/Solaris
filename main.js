// main.js
import { createStarSky } from './js/starSky.js';
import { fetchData, showPopupInfo, fetchApiKey } from './js/planetInfo.js'; // Importera fetchApiKey också
createStarSky();

let bodies; // Global variabel för att lagra planetdata

async function initialize() {
    try {
        // Hämta API-nyckeln först
        await fetchApiKey();

        // Hämta planetdata
        bodies = await fetchData();
        console.log(bodies);

        // Hämta sökrutan och sökknappen
        const searchField = document.querySelector('#search');
        const searchBtn = document.querySelector('#searchBtn');

        // Lägg till en klick-händelse på sökknappen
        searchBtn.addEventListener('click', async () => {
            // Hämta söktermen från sökrutan
            const searchTerm = searchField.value.toLowerCase();

            // Filtrera planetdata baserat på söktermen
            const searchResults = bodies.filter((body) => body.name.toLowerCase().includes(searchTerm));

            // Visa informationen om den första planeten i sökresultatet
            if (searchResults.length > 0) {
                // Visa popup-fönstret med planetens information
                showPopupInfo(searchResults[0]);
            } else {
                // Visa ett meddelande om ingen himlakropp hittades
                console.log('No planet found.');
            }
        });

        // Hämta alla planet-info-element
        const planetInfos = document.querySelectorAll('.planet-info');

        // Lägg till en klickhändelse till varje planet-info-element
        planetInfos.forEach(planetInfo => {
            planetInfo.addEventListener('click', () => {
                // Hämta planetens namn baserat på dess id-attribut
                const planetName = planetInfo.id.replace('Info', '');

                // Hitta planeten i bodies-arrayen baserat på namnet
                const planet = bodies.find(body => body.name === planetName);

                // Visa popup-fönstret med planetens information
                showPopupInfo(planet);
            });
        });

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

// Kör initialize när sidan laddas
window.addEventListener('DOMContentLoaded', initialize);

