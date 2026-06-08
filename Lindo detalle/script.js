// ============== CONFIGURACIÓN GENERAL ==============
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
let isMusicPlaying = false;

// ============== GENERAR CORAZONES FLOTANTES ==============
function createHeart() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Posición aleatoria horizontal
    const randomLeft = Math.random() * 100;
    heart.style.left = randomLeft + '%';
    
    // Tamaño aleatorio
    const randomSize = Math.random() * 1.5 + 0.5;
    heart.style.fontSize = (randomSize * 1.5) + 'rem';
    
    // Duración aleatoria
    const randomDuration = Math.random() * 5 + 15;
    heart.style.animationDuration = randomDuration + 's';
    
    // Retraso aleatorio
    const randomDelay = Math.random() * 2;
    heart.style.animationDelay = randomDelay + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remover el corazón después de que termine la animación
    setTimeout(() => {
        heart.remove();
    }, (randomDuration + randomDelay) * 1000);
}

// Crear corazones cada cierto tiempo
setInterval(createHeart, 500);

// ============== CONTROL DE MÚSICA ==============
musicBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Error al reproducir música:', error);
            alert('La música no se pudo reproducir. Asegúrate de estar conectado a internet.');
        });
        musicBtn.textContent = '⏸️';
        musicBtn.classList.add('playing');
        isMusicPlaying = true;
    }
});

// ============== SCROLL SUAVE ==============
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============== REVELAR CARTA ==============
function toggleLetterReveal() {
    const letterContent = document.querySelector('.letter-content');
    const letterBtn = document.querySelector('.letter-btn');
    
    letterContent.classList.toggle('revealed');
    
    if (letterBtn.textContent === 'Revelar sentimientos 💝') {
        letterBtn.textContent = 'Ocultar sentimientos 🤫';
        createConfetti();
    } else {
        letterBtn.textContent = 'Revelar sentimientos 💝';
    }
}

// ============== SORPRESA ==============
function triggerSurprise() {
    const surpriseMessage = document.getElementById('surpriseMessage');
    const isHidden = surpriseMessage.classList.contains('hidden');
    
    if (isHidden) {
        surpriseMessage.classList.remove('hidden');
        surpriseMessage.classList.add('show');
        createSurpriseAnimation();
    } else {
        surpriseMessage.classList.add('hidden');
        surpriseMessage.classList.remove('show');
    }
}

// ============== ANIMACIÓN DE SORPRESA ==============
function createSurpriseAnimation() {
    // Crear confetti
    for (let i = 0; i < 30; i++) {
        createConfetti();
    }
    
    // Reproducir sonido de celebración (opcional)
    playBeep();
}

// ============== CONFETTI ==============
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff69b4', '#da70d6', '#ee82ee'][Math.floor(Math.random() * 3)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '0px';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 3 + 2;
    const xMovement = (Math.random() - 0.5) * 400;
    
    let startTime = Date.now();
    
    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            confetti.style.top = (progress * window.innerHeight) + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + xMovement / duration * 0.016) + 'px';
            confetti.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    }
    
    animate();
}

// ============== SONIDO DE BEEP ==============
function playBeep() {
    // Crear un contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============== OBSERVADOR DE SCROLL PARA ANIMACIONES ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observar elementos de galería
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// ============== CARGA INICIAL ==============
window.addEventListener('load', () => {
    console.log('¡Página romántica cargada! 💕');
    // Crear algunos corazones iniciales
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createHeart(), i * 200);
    }
});

// ============== EVENT LISTENERS ==============
document.addEventListener('DOMContentLoaded', () => {
    // Agregar efecto al pasar el mouse sobre elementos interactivos
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});