import { RETOS } from './datos.js';

/* ==========================================================
   1. MOTOR GRÁFICO (TABLERO Y AUTOBÚS)
   ========================================================== */
class TableroGrafico {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.imgMapa = new Image();
        this.imgMapa.src = 'src/imgs/Camino, juego L6.png';
        this.imgBus = new Image();
        this.imgBus.src = 'src/imgs/Camion-02.png';
        
        this.puntos = [
            {x: 720, y: 200}, {x: 675, y: 235}, {x: 685, y: 80},  {x: 625, y: 45},  
            {x: 455, y: 95},  {x: 385, y: 110}, {x: 320, y: 100}, {x: 250, y: 75},  
            {x: 200, y: 65},  {x: 60, y: 215},  {x: 125, y: 290}, {x: 155, y: 455}, 
            {x: 40, y: 540},  {x: 125, y: 540}, {x: 185, y: 540}, {x: 380, y: 540}, 
            {x: 385, y: 540}, {x: 470, y: 540}, {x: 635, y: 540}, {x: 680, y: 540}, 
            {x: 830, y: 540}, {x: 855, y: 465}, {x: 790, y: 465}, {x: 735, y: 540}, 
            {x: 635, y: 540}, {x: 580, y: 475}, {x: 545, y: 365}, {x: 585, y: 230}, 
            {x: 500, y: 200}, {x: 455, y: 345}  
        ];
    }

    dibujar(pos) {
        this.ctx.clearRect(0, 0, 900, 600);
        if (this.imgMapa.complete) {
            this.ctx.drawImage(this.imgMapa, 0, 0, 900, 600);
        }
        const i = Math.floor(pos);
        const p = this.puntos[i] || this.puntos[this.puntos.length - 1];
        if (this.imgBus.complete && p) {
            const bounce = pausado ? 0 : Math.sin(Date.now() / 200) * 5;
            this.ctx.drawImage(this.imgBus, p.x - 40, (p.y - 60) + bounce, 80, 80);
        }
    }
}

/* ==========================================================
   2. VARIABLES DE ESTADO Y CONTROL DE REPETICIÓN
   ========================================================== */
let posActual = 0;
let posVisual = 0;
let motor;
let enMovimiento = false;
let pausado = false;
let stickers = 0;

// Objeto para controlar qué retos ya salieron
const historialRetos = {
    TRIVIA: [],
    SOS: [],
    CURVA: [],
    BONUS: [],
    IGLESIA: []
};

// Función para obtener un item aleatorio que no se haya usado
function obtenerItemNoRepetido(categoria, listaOriginal) {
    // Si la lista de disponibles está vacía, la reiniciamos
    if (historialRetos[categoria].length === 0) {
        historialRetos[categoria] = listaOriginal.map((_, index) => index);
    }
    
    // Elegimos un índice al azar de los que quedan disponibles
    const randomIndexInAvailable = Math.floor(Math.random() * historialRetos[categoria].length);
    const itemIndex = historialRetos[categoria].splice(randomIndexInAvailable, 1)[0];
    
    return listaOriginal[itemIndex];
}

/* ==========================================================
   3. INICIALIZACIÓN Y EVENTOS
   ========================================================== */
export function iniciarRutaGranViaje() {
    motor = new TableroGrafico('tablero-canvas');

    document.getElementById('btn-iniciar').onclick = () => {
        document.getElementById('pantalla-inicio').classList.add('hidden');
        document.getElementById('contenedor-tablero').classList.remove('hidden');
        mostrarMensaje("¡MODO PRUEBA ACTIVO! El dado siempre caerá en 1. 🚍");
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
        let giros = 0;
        const caras = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        const intervalo = setInterval(() => {
            btnDado.innerText = caras[Math.floor(Math.random() * 6)];
            giros++;
            if (giros > 10) {
                clearInterval(intervalo);
                const valor = 1; // Modo prueba
                btnDado.innerText = caras[valor - 1];
                posActual = Math.min(posActual + valor, motor.puntos.length - 1);
            }
        }, 80);
    };
}

/* ==========================================================
   4. BUCLE Y HUD
   ========================================================== */
