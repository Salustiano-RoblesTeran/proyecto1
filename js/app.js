class Tarea {
    constructor (text, id, done = false) {
        this.text = text;
        this.id = id;
        this.done = done;
    }
}

// Metodo json.parse es un metodo de javascript para convertir cadena de texto en formato json (JSON (JavaScript Object Notation) es un formato de texto ligero para el intercambio de datos)
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

let contenedorTarjetas = document.getElementById('contenedor-tarjetas');


// Funciones - CRUD

// Crear una tarea
const agregarTarea = (event) => {
      //Detener el submit
  event.preventDefault();

  //Capturar el "valor" del input del form
  let text = document.querySelector("#textTarea").value;
  console.log(text);

  //Validaciones
  if (text.length > 5) {
    //Enviar al ARRAY - BD, como un OBJETO
    tareas.push(new Tarea(text, new Date().getTime()));

    //Enviar a localStorage - en formato JSON
    localStorage.setItem('tareas', JSON.stringify(tareas));

    //Limpiar el INPUT
    document.querySelector("#textTarea").value = "";

    //Imprima la CARD
    listarTarea();
  } else {
    console.log(`La palabra ${text} es muy corta!`)
  }
};

// Mostrar tareas

const listarTarea = () => {
    // Limpiamos el html del contenedor de las cards
    contenedorTarjetas.innerHTML = "";

    // Iterar el arreglo de tareas

    tareas.map((item) => {
        // Crear la tarjeta de la tarea
        // Contenedor
        let columna = document.createElement("div");
        columna.classList.add("col-12", "m-2");

        // Tarjeta
        let card = `
        <div class="card-body d-flex justify-content-between align-items-center">
        <span class="${item.done ? "text-decoration-line-through" : ""}" onclick="marcarTarea(${item.id})">${item.text}</span>
        <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${item.id})">X</button>
        </div>
        `

        columna.innerHTML = card;

        contenedorTarjetas.append(columna);
    })
}

// Funcion para traer las tareas pendientes

let tareasPendientes = tareas.filter((item) => {
    return item.done == false;
});
console.log(tareasPendientes);
// Tareas pendientes
document.getElementById("tareas_pendientes").innerHTML = tareasPendientes.length;

// Total de tareas
document.getElementById("tareas_total").innerHTML = tareas.length;


const eliminarTarea = (id) => {
    let index = tareas.findIndex((item) => {
        return item.id == id;
    })

    // Eliminar tarea
    tareas.splice(index, 1);

    // Actualizar BD
    localStorage.setItem("tareas", JSON.stringify(tareas));

    // Mostrar tareas
    listarTarea();
}

// Marcar Tareas
const marcarTarea = (id) => {
    let index = tareas.findIndex((item) => {
        return item.id == id;
    })

    tareas[index].done = !tareas[index].done;

    // Actualizar BD
    localStorage.setItem("tareas", JSON.stringify(tareas));

    // Mostrar tareas
    listarTarea();
} 


listarTarea();