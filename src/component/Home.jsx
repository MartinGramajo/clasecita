import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  // state donde guardamos el texto ingresado al input por el usuario.
  const [input, setInput] = useState({ titulo: "", estado: "" });

  // state donde guardamos y listamos cada una de las tareas ingresada.
  const [tareas, setTareas] = useState([]);
  console.log("~ tareas", tareas);

  // funcion para cargar al listado de tarea, nuevas tareas
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    input.id = uuidv4();
    const nuevoArray = [...tareas, { ...input }];
    setTareas(nuevoArray);
    form.reset();
  };

  // funcion para capturar lo ingresado por el usuario en el input
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  // filter aplicado para borrar un elemento del listado tarea.
  const borrarElemento = (i) => {
    const tareaFiltrada = tareas.filter((tarea) => tarea.id !== i);
    setTareas(tareaFiltrada);
  };

  const cambiarEstado = (i) => {
    const tareaModificada = tareas.map((tarea) => {
      if (tarea.id === i) {
        console.log("~ tarea", tarea);
        if (tarea.estado === "completa") {
          const tareaEstado = { ...tarea, estado: "" };
          return tareaEstado;
        } else {
          const tareaEstado = { ...tarea, estado: "completa" };
          return tareaEstado;
        }
      } else {
        return tarea;
      }
    });
    setTareas(tareaModificada);
  };

  // funcion para tachar una tarea completada.
  // const tachar = (i) => {
  //   const tareaModificada = tareas.map((tarea) => {
  //     if (tarea.id === i) {
  //       const tareaEstado = { ...tarea, estado: "completa" };
  //       return tareaEstado;
  //     } else {
  //       return tarea;
  //     }
  //   });
  //   setTareas(tareaModificada);
  // };

  // funcion para tachar una tarea completada.
  // const destachar = (i) => {
  //   const tareaModificada = tareas.map((tarea) => {
  //     if (tarea.id === i) {
  //       const tareaEstado = { ...tarea, estado: "" };
  //       return tareaEstado;
  //     } else {
  //       return tarea;
  //     }
  //   });
  //   setTareas(tareaModificada);
  // };
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
          {tareas.map((tarea) => (
            <div key={tarea.id}>
              {" "}
              <span
                className={
                  tarea.estado === "completa" ? "tachado" : "destachado"
                }
              >
                {tarea.titulo}
              </span>
              <button
                className="mx-3 my-2"
                onClick={() => borrarElemento(tarea.id)}
              >
                {" "}
                borrar
              </button>
              <button
                className="mx-3 my-2"
                onClick={() => cambiarEstado(tarea.id)}
              >
                {tarea.estado === "completa" ? "destachar" : "tachar"}
              </button>
              {/* {tarea.estado === "completa" ? ( 
                <button
                  className="mx-3 my-2"
                  onClick={() => cambiarEstado(tarea.id)}
                >
                  {tarea.estado === "completa" ? "destachar" : "tachar" }
                </button>
              ) : (
                <button
                  className="mx-3 my-2"
                  onClick={() => cambiarEstado(tarea.id)}
                >
                  tachar
                </button>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
