import { RETOS } from './datos.js';

/* ==========================================================
   0. GESTIÓN DE SONIDO
   ========================================================== */
const sonidos = {
    intro: new Audio('src/mp3/intro.mp3'),
    game: new Audio('src/mp3/game.mp3'),
    dado: new Audio('src/mp3/dado.mp3'),
    correcto: new Audio('src/mp3/correcto.mp3'),
    error: new Audio('src/mp3/error.mp3')
};

sonidos.intro.volume = 0.6;
sonidos.game.volume = 0.2; 
sonidos.dado.volume = 0.8;
sonidos.correcto.volume = 0.7;
sonidos.error.volume = 0.7;

sonidos.intro.loop = true;
sonidos.game.loop = true;

function reproducirSonido(nombre) {
    if (sonidos[nombre]) {
        sonidos[nombre].currentTime = 0;
        sonidos[nombre].play().catch(e => console.warn("Audio bloqueado"));
    }
}

/* ==========================================================
   1. MOTOR GRÁFICO (TABLERO Y AUTOBÚS)
   ========================================================== */
class TableroGrafico {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.imgMapa = new Image();
        this.imgMapa.src = 'src/imgs/Camino, juego L6.png';
        this.imgBusAbierto = new Image();
        this.imgBusAbierto.src = 'src/imgs/Camion-02.png';
        this.imgBusCerrado = new Image();
        this.imgBusCerrado.src = 'src/imgs/BusCerrado.png';
        
        this.puntos = [
            {x: 802, y: 212}, {x: 723, y: 200}, {x: 675, y: 161}, {x: 671, y: 107},
            {x: 524, y: 76},  {x: 420, y: 93},  {x: 363, y: 91},  {x: 313, y: 81},
            {x: 258, y: 77},  {x: 207, y: 41},  {x: 107, y: 117}, {x: 135, y: 198},
            {x: 95, y: 336},  {x: 63, y: 458},  {x: 106, y: 501}, {x: 275, y: 560},
            {x: 380, y: 577}, {x: 426, y: 515}, {x: 459, y: 457}, {x: 659, y: 521},
            {x: 719, y: 496}, {x: 842, y: 387}, {x: 843, y: 315}, {x: 793, y: 289},
            {x: 738, y: 309}, {x: 679, y: 323}, {x: 619, y: 299}, {x: 595, y: 246},
            {x: 563, y: 200}, {x: 507, y: 175}, {x: 408, y: 254}
        ];
    }

    dibujar(pos) {
        this.ctx.clearRect(0, 0, 900, 600);
        if (this.imgMapa.complete) {
            this.ctx.drawImage(this.imgMapa, 0, 0, 900, 600);
        }

        const i = Math.floor(pos);
        const p = this.puntos[i] || this.puntos[this.puntos.length - 1];
        const imgParaDibujar = (pos === 0) ? this.imgBusAbierto : this.imgBusCerrado;

        if (imgParaDibujar.complete && p) {
            const bounce = pausado ? 0 : Math.sin(Date.now() / 200) * 5;
            const sigPunto = this.puntos[i + 1] || p;
            const mirandoIzquierda = sigPunto.x < p.x;

            this.ctx.save();
            if (mirandoIzquierda) {
                this.ctx.translate(p.x, p.y);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(imgParaDibujar, -40, -60 + bounce, 80, 80);
            } else {
                this.ctx.drawImage(imgParaDibujar, p.x - 40, (p.y - 60) + bounce, 80, 80);
            }
            this.ctx.restore();
        }
    }
}

/* ==========================================================
   2. VARIABLES DE ESTADO Y MAZOS
   ========================================================== */
let posActual = 0;
let posVisual = 0;
let motor;
let enMovimiento = false;
let pausado = false;
let stickers = 0;

const mazosDisponibles = {
    TRIVIA: [], SOS: [], CURVA: [], BONUS: [], IGLESIA: []
};

function obtenerItemNoRepetido(categoria, listaOriginal) {
    if (!listaOriginal || listaOriginal.length === 0) return null;
    if (!mazosDisponibles[categoria] || mazosDisponibles[categoria].length === 0) {
        mazosDisponibles[categoria] = listaOriginal.map((_, index) => index);
        for (let i = mazosDisponibles[categoria].length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mazosDisponibles[categoria][i], mazosDisponibles[categoria][j]] = 
            [mazosDisponibles[categoria][j], mazosDisponibles[categoria][i]];
        }
    }
    const indiceElegido = mazosDisponibles[categoria].pop();
    return listaOriginal[indiceElegido];
}

/* ==========================================================
   3. INICIALIZACIÓN Y EVENTOS
   ========================================================== */
