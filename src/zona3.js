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
            {x: 720, y: 200}, // Casilla 0: Salida 🚍
            {x: 675, y: 235}, // Casilla 1: Carretera
            {x: 685, y: 80},  // Casilla 2: Trivia 📍
            {x: 625, y: 45},  // Casilla 3: Estación de Servicio ⛽
            {x: 455, y: 95},  // Casilla 4: SOS Rescate ⛑️
            {x: 385, y: 110}, // Casilla 5: Bonus ⭐
            {x: 320, y: 100}, // Casilla 6: Carretera
            {x: 250, y: 75},  // Casilla 7: Trivia 📍
            {x: 200, y: 65},  // Casilla 8: Curva Peligrosa ⚠️
            {x: 60, y: 215},  // Casilla 9: Carretera
            {x: 125, y: 290}, // Casilla 10: Signo Sacramental ⛪
            {x: 155, y: 455}, // Casilla 11: SOS Rescate ⛑️
            {x: 40, y: 540},  // Casilla 12: Bonus ⭐
            {x: 125, y: 540}, // Casilla 13: Carretera
            {x: 185, y: 540}, // Casilla 14: Trivia 📍
            {x: 380, y: 540}, // Casilla 15: Curva Peligrosa ⚠️
            {x: 385, y: 540}, // Casilla 16: Estación de Servicio ⛽
            {x: 470, y: 540}, // Casilla 17: Carretera
            {x: 635, y: 540}, // Casilla 18: Signo Sacramental ⛪
            {x: 680, y: 540}, // Casilla 19: SOS Rescate ⛑️
            {x: 830, y: 540}, // Casilla 20: Bonus ⭐
            {x: 855, y: 465}, // Casilla 21: Carretera
            {x: 790, y: 465}, // Casilla 22: Trivia 📍
            {x: 735, y: 540}, // Casilla 23: Estación de Servicio ⛽
            {x: 635, y: 540}, // Casilla 24: Carretera
            {x: 580, y: 475}, // Casilla 25: Curva Peligrosa ⚠️
            {x: 545, y: 365}, // Casilla 26: Signo Sacramental ⛪
            {x: 585, y: 230}, // Casilla 27: SOS Rescate ⛑️
            {x: 500, y: 200}, // Casilla 28: Bonus ⭐
            {x: 455, y: 345}  // Casilla 29: META 🏁
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
   2. VARIABLES DE ESTADO GLOBAL
   ========================================================== */
let posActual = 0;
let posVisual = 0;
let motor;
let enMovimiento = false;
let pausado = false;
let stickers = 0;

/* ==========================================================
   3. INICIALIZACIÓN Y EVENTOS (MODO PRUEBA: DADO = 1)
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

    const btnPausa = document.getElementById('btn-pausa');
    if (btnPausa) {
        btnPausa.onclick = () => {
            pausado = !pausado;
            document.getElementById('modal-pausa').classList.toggle('hidden', !pausado);
        };
    }

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
                
                // --- CAMBIO PARA PRUEBAS ---
                const valor = 1; // Forzamos el avance de 1 en 1
                // ---------------------------
                
                btnDado.innerText = caras[valor - 1]; // Mostrará ⚀
                mostrarMensaje(`Prueba: Avanzas ${valor} casilla.`);
                posActual = Math.min(posActual + valor, motor.puntos.length - 1);
            }
        }, 80);
    };
}

/* ==========================================================
   4. BUCLE DE ANIMACIÓN Y MENSAJERÍA
   ========================================================== */
function loop() {
    if (!pausado) {
        if (posVisual < posActual) {
            posVisual += 0.04; 
            if (posVisual >= posActual) {
                posVisual = posActual;
                enMovimiento = false;
                verificarReto(Math.floor(posActual));
            }
        } else if (posVisual > posActual) {
            posVisual -= 0.1; 
            if (posVisual <= posActual) posVisual = posActual;
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
   5. SISTEMA DE RETOS
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
    else if (categorias.estacion.includes(p)) {
        mostrarMensaje("⛽ Estación de Servicio: ¡Carga energía de fe!");
        lanzarModal('ESTACION'); 
    }
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
            item = RETOS.puntosEncuentro[Math.floor(Math.random() * RETOS.puntosEncuentro.length)];
            titulo.innerText = "📍 Punto de Encuentro";
            desc.innerText = item.pregunta;
            item.opciones.forEach((o, i) => crearBoton(o, i === item.correcta, true));
            break;

        case 'SOS':
            item = RETOS.sosRescate[Math.floor(Math.random() * RETOS.sosRescate.length)];
            titulo.innerText = "⛑️ SOS Rescate";
            desc.innerText = item.situación;
            item.opciones.forEach(o => crearBoton(o.texto, o.correcta, true));
            break;

        case 'CURVA':
            item = RETOS.curvasPeligrosas[Math.floor(Math.random() * RETOS.curvasPeligrosas.length)];
            titulo.innerText = "⚠️ ¡CURVA PELIGROSA!";
            desc.innerText = `${item.situación}\n\n${item.pregunta}`;
            item.opciones.forEach((o, i) => {
                const esCorrecta = (i === item.correcta);
                crearBoton(o, esCorrecta, false, item.retroceso);
            });
            break;

        case 'IGLESIA':
            item = RETOS.iglesiaSignos[Math.floor(Math.random() * RETOS.iglesiaSignos.length)];
            titulo.innerText = "⛪ Signo Sacramental";
            desc.innerText = item.pregunta;
            item.opciones.forEach((o, i) => crearBoton(o, i === item.correcta, true));
            break;

        case 'BONUS':
            item = RETOS.bonus[Math.floor(Math.random() * RETOS.bonus.length)];
            titulo.innerText = "⭐ Casilla Bonus";
            desc.innerText = item.mensaje;
            crearBoton("¡Reclamar Sticker! ✨", true, true);
            break;

        case 'ESTACION':
            titulo.innerText = "⛽ Estación de Servicio";
            desc.innerText = "¡Has llegado a un lugar para recargar tu fe! Haz una pausa y prepárate para continuar el viaje.";
            crearBoton("¡Cargar Energía de Fe! ⚡", true, false);
            break;

        case 'META':
            titulo.innerText = "🏁 ¡LLEGADA AL AMOR!";
            desc.innerText = `¡Felicidades Viajero de la Fe!\nHas completado el camino con ${stickers} stickers.`;
            crearBoton("¡Recibir mi Diploma!", true, false, 0, true);
            break;
    }

    if (item && item.imagen && imgRef) {
        imgRef.src = item.imagen;
        imgRef.style.display = "block";
    }

    // FUNCIÓN CREAR BOTÓN (DENTRO DE LANZAR MODAL)
    function crearBoton(texto, correcta, daSticker, penalizacion = 0, esMeta = false) {
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
                if (daSticker) { 
                    stickers++; 
                    actualizarHUD(); 
                }
                mostrarMensaje("¡Excelente! Respuesta correcta. ✨");
            } else if (penalizacion > 0) {
                posActual = Math.max(0, posActual - penalizacion);
                mostrarMensaje(`⚠️ ¡Derrape! Retrocedes ${penalizacion} casillas.`);
            } else {
                mostrarMensaje("¡Ánimo! El viaje continúa.");
            }
            modal.classList.add('hidden');
        };
        opciones.appendChild(btn);
    }
}