import { motion } from "framer-motion";

export default function Stickman({ estado = "idle" }) {
  const variantes = {
    idle: {
      armRight: "M50,80 Q60,90 70,100",
      hammerTransform: "translate(70,100)",
    },
    jump: {
      armRight: "M50,80 Q60,60 70,50",
      hammerTransform: "translate(70,50)",
    },
    fall: {
      armRight: "M50,80 Q55,100 60,110",
      hammerTransform: "translate(60,110)",
    },
  };

  const actual = variantes[estado];

  return (
    <svg width="100" height="160" viewBox="0 0 100 160">
      {/* Cabeza */}
      <circle cx="50" cy="60" r="10" fill="black" />
      {/* Cuerpo */}
      <line x1="50" y1="70" x2="50" y2="110" stroke="black" strokeWidth="4" />
      {/* Brazo izquierdo (fijo) */}
      <path
        d="M50,80 Q40,90 30,100"
        stroke="black"
        strokeWidth="4"
        fill="transparent"
      />
      {/* Brazo derecho (animado) */}
      <motion.path
        d={actual.armRight}
        stroke="black"
        strokeWidth="4"
        fill="transparent"
        animate={{ d: actual.armRight }}
      />
      {/* Piernas */}
      <path
        d="M50,110 Q45,130 40,150"
        stroke="black"
        strokeWidth="4"
        fill="transparent"
      />
      <path
        d="M50,110 Q55,130 60,150"
        stroke="black"
        strokeWidth="4"
        fill="transparent"
      />
      {/* Martillo (forma de T) */}
      <motion.g
        animate={{ transform: actual.hammerTransform }}
        transform={actual.hammerTransform}
      >
        {/* Mango */}
        <rect x="-2" y="-20" width="4" height="20" fill="#333" />
        {/* Cabeza en forma de T */}
        <rect x="-8" y="-24" width="16" height="4" fill="#333" />
      </motion.g>
    </svg>
  );
}