export function iniciarRutaGranViaje() {

    // --- HERRAMIENTA DE COORDENADAS (Solo para desarrollo) ---
    const canvas = document.getElementById('tablero-canvas');
    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        
        // Esto aparecerá en la consola (F12)
        console.log(`{x: ${x}, y: ${y}},`); 
        
        // Opcional: mostrarlo en el mensaje del juego para verlo rápido
        mostrarMensaje(`Coordenadas: x: ${x}, y: ${y}`);
    };
    motor = new TableroGrafico('tablero-canvas');
    reproducirSonido('intro');

    document.getElementById('btn-iniciar').onclick = () => {
        sonidos.intro.pause();
        reproducirSonido('game');
        document.getElementById('pantalla-inicio').classList.add('hidden');
        document.getElementById('contenedor-tablero').classList.remove('hidden');
        mostrarMensaje("¡Viaje iniciado! Lanza el dado. 🚍");
        actualizarHUD();
        loop();
    };

    document.getElementById('btn-instrucciones').onclick = () => {
        document.getElementById('modal-instrucciones').classList.remove('hidden');
    };
    document.getElementById('btn-cerrar-instrucciones').onclick = () => {
        document.getElementById('modal-instrucciones').classList.add('hidden');
    };

    const btnDado = document.getElementById('btn-lanzar-dado');
    btnDado.onclick = () => {
        if (enMovimiento || pausado) return;
        enMovimiento = true;
        reproducirSonido('dado'); 
        
        let giros = 0;
        const caras = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        const intervalo = setInterval(() => {
            btnDado.innerText = caras[Math.floor(Math.random() * 6)];
            giros++;
            if (giros > 12) {
                clearInterval(intervalo);
                const valor = Math.floor(Math.random() * 6) + 1;
                btnDado.innerText = caras[valor - 1];
                
                // --- LÓGICA DE REBOTE EN META ---
                const meta = motor.puntos.length - 1; // Casilla 28
                let nuevaPos = posActual + valor;
                
                if (nuevaPos > meta) {
                    const exceso = nuevaPos - meta;
                    nuevaPos = meta - exceso;
                    mostrarMensaje(`¡Rebotaste! Sacaste ${valor}, retrocedes a la casilla ${nuevaPos} ↩️`);
                } else {
                    mostrarMensaje(`¡Avanzas ${valor} casillas! 🎲`);
                }
                
                posActual = nuevaPos;
            }
        }, 80);
    };
}

/* ==========================================================
   4. BUCLE Y HUD
   ========================================================== */
function loop() {
    if (!pausado) {
        if (posVisual < posActual) {
            posVisual += 0.04; 
            actualizarHUD();
            if (posVisual >= posActual) {
                posVisual = posActual;
                enMovimiento = false;
                verificarReto(Math.floor(posActual));
            }
        } else if (posVisual > posActual) {
            posVisual -= 0.08; 
            actualizarHUD();
            if (posVisual <= posActual) {
                posVisual = posActual;
                enMovimiento = false;
                verificarReto(Math.floor(posActual)); // También verifica reto al retroceder
            }
        }
        motor.dibujar(posVisual);
    }
    requestAnimationFrame(loop);
}

function actualizarHUD() {
    const marcStickers = document.getElementById('marcador-stickers');
    const marcKm = document.getElementById('marcador-kilometros');
    if (marcStickers) marcStickers.innerText = `✨ Stickers: ${stickers}`;
    // --- MULTIPLO DE 10 ---
    if (marcKm) marcKm.innerText = `🛣️ Recorrido: ${Math.floor(posVisual) * 10} km`;
}

function mostrarMensaje(texto) {
    const box = document.getElementById('consola-mensajes');
    if (box) box.innerText = texto;
}

/* ==========================================================
   5. SISTEMA DE RETOS
   ========================================================== */
function verificarReto(p) {
    if (p >= motor.puntos.length - 1) return lanzarModal('META');

    const categorias = {
        trivia: [2, 7, 14, 22],
        sos: [4, 11, 19, 27],
        curva: [8, 15, 25],
        bonus: [5, 12, 20],
        iglesia: [10, 18, 26],
        estacion: [3, 16, 23]
    };

    if (categorias.trivia.includes(p)) lanzarModal('TRIVIA');
    else if (categorias.sos.includes(p)) lanzarModal('SOS');
    else if (categorias.curva.includes(p)) lanzarModal('CURVA');
    else if (categorias.bonus.includes(p)) lanzarModal('BONUS');
    else if (categorias.iglesia.includes(p)) lanzarModal('IGLESIA');
    else if (categorias.estacion.includes(p)) lanzarModal('ESTACION');
}

let stickersDisponibles = [
    'letreros amarillo-rosa-01.png', 'letreros amarillo-rosa-02.png',
    'letreros amarillo-rosa-03.png', 'letreros amarillo-rosa-04.png',
    'letreros amarillo-rosa-05.png', 'letreros amarillo-rosa-06.png'
];
let mazoStickers = [];

