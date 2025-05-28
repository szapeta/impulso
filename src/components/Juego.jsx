import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Stickman from "./Stickman"; // Asegúrate de tener este archivo

export default function Juego({ jugador }) {
  const [altura, setAltura] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [estadoAnimacion, setEstadoAnimacion] = useState("idle");

  const controls = useAnimation();
  const fondoControls = useAnimation();

  const fuerza = useRef(0);
  const acumulador = useRef(null);
  const alturaActual = useRef(0);

  const empezarAcumular = () => {
    setCargando(true);
    fuerza.current = 0;
    setEstadoAnimacion("idle");

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
    alturaActual.current = 0;

    setEstadoAnimacion("jump");

    // Subida
    while (velocidad > 0) {
      alturaActual.current += velocidad * 0.01;
      setAltura(Math.floor(alturaActual.current));
      const desplazamiento = alturaActual.current * 5;

      await Promise.all([
        controls.start({ y: -desplazamiento, transition: { duration: 0.03 } }),
        fondoControls.start({
          y: desplazamiento,
          transition: { duration: 0.03 },
        }),
      ]);
      velocidad -= 8;
    }

    setEstadoAnimacion("fall");

    // Caída
    await Promise.all([
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 12 },
      }),
      fondoControls.start({
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 12 },
      }),
    ]);

    setEstadoAnimacion("idle");
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-sky-200">
      {/* Fondo y personaje movible */}
      <motion.div
        className="absolute w-full h-full"
        animate={fondoControls}
        initial={{ y: 0 }}
      >
        {/* Suelo */}
        <div className="absolute bottom-24 left-0 w-full h-16 bg-gradient-to-t from-green-600 to-green-400 border-t-4 border-green-800 rounded-t-xl z-10 shadow-inner"></div>

        {/* Stickman */}
        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div animate={controls} initial={{ y: 0 }}>
            <Stickman estado={estadoAnimacion} />
          </motion.div>
        </div>
      </motion.div>

      {/* HUD */}
      <div className="absolute top-4 left-4 text-base sm:text-xl font-bold text-blue-900 z-50">
        👦 {jugador}
      </div>
      <div className="absolute top-4 right-4 text-base sm:text-xl font-bold text-purple-700 z-50">
        ⬆️ {altura} metros
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
          transition={{ repeat: cargando ? Infinity : 0, duration: 0.5 }}
          className="px-6 py-3 bg-amber-400 text-white font-bold rounded-full text-lg hover:bg-amber-500 active:scale-95"
        >
          {cargando ? "Cargando..." : "Cargar"}
        </motion.button>
      </div>
    </div>
  );
}
