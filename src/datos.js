// Base de datos de retos para "La Ruta del Gran Viaje"

export const RETOS = {
    // 📍 Puntos de Encuentro: Trivias de catequesis
    puntosEncuentro: [
        {
            pregunta: "¿Quién dijo: 'Yo soy el camino, la verdad y la vida'?",
            opciones: ["Moisés", "Jesús", "Pedro"],
            correcta: 1, 
            sticker: "🧭 Brújula"
        },
        {
            pregunta: "¿Cómo se llama la comunidad que vive su fe unida?",
            opciones: ["Ejército", "Iglesia", "Club"],
            correcta: 1,
            sticker: "⛪ Iglesia"
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
            sticker: "❤️ Corazón"
        },
        {
            situación: "Ves que un compañero no trajo lonche al recreo.",
            opciones: [
                { texto: "Me como lo mío rápido.", correcta: false },
                { texto: "Comparto la mitad de mi sándwich.", correcta: true }
            ],
            mensaje: "¡Eso es fraternidad!",
            sticker: "🍞 Pan"
        }
    ],

    // ⚠️ Curva Peligrosa: Preguntas trampa con retroceso
    curvasPeligrosas: [
        {
            situación: "Juan rompió un lápiz sin querer y dijo: 'Yo no fui, ya estaba así'.",
            pregunta: "¿Actuó correctamente Juan?",
            opciones: ["Sí, para evitar el regaño.", "No, debió decir la verdad."],
            correcta: 1,
            retroceso: 2
        },
        {
            situación: "Sofía tiene muchas galletas y no quiere compartir con nadie.",
            pregunta: "¿Es esta una actitud del viajero de la fe?",
            opciones: ["No, compartir nos hace felices.", "Sí, son sus galletas."],
            correcta: 0,
            retroceso: 1
        }
    ],

    // ⛪ Iglesia / Signos Sacramentales: Arrastrar o Trivia Eucarística
    iglesiaSignos: [
        {
            pregunta: "¿Qué elementos ponemos en el altar durante la misa?",
            opciones: ["Flores y libros", "Pan y Vino", "Dinero y comida"],
            correcta: 1,
            mensaje: "¡Jesús está presente en la Eucaristía!",
            sticker: "🍷 Vino"
        },
        {
            pregunta: "La misa se divide en Liturgia de la Palabra y...",
            opciones: ["Liturgia de los Cantos", "Liturgia Eucarística", "Liturgia de Salida"],
            correcta: 1,
            sticker: "✝️ Cruz"
        }
    ],

    // ⭐ Bonus: Afirmaciones directas
    bonus: [
        { mensaje: "La Eucaristía es una acción de gracias.", sticker: "Boleto de viaje" },
        { mensaje: "Reconozco a Jesús en las personas que me rodean.", sticker: "Presencia" },
        { mensaje: "¡Hagan esto en memoria mía!", sticker: "Última Cena" },
        { mensaje: "Los regalos de la Eucaristía son: Amor, paz y buenas acciones.", sticker: "Cáliz Dorado" }
    ],

    // 🚀 Transportes: Para ganar el "Corazón Solidario"
    transportes: [
        { nombre: "Maleta del Servicio", icono: "🎒" },
        { nombre: "Tren de la Fraternidad", icono: "🚂" },
        { nombre: "Avión de la Felicidad", icono: "✈️" },
        { nombre: "Barco en Crucero", icono: "🚢" }
    ],

    // ⛽ Estación de Servicio: Datos para el Memory Game
    estacionServicio: {
        parejas: [
            { nombre: "Pan", id: 1 },
            { nombre: "Vino", id: 2 },
            { nombre: "Cáliz", id: 3 },
            { nombre: "Altar", id: 4 },
            { nombre: "Cirio", id: 5 },
            { nombre: "Amón", id: 6 }
        ]
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