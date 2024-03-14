var productos = [];

function agregarProductos(id, producto, precio) {
  let indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    postJson({
      id: id,
      producto: producto,
      precio: precio,
      cantidad: 1,
    });
  } else {
    productos[indice].cantidad++;
    putJSON(productos[indice]);
  }

  console.log(productos);
  //actualizarTabla()
}

function actualizarTabla() {
  let tbody = document.getElementById("tbody");
  let sTotal = 0;
  let iva = 0;
  let total = 0;

  tbody.innerHTML = "";

  for (let item of productos) {
    let fila = tbody.insertRow();

    let celdaProducto = fila.insertCell(0);
    let celdaCantidad = fila.insertCell(1);
    let celdaPrecio = fila.insertCell(2);
    let celdaTotal = fila.insertCell(3);
    let celdaAcciones = fila.insertCell(4);

    celdaProducto.textContent = item.producto;
    celdaCantidad.textContent = item.cantidad;
    celdaPrecio.textContent = item.precio;
    celdaTotal.textContent = item.cantidad * item.precio;

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn btn-danger";
    botonEliminar.dataset.id = item.id; // Añadir el id del producto como atributo personalizado

    botonEliminar.addEventListener("click", function () {
      let idProducto = this.dataset.id; // Obtener el id del producto del atributo personalizado
      let productoAEliminar = productos.find(p => p.id === idProducto); // Buscar el producto en la lista de productos
      if (!productoAEliminar) return; // Salir si no se encuentra el producto

      swalWithBootstrapButtons
        .fire({
          title: "¿Eliminar el Producto?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            deleteJSON(productoAEliminar.id);
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "Tu archivo ha sido eliminado.",
              icon: "success",
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "Tu archivo está a salvo :)",
              icon: "error",
            });
          }
        });
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    
    celdaAcciones.appendChild(botonEliminar);

    sTotal += item.cantidad * item.precio;
  }

  iva = sTotal * 0.12;
  total = sTotal + iva;

  document.getElementById("subtotal").textContent = sTotal.toFixed(2);
  document.getElementById("iva").textContent = iva.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}


//////guardar post

function postJson(data) {
  let url = "http://localhost:3000/carrito";

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

/////Cargar GET
async function getJSON(data) {
  try {
    const response = await fetch("http://localhost:3000/carrito", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);

    productos = result;
    actualizarTabla();
  } catch (error) {
    console.error("Error:", error);
  }
}

window.onload = function () {
  getJSON();
};

///actualizar -PUT

async function putJSON(data) {
  try {
    const response = await fetch(`http://localhost:3000/carrito/${data.id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);

    productos = result;
  } catch (error) {
    console.error("Error:", error);
  }
}

///// Eliminar - DELETE/////
async function deleteJSON(id) {
  try {
    const response = await fetch(`http://localhost:3000/carrito/${id}`, {
      method: "DELETE", // or 'PUT'
    });

    const result = await response.json();
    console.log("Success:", result);

    productos = result;
  } catch (error) {
    console.error("Error:", error);
  }
}
