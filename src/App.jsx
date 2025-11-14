import { useState } from "react";
import "./App.css";

function App() {
  const [lights, setLights] = useState({
    topLeft: "red",
    topRight: "red",
    bottomLeft: "red",
    bottomRight: "red",
  });

  // Cambia el color de un semáforo: position = 'topLeft'|'topRight'|'bottomLeft'|'bottomRight'
  // color = 'red'|'yellow'|'green'
  function setLight(position, color) {
    if (!["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(position)) return;
    if (!["red", "yellow", "green"].includes(color)) return;
    setLights((prev) => ({ ...prev, [position]: color }));
  }

  return (
    <div className="scene">
      <div className="intersection">
        <div className="road horizontal">
          <div className="lane lane-left" />
          <div className="lane lane-right" />
        </div>

        <div className="road vertical">
          <div className="lane lane-top" />
          <div className="lane lane-bottom" />
        </div>

        <div className="lights top-left">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.topLeft === "red" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.topLeft === "yellow" ? "on" : "")} />
            <div className={"bulb green " + (lights.topLeft === "green" ? "on" : "")} />
          </div>
        </div>

        <div className="lights top-right">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.topRight === "red" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.topRight === "yellow" ? "on" : "")} />
            <div className={"bulb green " + (lights.topRight === "green" ? "on" : "")} />
          </div>
        </div>

        <div className="lights bottom-left">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.bottomLeft === "red" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.bottomLeft === "yellow" ? "on" : "")} />
            <div className={"bulb green " + (lights.bottomLeft === "green" ? "on" : "")} />
          </div>
        </div>

        <div className="lights bottom-right">
          <div className="traffic-light">
            <div className={"bulb red " + (lights.bottomRight === "red" ? "on" : "")} />
            <div className={"bulb yellow " + (lights.bottomRight === "yellow" ? "on" : "")} />
            <div className={"bulb green " + (lights.bottomRight === "green" ? "on" : "")} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
