export class Controlador {
    constructor() {
        this.event = new EventTarget();
        this.semaforos = new Map();
        this.estadoActual = new Map();
        this.turno = 0;
        this.orden = ["topLeft", "topRight", "bottomRight", "bottomLeft"];
    }

    registrarSemaforo(id, worker) {
        this.semaforos.set(id, worker);
        this.estadoActual.set(id, "rojo");
    }

    coordinarCambio(id, color) {
        if (color === "rojo" && id === this.orden[this.turno]) {
            this.turno = (this.turno + 1) % this.orden.length;
        }

        const evento = new CustomEvent("cambio", {
            detail: { position: id, color: color, tiempo: Date.now() }
        });
        this.event.dispatchEvent(evento);
    }

    solicitarCambio(id, color) {
        const puede = this.validarCambio(id, color);
        if (puede) {
            this.estadoActual.set(id, color);
            this.coordinarCambio(id, color);
        }
        return puede
    }

    validarCambio(id, color) {
        if (color !== "verde") return true;

        const esTurno = this.orden[this.turno] === id;
        if (!esTurno) return false;

        for (let [id1, estado] of this.estadoActual) {
            if (id1 !== id && estado === "verde") {
                return false;
            }
        }
        return true;
    }

    obtenerEstado(id) {
        return this.estadoActual.get(id) || "rojo";
    }
}