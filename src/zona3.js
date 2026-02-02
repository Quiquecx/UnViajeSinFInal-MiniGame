/* ==========================================================
   1. DATOS DE LOS RETOS
   ========================================================== */
   const RETOS = {
    TRIVIA: [
        { q: "¿Quién dijo: 'Yo soy el camino, la verdad y la vida'?", opt: ["Moisés", "Jesús", "Pedro"], c: 1 },
        { q: "¿Cómo se llama la comunidad que vive su fe unida?", opt: ["Ejército", "Iglesia", "Club"], c: 1 }
    ],
    SOS: [
        { s: "Un amigo perdió su lonche. ¿Qué harías?", opt: [{t:"No hago nada", c:false}, {t:"Comparto el mío", c:true}] }
    ]
};

/* ==========================================================
   2. CLASE DEL TABLERO
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
            {x: 40, y: 550},  {x: 125, y: 550}, {x: 185, y: 550}, {x: 380, y: 550},
            {x: 385, y: 550}, {x: 470, y: 550}, {x: 635, y: 550}, {x: 680, y: 550},
            {x: 830, y: 550}, {x: 855, y: 465}, {x: 790, y: 465}, {x: 735, y: 550},
            {x: 635, y: 550}, {x: 580, y: 475}, {x: 545, y: 365}, {x: 585, y: 230},
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
   3. VARIABLES DE ESTADO Y CONTROL
   ========================================================== */
let posActual = 0;
let posVisual = 0;
let motor;
let enMovimiento = false;
let pausado = false;
let stickers = 0;

export function iniciarRutaGranViaje() {
    motor = new TableroGrafico('tablero-canvas');

    // Botón Iniciar
    document.getElementById('btn-iniciar').onclick = () => {
        document.getElementById('pantalla-inicio').classList.add('hidden');
        document.getElementById('contenedor-tablero').classList.remove('hidden');
        posActual = 0;
        posVisual = 0;
        stickers = 0;
        actualizarHUD();
        loop();
    };

    // Instrucciones
    document.getElementById('btn-instrucciones').onclick = () => document.getElementById('modal-instrucciones').classList.remove('hidden');
    document.getElementById('btn-cerrar-instrucciones').onclick = () => document.getElementById('modal-instrucciones').classList.add('hidden');

    // Botón Pausa
    const btnPausa = document.getElementById('btn-pausa');
    if(btnPausa) {
        btnPausa.onclick = () => {
            pausado = !pausado;
            document.getElementById('modal-pausa').classList.toggle('hidden', !pausado);
        };
    }

    // --- EL DADO ANIMADO ---
    const btnDado = document.getElementById('btn-lanzar-dado');
    btnDado.onclick = () => {
        if (enMovimiento || pausado) return;
        
        enMovimiento = true;
        let giros = 0;
        const caras = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        
        // Efecto de giro
        const intervalo = setInterval(() => {
            btnDado.innerText = caras[Math.floor(Math.random() * 6)];
            giros++;
            
            if (giros > 10) { // Se detiene después de 10 cambios
                clearInterval(intervalo);
                const resultado = Math.floor(Math.random() * 6) + 1;
                btnDado.innerText = caras[resultado - 1]; // Mostrar cara final
                
                // Mover el bus
                posActual = Math.min(posActual + resultado, motor.puntos.length - 1);
            }
        }, 80);
    };
}

/* ==========================================================
   4. LÓGICA DE ACTUALIZACIÓN
   ========================================================== */
function loop() {
    if (!pausado) {
        if (posVisual < posActual) {
            posVisual += 0.04; // Velocidad suave
            if (posVisual >= posActual) {
                posVisual = posActual;
                enMovimiento = false;
                verificarReto(posActual);
            }
        }
        motor.dibujar(posVisual);
    }
    requestAnimationFrame(loop);
}

function actualizarHUD() {
    const marcador = document.getElementById('marcador-stickers');
    if (marcador) marcador.innerText = `✨ Stickers: ${stickers}`;
}

function verificarReto(p) {
    if (p >= 29) {
        alert(`🏁 ¡META! ¡Felicidades! Terminaste con ${stickers} stickers de fe. ❤️`);
        return;
    }
    const trivias = [5, 12, 20]; 
    const sos = [8, 18, 25];
    if (trivias.includes(p)) lanzarModal('TRIVIA');
    else if (sos.includes(p)) lanzarModal('SOS');
}

function lanzarModal(tipo) {
    const modal = document.getElementById('modal-retos');
    const opciones = document.getElementById('reto-opciones');
    document.getElementById('reto-titulo').innerText = tipo === 'TRIVIA' ? "📍 Punto de Encuentro" : "⛑️ SOS Rescate";
    
    opciones.innerHTML = "";
    const lista = (tipo === 'TRIVIA') ? RETOS.TRIVIA : RETOS.SOS;
    const item = lista[Math.floor(Math.random() * lista.length)];
    
    document.getElementById('reto-descripcion').innerText = item.q || item.s;

    item.opt.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = "btn-opcion";
        btn.innerText = typeof o === 'string' ? o : o.t;
        btn.onclick = () => {
            const correcto = typeof o === 'string' ? (i === item.c) : o.c;
            if(correcto) {
                stickers++;
                actualizarHUD();
            }
            modal.classList.add('hidden');
        };
        opciones.appendChild(btn);
    });
    modal.classList.remove('hidden');
}