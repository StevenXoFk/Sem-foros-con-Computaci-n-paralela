import { useState, useEffect } from "react";
import {Controlador} from "./components/Controlador.js"
import "./App.css";

// Importar las imágenes
import cat from './assets/carro1.png';
import turtle from './assets/carro2.png';
import goblin from './assets/carro3.gif';
import da from './assets/carro4.png';

const CICLOS = [
  {id: "verde", duracion: 10*1000},
  {id: "amarillo", duracion: 1 *1000},
  {id: "rojo", duracion: 1*1000}
]
const SEMAFOROS = ["topLeft", "topRight","bottomRight", "bottomLeft" ]
const controlador = new Controlador();


function App() {
  const [lights, setLights] = useState({
    topLeft: "rojo",
    topRight: "rojo",
    bottomLeft: "rojo",
    bottomRight: "rojo",
  });

  useEffect(() => {
    const hilos = SEMAFOROS.map(id => {
      let cicloI = 0

      const iniciar = () => {
        const ciclo = CICLOS[cicloI];

        const cambioPermitido = controlador.solicitarCambio(id, ciclo.id);
        
        if (cambioPermitido) {
          setLight(id, ciclo.id);
          
          setTimeout(() => {
            cicloI = (cicloI + 1) % CICLOS.length;
            iniciar();
          }, ciclo.duracion);
        } else {
          setTimeout(() => {
            iniciar();
          }, 200);
        }
      };

      return {id, iniciar};
    });

    hilos.forEach(h => {
      controlador.registrarSemaforo(h.id, h);
      h.iniciar();
    });

    
  }, []);

  function setLight(position, color) {
    if (!SEMAFOROS.includes(position)) return;
    if (!["rojo", "amarillo", "verde"].includes(color)) return;
    setLights((prev) => ({ ...prev, [position]: color }));
  }

  const canGoUp = lights.topLeft === "verde" || lights.topLeft === "amarillo";
  const canGoDown = lights.bottomRight === "verde" || lights.bottomRight === "amarillo";
  const canGoLeft = lights.bottomLeft === "verde" || lights.bottomLeft === "amarillo";
  const canGoRight = lights.topRight === "verde" || lights.topRight === "amarillo";

  const carImages = [cat, turtle, goblin, da];
  return (
    <div className="scene">
      <div className="intersection">
        <div className="road horizontal">
          <div className="lane lane-left">
            <div className={"car car-left" + (canGoLeft ? " go" : "")} style={{backgroundImage: `url(${carImages[3]})`}}></div>
            <div className={"car car-left delay-2" + (canGoLeft ? " go" : "")} style={{backgroundImage: `url(${carImages[3]})`}}></div>
          </div>
          <div className="lane lane-right">
            <div className={"car car-right" + (canGoRight ? " go" : "")} style={{backgroundImage: `url(${carImages[1]})`}}></div>
            <div className={"car car-right delay-3" + (canGoRight ? " go" : "")} style={{backgroundImage: `url(${carImages[1]})`}}></div>
          </div>
        </div>

        <div className="road vertical">
          <div className="lane lane-top">
            <div className={"car car-up" + (canGoUp ? " go" : "")} style={{backgroundImage: `url(${carImages[2]})`}}></div>
            <div className={"car car-up delay-2" + (canGoUp ? " go" : "")} style={{backgroundImage: `url(${carImages[2]})`}}></div>
          </div>
          <div className="lane lane-bottom">
            <div className={"car car-down" + (canGoDown ? " go" : "")} style={{backgroundImage: `url(${carImages[0]})`}}></div>
            <div className={"car car-down delay-3" + (canGoDown ? " go" : "")} style={{backgroundImage: `url(${carImages[0]})`}}></div>
          </div>
        </div>

        <div className="lights top-left">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.topLeft === "rojo" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.topLeft === "amarillo" ? "on" : "")} />
            <div className={"bulb green " + (lights.topLeft === "verde" ? "on" : "")} />
          </div>
        </div>

        <div className="lights top-right">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.topRight === "rojo" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.topRight === "amarillo" ? "on" : "")} />
            <div className={"bulb green " + (lights.topRight === "verde" ? "on" : "")} />
          </div>
        </div>

        <div className="lights bottom-left">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.bottomLeft === "rojo" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.bottomLeft === "amarillo" ? "on" : "")} />
            <div className={"bulb green " + (lights.bottomLeft === "verde" ? "on" : "")} />
          </div>
        </div>

        <div className="lights bottom-right">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.bottomRight === "rojo" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.bottomRight === "amarillo" ? "on" : "")} />
            <div className={"bulb green " + (lights.bottomRight === "verde" ? "on" : "")} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
