// Base de datos de retos para "La Ruta del Gran Viaje"

export const RETOS = {
    // 📍 Puntos de Encuentro: Trivias de catequesis
    puntosEncuentro: [
        {
            pregunta: "¿Quién dijo: 'Yo soy el camino, la verdad y la vida'?",
            opciones: ["Moisés", "Jesús", "Pedro"],
            correcta: 1, 
            sticker: "🧭 Brújula",
            imagen: "src/imgs/puntos_de_enc2.png"
        },
        {
            pregunta: "¿Cómo se llama la comunidad que vive su fe unida?",
            opciones: ["Ejército", "Iglesia", "Club"],
            correcta: 1,
            sticker: "⛪ Iglesia",
            imagen: "src/imgs/puntos_de_enc2.png"
        }
    ],

    // ⛑️ SOS Rescate: Decisiones morales
    sosRescate: [
        {
            situación: "Un amigo perdió su cuaderno y está muy triste. ¿Qué harías?",
            opciones: [
                { texto: "Me río de él.", correcta: false },
                { texto: "Le presto el mío para que se ponga al día.", correcta: true },
                { texto: "No digo nada y me voy.", correcta: false }
            ],
            mensaje: "¡Muy bien! Ayudar al prójimo es parte del viaje con Jesús.",
            sticker: "❤️ Corazón",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            situación: "Ves que un compañero no trajo lonche al recreo.",
            opciones: [
                { texto: "Me como lo mío rápido.", correcta: false },
                { texto: "Comparto la mitad de mi sándwich.", correcta: true }
            ],
            mensaje: "¡Eso es fraternidad!",
            sticker: "🍞 Pan",
            imagen: "src/imgs/sos_rescate2.png"
        }
    ],

    // ⚠️ Curva Peligrosa: Preguntas trampa con retroceso
    curvasPeligrosas: [
        {
            situación: "Juan rompió un lápiz sin querer y dijo: 'Yo no fui, ya estaba así'.",
            pregunta: "¿Actuó correctamente Juan?",
            opciones: ["Sí, para evitar el regaño.", "No, debió decir la verdad."],
            correcta: 1,
            retroceso: 2,
            imagen: "src/imgs/curva peligrosa.png"
        },
        {
            situación: "Sofía tiene muchas galletas y no quiere compartir con nadie.",
            pregunta: "¿Es esta una actitud del viajero de la fe?",
            opciones: ["No, compartir nos hace felices.", "Sí, son sus galletas."],
            correcta: 0,
            retroceso: 1,
            imagen: "src/imgs/curva peligrosa.png"
        }
    ],

    // ⛪ Iglesia / Signos Sacramentales
    iglesiaSignos: [
        {
            pregunta: "¿Qué elementos ponemos en el altar durante la misa?",
            opciones: ["Flores y libros", "Pan y Vino", "Dinero y comida"],
            correcta: 1,
            mensaje: "¡Jesús está presente en la Eucaristía!",
            sticker: "🍷 Vino",
            imagen: "src/imgs/puntos_de_enc2.png"
        },
        {
            pregunta: "La misa se divide en Liturgia de la Palabra y...",
            opciones: ["Liturgia de los Cantos", "Liturgia Eucarística", "Liturgia de Salida"],
            correcta: 1,
            sticker: "✝️ Cruz",
            imagen: "src/imgs/puntos_de_enc2.png"
        }
    ],

    // ⭐ Bonus: Afirmaciones directas (Banderines)
    bonus: [
        { mensaje: "La Eucaristía es una acción de gracias.", sticker: "Boleto de viaje", imagen: "src/imgs/Bonus.png" },
        { mensaje: "Reconozco a Jesús en las personas que me rodean.", sticker: "Presencia", imagen: "src/imgs/Bonus.png" },
        { mensaje: "¡Hagan esto en memoria mía!", sticker: "Última Cena", imagen: "src/imgs/Bonus.png" },
        { mensaje: "Los regalos de la Eucaristía son: Amor, paz y buenas acciones.", sticker: "Cáliz Dorado", imagen: "src/imgs/Bonus.png" }
    ],
    
    // 🚀 Transportes
    transportes: [
        { nombre: "Maleta del Servicio", icono: "🎒", imagen: "src/imgs/Bonus.png" },
        { nombre: "Tren de la Fraternidad", icono: "🚂", imagen: "src/imgs/Bonus.png" },
        { nombre: "Avión de la Felicidad", icono: "✈️", imagen: "src/imgs/Bonus.png" },
        { nombre: "Barco en Crucero", icono: "🚢", imagen: "src/imgs/Bonus.png" }
    ],

    // ⛽ Estación de Servicio
    estacionServicio: {
        parejas: [
            { nombre: "Pan", id: 1 },
            { nombre: "Vino", id: 2 },
            { nombre: "Cáliz", id: 3 },
            { nombre: "Altar", id: 4 },
            { nombre: "Cirio", id: 5 },
            { nombre: "Amón", id: 6 }
        ],
        imagen: "src/imgs/estacion de servicio.png"
    }
};

// Álbum de Stickers final
export const STICKERS_LOGRO = [
    "🚍 Camión escolar", 
    "🧭 Brújula", 
    "⛪ Iglesia", 
    "🍞 Pan", 
    "🍷 Vino", 
    "❤️ Corazón", 
    "✝️ Cruz", 
    "🎒 Mochila",
    "🏆 Cáliz Dorado",
    "💖 Corazón Solidario"
];