function lanzarModal(tipo) {
    const modal = document.getElementById('modal-retos');
    const opciones = document.getElementById('reto-opciones');
    const titulo = document.getElementById('reto-titulo');
    const desc = document.getElementById('reto-descripcion');
    const imgRef = document.getElementById('reto-imagen'); 
    
    opciones.innerHTML = "";
    if (imgRef) imgRef.style.display = "none"; 
    modal.classList.remove('hidden');

    let item;
    switch(tipo) {
        case 'TRIVIA':
            item = obtenerItemNoRepetido('TRIVIA', RETOS.puntosEncuentro);
            titulo.innerText = "📍 Punto de Encuentro";
            desc.innerText = item.pregunta;
            item.opciones.forEach((o, i) => crearBoton(o, i === item.correcta, true));
            break;
        case 'SOS':
            item = obtenerItemNoRepetido('SOS', RETOS.sosRescate);
            titulo.innerText = "⛑️ SOS Rescate";
            desc.innerText = item.situación;
            item.opciones.forEach(o => crearBoton(o.texto, o.correcta, true));
            break;
        case 'CURVA':
            item = obtenerItemNoRepetido('CURVA', RETOS.curvasPeligrosas);
            titulo.innerText = "⚠️ ¡CURVA PELIGROSA!";
            desc.innerText = `${item.situación}\n\n${item.pregunta}`;
            item.opciones.forEach((o, i) => crearBoton(o, i === item.correcta, false, item.retroceso));
            break;
        case 'IGLESIA':
            item = obtenerItemNoRepetido('IGLESIA', (RETOS.iglesiaSignos || RETOS.puntosEncuentro));
            titulo.innerText = "📍 Punto de Encuentro";
            desc.innerText = item.pregunta;
            item.opciones.forEach((o, i) => crearBoton(o, i === item.correcta, true));
            break;
        case 'BONUS':
            item = obtenerItemNoRepetido('BONUS', RETOS.bonus);
            titulo.innerText = "⭐ Casilla Bonus";
            desc.innerText = item.mensaje;
            if (item.imagen && imgRef) {
                imgRef.src = item.imagen;
                imgRef.style.display = "block";
            }
            crearBoton("¡Reclamar Sticker! ✨", true, true, 0, false, true);
            break;
        case 'ESTACION':
            item = RETOS.estacionServicio;
            titulo.innerText = "⛽ Estación de Servicio";
            desc.innerText = "¡Has llegado a un lugar para recargar tu fe!";
            if (item.imagen && imgRef) {
                imgRef.src = item.imagen;
                imgRef.style.display = "block";
            }
            crearBoton("¡Cargar Energía! ⚡", true, false);
            break;
        case 'META':
            titulo.innerText = "🏁 ¡Meta del Amor!";
            desc.innerText = `¡Felicidades Viajero!\nLlegaste al final con ${stickers} stickers.`;
            if (imgRef) {
                imgRef.src = 'src/imgs/elementos meta-trofeo-01.png'; 
                imgRef.style.display = "block";
            }
            crearBoton("¡Recibe el Trofeo!", true, false, 0, true);
            break;
    }

    if (['TRIVIA', 'SOS', 'CURVA', 'IGLESIA'].includes(tipo) && item && item.imagen && imgRef) {
        imgRef.src = item.imagen;
        imgRef.style.display = "block";
    }

    function crearBoton(texto, correcta, daSticker, penalizacion = 0, esMeta = false, esBonus = false) {
        const btn = document.createElement('button');
        btn.className = "btn-opcion";
        btn.innerText = texto;
        btn.onclick = () => {
            if (esMeta) {
                opciones.innerHTML = "";
                titulo.innerText = "🏆 ¡EL TROFEO DE TU FE!";
                desc.innerText = "Has completado el Gran Viaje del Amor.";
                if (imgRef) imgRef.src = 'src/imgs/elementos meta-trofeo-05.png';
                const btnReiniciar = document.createElement('button');
                btnReiniciar.innerText = "🔄 Jugar de nuevo";
                btnReiniciar.className = "btn-opcion";
                btnReiniciar.onclick = () => location.reload();
                opciones.appendChild(btnReiniciar);
                return;
            }

            if (correcta) {
                reproducirSonido('correcto');
                if (daSticker) { stickers++; actualizarHUD(); }
                if (esBonus && imgRef) {
                    if (mazoStickers.length === 0) mazoStickers = [...stickersDisponibles].sort(() => Math.random() - 0.5);
                    imgRef.src = `src/imgs/${mazoStickers.pop()}`;
                    imgRef.style.display = "block";
                }
                titulo.innerText = "¡Excelente! ✨";
                desc.innerText = "¡Correcto! El viaje continúa.";
                opciones.innerHTML = "";
                const btnC = document.createElement('button');
                btnC.innerText = "Continuar 🚍";
                btnC.className = "btn-opcion";
                btnC.onclick = () => modal.classList.add('hidden');
                opciones.appendChild(btnC);
            } else {
                reproducirSonido('error');
                titulo.innerText = "Sigue intentando...";
                desc.innerText = penalizacion > 0 ? `Incorrecto. Retrocedes ${penalizacion} casillas.` : "¡Inténtalo en la segunda estación!";
                opciones.innerHTML = "";
                const btnE = document.createElement('button');
                btnE.innerText = "Seguir 🚍";
                btnE.className = "btn-opcion";
                btnE.onclick = () => {
                    if (penalizacion > 0) { posActual = Math.max(0, posActual - penalizacion); enMovimiento = true; }
                    modal.classList.add('hidden');
                };
                opciones.appendChild(btnE);
            }
        };
        opciones.appendChild(btn);
    }
}