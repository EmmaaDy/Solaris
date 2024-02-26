export function createStarSky() {
    const starSky = document.getElementById('star-sky');

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Positionera stjärnan slumpmässigt
        star.style.top = Math.random() * document.body.scrollHeight + 'px';
        star.style.left = Math.random() * document.body.scrollWidth + 'px';

        // Skapa en unik animation för varje stjärna
        star.style.animation = `blink${i} 1s infinite`;

        // Lägg till stjärnan i stjärnhimlen
        starSky.appendChild(star);

        // Skapa en unik @keyframes regel för varje stjärna
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes blink${i} {
                0% {opacity: ${Math.random()};}
                50% {opacity: ${Math.random()};}
                100% {opacity: ${Math.random()};}
            }
        `;
        document.head.appendChild(style);
    }
}