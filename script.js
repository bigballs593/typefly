let timerInterval;
let startTime;
let correctLetters = 0;
let totalLetters = 0;
let airplaneProgress = 0;

const paragraphs = [
    "El sol brilla en el cielo azul. Los pájaros cantan en los árboles. Es un día perfecto para pasear por el parque.",
    "La tecnología ha transformado nuestra forma de vivir. Hoy en día, es difícil imaginar la vida sin internet o smartphones.",
    "Aprender un nuevo idioma es una aventura fascinante. Cada palabra nueva es un paso hacia una cultura diferente.",
    "La lectura es una puerta a mundos desconocidos. A través de los libros, podemos viajar sin movernos de casa.",
    "La naturaleza nos ofrece paisajes increíbles. Desde montañas majestuosas hasta playas tranquilas, siempre hay algo que admirar.",
    "La música es el lenguaje universal. No importa el idioma que hables, una buena canción siempre te emocionará.",
    "El deporte es esencial para mantener un estilo de vida saludable. Además, fomenta el trabajo en equipo y la disciplina.",
    "La gastronomía es una de las mejores formas de conocer una cultura. Cada platillo tiene una historia que contar.",
    "Viajar es una de las experiencias más enriquecedoras. Conocer nuevos lugares te abre la mente y el corazón.",
    "El arte es una expresión del alma. A través de él, podemos comunicar emociones que las palabras no pueden describir."
];

function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function highlightText(typedText, targetText) {
    const textDisplay = document.getElementById('text-display');
    let highlightedText = "";
    for (let i = 0; i < targetText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === targetText[i]) {
                highlightedText += `<span class="correct">${targetText[i]}</span>`;
            } else {
                highlightedText += `<span class="incorrect">${targetText[i]}</span>`;
            }
        } else {
            highlightedText += targetText[i];
        }
    }
    textDisplay.innerHTML = highlightedText;
}

let currentText = getRandomParagraph();
totalLetters = currentText.length;

document.getElementById('text-display').textContent = currentText;

const typingInput = document.getElementById('typing-input');
typingInput.addEventListener('input', () => {
    correctLetters = 0;
    const typedText = typingInput.value;
    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) {
            correctLetters++;
        }
    }
    airplaneProgress = (correctLetters / totalLetters) * 100;
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const speed = Math.floor((correctLetters / 5) / (timeElapsed / 60));
    const accuracy = Math.floor((correctLetters / typedText.length) * 100);
    
    document.getElementById('speed').textContent = speed;
    document.getElementById('accuracy').textContent = accuracy;
    
    const airplane = document.querySelector('.airplane');
    airplane.style.left = `${airplaneProgress}%`;
    
    highlightText(typedText, currentText);
    
    if (typedText === currentText) {
        clearInterval(timerInterval);
        typingInput.disabled = true;
        setTimeout(() => {
            refreshBtn.click();
        }, 1000);
    }
});

function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Tiempo: ${timeElapsed}s`;
}

const refreshBtn = document.getElementById('refresh-btn');
refreshBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = null;
    correctLetters = 0;
    currentText = getRandomParagraph();
    totalLetters = currentText.length;
    document.getElementById('text-display').textContent = currentText;
    document.getElementById('typing-input').value = '';
    document.getElementById('speed').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    document.getElementById('timer').textContent = 'Tiempo: 0s';
    
    const airplane = document.querySelector('.airplane');
    airplane.style.left = '0';
    typingInput.disabled = false;
    typingInput.focus();
});
