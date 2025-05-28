import { motion } from "framer-motion";

export default function Stickman({ estado = "idle" }) {
  // Coordenadas del extremo del brazo derecho
  const variantes = {
    idle: {
      armLeft: "M50,80 Q40,90 30,100",
      armRight: "M50,80 Q60,90 70,100",
      legLeft: "M50,110 Q45,130 40,150",
      legRight: "M50,110 Q55,130 60,150",
      hammerEnd: { x: 70, y: 100 },
    },
    jump: {
      armLeft: "M50,80 Q40,60 30,50",
      armRight: "M50,80 Q60,60 70,50",
      legLeft: "M50,110 Q45,100 40,90",
      legRight: "M50,110 Q55,100 60,90",
      hammerEnd: { x: 70, y: 50 },
    },
    fall: {
      armLeft: "M50,80 Q45,100 40,110",
      armRight: "M50,80 Q55,100 60,110",
      legLeft: "M50,110 Q48,130 45,145",
      legRight: "M50,110 Q52,130 55,145",
      hammerEnd: { x: 60, y: 110 },
    },
  };

  const actual = variantes[estado];

  return (
    <svg width="100" height="160" viewBox="0 0 100 160">
      {/* Cabeza */}
      <circle cx="50" cy="60" r="10" fill="black" />

      {/* Cuerpo */}
      <line x1="50" y1="70" x2="50" y2="110" stroke="black" strokeWidth="4" />

      {/* Brazos */}
      <motion.path
        d={actual.armLeft}
        stroke="black"
        strokeWidth="4"
        fill="transparent"
        animate={{ d: actual.armLeft }}
      />
      <motion.path
        d={actual.armRight}
        stroke="black"
        strokeWidth="4"
        fill="transparent"
        animate={{ d: actual.armRight }}
      />

      {/* Piernas */}
      <motion.path
        d={actual.legLeft}
        stroke="black"
        strokeWidth="4"
        fill="transparent"
        animate={{ d: actual.legLeft }}
      />
      <motion.path
        d={actual.legRight}
        stroke="black"
        strokeWidth="4"
        fill="transparent"
        animate={{ d: actual.legRight }}
      />

      {/* Martillo en forma de T */}
      <motion.g
        animate={{
          x: actual.hammerEnd.x,
          y: actual.hammerEnd.y,
        }}
        transform="translate(-1, -20)" // ajusta para que salga desde la mano
      >
        {/* Mango vertical */}
        <rect x="0" y="0" width="2" height="20" fill="blue" />
        {/* Cabeza horizontal */}
        <rect x="-5" y="0" width="12" height="4" fill="blue" />
      </motion.g>
    </svg>
  );
}
