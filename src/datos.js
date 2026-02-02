// Base de datos de retos para "La Ruta del Gran Viaje"

export const RETOS = {
    // 📍 Puntos de Encuentro: Trivias simples de opción múltiple
    puntosEncuentro: [
        {
            pregunta: "¿Quién dijo: 'Yo soy el camino, la verdad y la vida'?",
            opciones: ["Moisés", "Jesús", "Pedro"],
            correcta: 1, // Jesús
            sticker: "brújula"
        },
        {
            pregunta: "¿Cómo se llama la comunidad que vive su fe unida?",
            opciones: ["Ejército", "Iglesia", "Club"],
            correcta: 1,
            sticker: "iglesia"
        }
    ],

    // ⛑️ SOS Rescate: Decisiones morales y de valores
    sosRescate: [
        {
            situación: "Un amigo perdió su cuaderno y está muy triste. ¿Qué harías?",
            opciones: [
                { texto: "Me río de él.", correcta: false },
                { texto: "Le presto el mío para que se ponga al día.", correcta: true },
                { texto: "No digo nada y me voy.", correcta: false }
            ],
            mensaje: "¡Muy bien! Ayudar al prójimo es parte del viaje con Jesús.",
            sticker: "corazón"
        },
        {
            situación: "Ves que un compañero no trajo lonche al recreo.",
            opciones: [
                { texto: "Me como lo mío rápido.", correcta: false },
                { texto: "Comparto la mitad de mi sándwich.", correcta: true },
                { texto: "Le presumo mi comida.", correcta: false }
            ],
            mensaje: "¡Eso es fraternidad!",
            sticker: "pan"
        }
    ],

    // ⚠️ Curva Peligrosa: Preguntas trampa (si fallas, retrocedes)
    curvasPeligrosas: [
        {
            situación: "Juan rompió un lápiz sin querer. La maestra pregunta quién fue. Juan dice: 'Yo no fui, ya estaba así'.",
            pregunta: "¿Actuó correctamente Juan?",
            opciones: ["Sí, para que no lo regañen.", "No, debió decir la verdad."],
            correcta: 1,
            retroceso: 2
        },
        {
            situación: "Sofía tiene muchas galletas y no quiere compartir ninguna con sus amigos.",
            pregunta: "¿Es esta una actitud del viajero de la fe?",
            opciones: ["No, compartir nos hace felices.", "Sí, son sus galletas."],
            correcta: 0,
            retroceso: 1
        }
    ],

    // ⭐ Bonus: Afirmaciones que regalan stickers
    bonus: [
        { mensaje: "La Eucaristía es una acción de gracias.", sticker: "eucaristía" },
        { mensaje: "Jesús está presente en las personas que me rodean.", sticker: "presencia" },
        { mensaje: "¡Hagan esto en memoria mía!", sticker: "última_cena" }
    ],

    // ⛽ Estación de Servicio: Elementos para el juego de memoria
    estacionServicio: {
        parejas: [
            { nombre: "Pan", img: "pan.png" },
            { nombre: "Vino", img: "vino.png" },
            { nombre: "Cáliz", img: "caliz.png" },
            { nombre: "Altar", img: "altar.png" }
        ]
    }
};

// Lista de Stickers coleccionables descritos en el documento
export const STICKERS_LOGRO = [
    "🚍 Camión escolar", "🧭 Brújula", "⛪ Iglesia", "🍞 Pan", 
    "🍷 Vino", "❤️ Corazón", "✝️ Cruz", "🎒 Mochila"
];