// Localhost:3000 ga ulanamiz (o'zimizning backend serverga)
const socket = new WebSocket('ws://localhost:3000');

const display = document.getElementById('coefficient-number');

socket.onmessage = function(event) {
    const raw = event.data;

    // 1. Agar xabarda "next" bo'lsa, JSON.parse qilmasdan raqamni qidiramiz
    if (raw.includes('"next":[')) {
        // "next":[1.56] formatidan raqamni qirqib olish (Eng tezkor usul)
        const parts = raw.split('"next":[');
        if (parts[1]) {
            const val = parts[1].split(']')[0];
            display.textContent = parseFloat(val).toFixed(2) + "x";
            display.style.color = "white";
        }
    } 
    // 2. To'xtash xabari kelsa, darhol qizil qilish
    else if (raw.includes('stopCoefficient')) {
        const parts = raw.split('"finalValue":');
        if (parts[1]) {
            const val = parts[1].split('}')[0];
            display.textContent = parseFloat(val).toFixed(2) + "x";
            display.style.color = "red";
        }
    }
};
