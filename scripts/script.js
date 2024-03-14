
var productos = []

function agregarProductos(producto, precio){

    let indice = productos.findIndex(p => p.producto === producto);

    if(indice === -1){
    productos.push(
        {
            producto: producto,
            precio: precio,
            cantidad: 1
        }
    )
    }else{
        productos[indice].cantidad++
    }

console.log(productos);
actualizarTabla()
}

function actualizarTabla(){
    let tbody = document.getElementById('tbody')
    let total = 0;

    tbody.innerHTML = ''

    for (let item of productos){
        let fila = tbody.insertRow();

        let celdaProducto = fila.insertCell(0);
        let celdaCantidad = fila.insertCell(1);
        let celdaPrecio = fila.insertCell(2);
        let celdaTotal = fila.insertCell(3);
        let celdaAcciones = fila.insertCell(4);
    
        celdaProducto.textContent = item.producto;
        celdaCantidad.textContent = item.cantidad;
        celdaPrecio.textContent = item.precio;
        celdaTotal.textContent = item.cantidad * item.precio


        let boton = document.createElement('button');
        boton.textContent= 'Eliminar'
        celdaAcciones.append(boton);
        boton.className = 'btn btn-danger'// agregar estilo estando en js


        boton.addEventListener('click', function(){
            ///agregar funcion al boton cuando no esta con base de datos
        })


        total += item.cantidad * item.precio;

    }

    document.getElementById('total').textContent = total

}

