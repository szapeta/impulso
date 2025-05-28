import { useState } from "react";
import Bienvenida from "./components/Bienvenida";
import Juego from "./components/Juego";

function App() {
  const [jugador, setJugador] = useState(null);

  if (!jugador) {
    return <Bienvenida onStart={setJugador} />;
  }

  return <Juego jugador={jugador} />;
}

export default App;