/* ==========================================================
   4. BUCLE DE ANIMACIÓN Y MENSAJERÍA (CORREGIDO)
   ========================================================== */
   function loop() {
    if (!pausado) {
        // MOVIMIENTO HACIA ADELANTE
        if (posVisual < posActual) {
            posVisual += 0.04; 
            if (posVisual >= posActual) {
                posVisual = posActual;
                enMovimiento = false; // LIBERA EL DADO
                verificarReto(Math.floor(posActual));
            }
        } 
        // MOVIMIENTO HACIA ATRÁS (POR PENALIZACIÓN)
        else if (posVisual > posActual) {
            posVisual -= 0.08; // Retroceso un poco más rápido
            if (posVisual <= posActual) {
                posVisual = posActual;
                enMovimiento = false; // LIBERA EL DADO TAMBIÉN AQUÍ
                // No verificamos reto al retroceder para evitar bucles infinitos
            }
        }
        
        motor.dibujar(posVisual);
    }
    requestAnimationFrame(loop);
}

function mostrarMensaje(texto) {
    const box = document.getElementById('consola-mensajes');
    if (box) box.innerText = texto;
}

function actualizarHUD() {
    const marcador = document.getElementById('marcador-stickers');
    if (marcador) marcador.innerText = `✨ Stickers: ${stickers}`;
}

/* ==========================================================
   5. SISTEMA DE RETOS (SIN REPETICIÓN)
   ========================================================== */
function verificarReto(p) {
    if (p >= 29) return lanzarModal('META');
    const categorias = {
        trivia: [2, 7, 14, 22],
        sos: [4, 11, 19, 27],
        curva: [8, 15, 25],
        bonus: [5, 12, 20, 28],
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
            item.opciones.forEach((o, i) => {
                crearBoton(o, i === item.correcta, false, item.retroceso);
            });
            break;

        case 'IGLESIA':
            item = obtenerItemNoRepetido('IGLESIA', (RETOS.iglesiaSignos || RETOS.puntosEncuentro));
            titulo.innerText = "⛪ Signo Sacramental";
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
            crearBoton("¡Cargar Energía de Fe! ⚡", true, false);
            break;

        case 'META':
            titulo.innerText = "🏁 ¡Meta del Amor!";
            desc.innerText = `¡Felicidades Viajero de la Fe!\nRecorriste 30km y juntaste ${stickers} stickers.`;
            crearBoton("¡Recibe el Trofeo del Amor!", true, false, 0, true);
            break;
    }

    if (tipo !== 'BONUS' && tipo !== 'ESTACION' && item && item.imagen && imgRef) {
        imgRef.src = item.imagen;
        imgRef.style.display = "block";
    }

    function crearBoton(texto, correcta, daSticker, penalizacion = 0, esMeta = false, esBonus = false) {
        const btn = document.createElement('button');
        btn.className = "btn-opcion";
        btn.innerText = texto;
        btn.onclick = () => {
            if (esMeta) {
                alert("🎖️ ¡Diploma Desbloqueado!");
                location.reload();
                return;
            }

            if (correcta) {
                if (daSticker) { stickers++; actualizarHUD(); }
                if (esBonus) {
                    titulo.innerText = "¡NUEVO STICKER!";
                    desc.innerText = "¡Felicidades por tu recompensa!";
                    opciones.innerHTML = ""; 
                    if (imgRef) {
                        imgRef.src = 'src/imgs/letreros amarillo-rosa-01.png';
                        imgRef.style.display = "block";
                        imgRef.style.width = "100%";
                    }
                    const btnCerrar = document.createElement('button');
                    btnCerrar.className = "btn-opcion";
                    btnCerrar.innerText = "Continuar el viaje 🚍";
                    btnCerrar.onclick = () => modal.classList.add('hidden');
                    opciones.appendChild(btnCerrar);
                    return; 
                }
                mostrarMensaje("¡Excelente! Respuesta correcta. ✨");
            // Dentro de crearBoton, en la parte de la respuesta incorrecta:
            } else {
                if (penalizacion > 0) {
                    posActual = Math.max(0, posActual - penalizacion);
                    enMovimiento = true; // ACTIVAMOS EL MOVIMIENTO PARA EL RETROCESO
                    mostrarMensaje(`⚠️ ¡Derrape! Retrocedes ${penalizacion} casillas.`);
                }
            }
            modal.classList.add('hidden');
        };
        opciones.appendChild(btn);
    }
}