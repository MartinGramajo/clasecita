import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState({ titulo: "", estado: "" });
  const [tareas, setTareas] = useState([]);
  console.log("~ tareas", tareas);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    const nuevoArray = [...tareas, input];
    setTareas(nuevoArray);
    form.reset();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  const borrarElemento = (i) => {
    const tareaFiltrada = tareas.filter((_, index) => index !== i);
    setTareas(tareaFiltrada);
  };

  const tachar = (i) => {
    const tareaModificada = tareas.map((tarea, index) => {
      if (index === i) {
        const tareaEstado = { ...tarea, estado: "completa" };
        return tareaEstado;
      } else {
        return tarea;
      }
    });
    setTareas(tareaModificada);
  };

  return (
    <div>
      <h1 className="text-center my-5">LISTA DE TAREA </h1>
      <div>
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mx-2"> ingresar tarea</label>
            <input type="text" name="titulo" onChange={handleChange} />
            <button className="mx-2 btn btn-primary" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <h1 className="fs-5">tareas para mostrar</h1>
        <div className="my-2">
          {tareas.map((tarea, i) => (
            <div key={i}>
              {" "}
              <span className={tarea.estado === "completa" && "tachado"}>
                {tarea.titulo}
              </span>
              <button className="mx-3 my-2" onClick={() => borrarElemento(i)}>
                {" "}
                borrar
              </button>
              <button className="mx-3 my-2" onClick={() => tachar(i)}>
                {" "}
                tachar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
