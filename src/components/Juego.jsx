import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import caricatura from "../assets/caricatura.png";

export default function Juego({ jugador }) {
  const [altura, setAltura] = useState(10);
  const [cargando, setCargando] = useState(false);
  const controls = useAnimation();

  const fuerza = useRef(0);
  const acumulador = useRef(null);

  const empezarAcumular = () => {
    setCargando(true);
    fuerza.current = 0;

    acumulador.current = setInterval(() => {
      if (fuerza.current < 600) {
        fuerza.current += 15;
      }
    }, 50);
  };

  const soltarCarga = async () => {
    setCargando(false);
    clearInterval(acumulador.current);

    let velocidad = fuerza.current;
    fuerza.current = 0;

    let alturaTotal = 0;
    setAltura(0); // 🔄 Reiniciar altura

    // Subida (más rápida y progresiva)
    while (velocidad > 0) {
      alturaTotal += velocidad * 0.01;
      await controls.start({
        y: -alturaTotal * 5,
        transition: { duration: 0.04 },
      });
      velocidad -= 8; // gravedad más suave
    }

    // Caída con rebote natural
    await controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 12 },
    });

    setAltura(Math.floor(alturaTotal));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-sky-100 to-blue-200 relative overflow-hidden p-4">
      {/* Nombre */}
      <div className="absolute top-4 left-4 text-xl font-bold text-blue-900">
        👦 {jugador}
      </div>

      {/* Altura */}
      <div className="absolute top-4 right-4 text-xl font-bold text-purple-700">
        ⬆️ {altura} metros
      </div>

      {/* Suelo */}
      <div className="absolute bottom-24 left-0 w-full h-16 bg-gradient-to-t from-green-600 to-green-400 border-t-4 border-green-800 rounded-t-xl z-10 shadow-inner"></div>

      {/* Caricatura */}
      <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-20">
        <motion.img
          src={caricatura}
          alt="Caricatura"
          className="w-32 h-auto"
          animate={controls}
          initial={{ y: 0 }}
        />
      </div>

      {/* Botón de carga */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-0">
        <motion.button
          onMouseDown={empezarAcumular}
          onMouseUp={soltarCarga}
          onTouchStart={empezarAcumular}
          onTouchEnd={soltarCarga}
          animate={{
            scale: cargando ? [1, 1.1, 1] : 1,
            boxShadow: cargando
              ? ["0 0 0px yellow", "0 0 20px orange", "0 0 0px yellow"]
              : "0 4px 10px rgba(0,0,0,0.3)",
          }}
          transition={{
            repeat: cargando ? Infinity : 0,
            duration: 0.5,
          }}
          className="px-8 py-4 bg-amber-400 text-white font-bold rounded-full text-lg hover:bg-amber-500 active:scale-95"
        >
          {cargando ? "Cargando..." : "Cargar"}
        </motion.button>
      </div>
    </div>
  );
}
