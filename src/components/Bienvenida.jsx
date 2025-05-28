import { useState } from "react";
import { motion } from "framer-motion";

export default function Bienvenida({ onStart }) {
  const [nombre, setNombre] = useState("");

  const manejarInicio = () => {
    if (nombre.trim()) {
      onStart(nombre);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-300 to-blue-300 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        ¡Bienvenido al Juego!
      </motion.h1>
      <motion.input
        type="text"
        placeholder="Escribe tu nombre..."
        className="p-3 rounded-xl text-lg md:text-xl text-center w-full max-w-xs shadow-lg focus:outline-none"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.button
        onClick={manejarInicio}
        className="mt-6 px-6 py-3 bg-yellow-400 text-white font-bold rounded-full text-lg shadow-xl hover:bg-yellow-500 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Empezar
      </motion.button>
    </div>
  );
}
