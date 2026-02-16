// Base de datos de retos para "La Ruta del Gran Viaje"

export const RETOS = {
    // 📍 Puntos de Encuentro: Dilemas tal cual están en el Word
    puntosEncuentro: [
        {
            pregunta: "Antes de comenzar tu viaje, encuentras una fuente que te permite unirte a la gran familia de viajeros. ¿Qué haces?",
            opciones: [
                "Rodeo la fuente porque no me gusta mojarme.", 
                "Me quedo mirando sin decidir nada.", 
                "Paso por la fuente porque quiero comenzar el viaje acompañado.", 
                "Sigo solo porque creo que no necesito a nadie."
            ],
            correcta: 2, 
            sticker: "🧭 Brújula",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "Un guía te ofrece sello especial en tu boleto, para seguir recorriendo el camino. ¿Qué decides?",
            opciones: [
                "Lo rechazo porque me da miedo seguir.", 
                "Le digo que tal vez otro día.", 
                "Intento subir sin boleto.", 
                "Acepto el sello porque quiero seguir recorriendo el camino."
            ],
            correcta: 3,
            sticker: "⛪ Iglesia",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "Encuentras un restaurante con un pan especial que da energía para continuar. ¿Qué haces?",
            opciones: [
                "Tomo el pan rápido y sigo sin esperar a nadie.", 
                "No como nada porque no tengo hambre.", 
                "Me detengo a compartir el pan con los demás.", 
                "Me voy porque prefiero no detenerme."
            ],
            correcta: 2,
            sticker: "🍞 Pan",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "El puente que necesitas cruzar está roto porque lo dañaste sin querer. Un constructor te ofrece arreglarlo contigo. ¿Qué haces?",
            opciones: [
                "Pido ayuda y trabajo con él para repararlo.", 
                "Intento saltar el puente, aunque sea peligroso.", 
                "Me doy la vuelta y busco otro camino.", 
                "Me quedo esperando a ver si se arregla solo."
            ],
            correcta: 0,
            sticker: "✝️ Cruz",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "Te enfermas en el camino y un cuidador te ofrece un aceite que da paz y fuerza. ¿Qué decides?",
            opciones: [
                "Lo rechazo porque creo que no lo necesito.", 
                "Acepto el aceite para sentirme acompañado y seguir.", 
                "Lo guardo para usarlo otro día.", 
                "Me quedo en la posada sin hacer nada."
            ],
            correcta: 1,
            sticker: "❤️ Corazón",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "Encuentras a alguien que quiere caminar contigo para siempre. Hay un arco donde los viajeros prometen ayudarse. ¿Qué haces?",
            opciones: [
                "Paso por el arco porque quiero caminar acompañado.", 
                "Sigo solo porque prefiero decidir todo yo.", 
                "Le digo que caminaré con él solo a veces.", 
                "Me alejo porque no quiero compromisos."
            ],
            correcta: 0,
            sticker: "💖 Corazón Solidario",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            pregunta: "El guardián del faro te pregunta si quieres dedicar tu vida a guiar a otros viajeros. ¿Qué respondes?",
            opciones: [
                "No, prefiero seguir mi propio viaje.", 
                "Sí, quiero ayudar a otros a encontrar el camino.", 
                "Tal vez, pero necesito pensarlo mucho.", 
                "Me quedo un tiempo ayudando, pero sin comprometerme."
            ],
            correcta: 1,
            sticker: "🏆 Cáliz Dorado",
            imagen: "src/imgs/sos_rescate2.png"
        }
    ],

    // ⛑️ SOS Rescate: Integrando casos del Word
    sosRescate: [
        {
            situación: "Un amigo perdió su cuaderno. ¿Qué harías?",
            opciones: [
                { texto: "Me río.", correcta: false },
                { texto: "Le presto uno", correcta: true },
                { texto: "Me voy y no digo nada.", correcta: false }
            ],
            mensaje: "¡Muy bien! Ayudar al prójimo es parte del viaje con Jesús.",
            sticker: "❤️ Corazón",
            imagen: "src/imgs/iconos L6 SOS.png"
            
        },
        {
            situación: "En el recreo, Pedro ve que su amigo olvidó traer su comida. Pedro le ofrece la mitad de su sándwich y dice:—Comparte conmigo para que no te quedes con hambre.",
            opciones: [
                { texto: "Me como lo mío rápido.", correcta: false },
                { texto: "Comparto la mitad de mi sándwich.", correcta: true }
            ],
            mensaje: "¡Eso es fraternidad!",
            sticker: "🍞 Pan",
            imagen: "src/imgs/iconos L6 SOS.png"
            
        }
    ],

    // ⚠️ Curva Peligrosa: Textos literales del Word
    curvasPeligrosas: [
        {
            situación: "Tu guía del viaje te pide que sigas por un sendero seguro, pero ves un atajo que parece más rápido, aunque no sabes a dónde lleva.",
            pregunta: "¿Qué haces?",
            opciones: [
                "Tomo el atajo sin avisar porque quiero llegar primero.", 
                "Me quedo dudando sin moverme.", 
                "Sigo a otros niños que también quieren desobedecer.", 
                "Sigo el camino seguro porque confío en mi guía."
            ],
            correcta: 3,
            retroceso: 2,
            imagen: "src/imgs/curva peligrosa.png"
        },
        {
            situación: "Un compañero cambia una señal del camino y te pide que digas que tú no viste nada, aunque sabes que otros viajeros podrían perderse.",
            pregunta: "¿Qué decides?",
            opciones: [
                "Miento para que mi compañero no se enoje.", 
                "No digo nada y espero que nadie lo note.", 
                "Digo la verdad para que nadie se pierda.", 
                "Le pido que él mismo diga la verdad, pero no hago nada más."
            ],
            correcta: 2,
            retroceso: 2,
            imagen: "src/imgs/curva peligrosa.png"
        },
        {
            situación: "Juan rompió sin querer un lápiz de su compañero en clase. Cuando la maestra pregunta quién lo hizo, Juan responde:—Yo no fui, ya estaba roto cuando lo encontré.",
            pregunta: "¿Actuó correctamente Juan?",
            opciones: ["Sí, para evitar el regaño.", "No, debió decir la verdad."],
            correcta: 1,
            retroceso: 2,
            imagen: "src/imgs/curva peligrosa.png"
        },
        {
            situación: "En el recreo, Sofía lleva una bolsa grande de galletas. Sus amigos le piden si puede compartir, pero Sofía dice:—No, son todas mías, no quiero darles ninguna.",
            pregunta: "¿Es esta una actitud del viajero de la fe?",
            opciones: ["No, compartir nos hace felices.", "Sí, son sus galletas."],
            correcta: 0,
            retroceso: 1,
            imagen: "src/imgs/curva peligrosa.png"
        }
    ],

    // 🔄 Retorno al Camino: Casillas de reparación
    retornoCamino: [
        {
            situación: "Durante el viaje, empujaste a un compañero, más tarde te das cuenta de que traes una piedra en tu mochila, la piedra te pesa y te hace caminar más lento.",
            pregunta: "¿Qué decides hacer?",
            opciones: [
                "Le pido perdón a mi compañero y saco la piedra para seguir ligero.", 
                "Sigo caminando con la piedra, aunque me pese.", 
                "Finjo que no pasó nada y espero que nadie lo note.", 
                "Le digo a otro compañero que fue culpa suya."
            ],
            correcta: 0,
            mensaje: "¡El perdón nos libera!",
            imagen: "src/imgs/sos_rescate2.png"
        },
        {
            situación: "Vas por un camino que te aleja del grupo porque te dejaste llevar por la prisa. De pronto ves una señal que te invita a regresar al sendero correcto.",
            pregunta: "¿Qué haces?",
            opciones: [
                "Sigo por el camino equivocado porque ya avancé mucho.", 
                "Me quedo parado sin saber qué hacer.", 
                "Le digo a otros que me sigan, aunque sé que no es el camino correcto.", 
                "Cambio de rumbo y vuelvo al camino bueno."
            ],
            correcta: 3,
            mensaje: "¡Siempre podemos volver al buen camino!",
            imagen: "src/imgs/sos_rescate2.png"
        }
    ],

    // ⭐ Bonus
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
            { nombre: "Pan", id: 1 }, { nombre: "Vino", id: 2 },
            { nombre: "Cáliz", id: 3 }, { nombre: "Altar", id: 4 },
            { nombre: "Cirio", id: 5 }, { nombre: "Amón", id: 6 }
        ],
        imagen: "src/imgs/estacion de servicio.png"
    }
};

export const STICKERS_LOGRO = [
    "🚍 Camión escolar", "🧭 Brújula", "⛪ Iglesia", "🍞 Pan", 
    "🍷 Vino", "❤️ Corazón", "✝️ Cruz", "🎒 Mochila",
    "🏆 Cáliz Dorado", "💖 Corazón Solidario"
];