import { useState, useEffect } from "react";
import "./App.css";
import Boton from "./Boton.jsx";
import * as XLSX from "xlsx";

function App() {
  //Funcion para evitar cerrar la ventana
  /*  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Personaliza el mensaje que se mostrará al usuario
      const confirmationMessage = '¿Seguro que quieres salir de esta página?';
      // Se establece el mensaje en el evento
      event.returnValue = confirmationMessage;
      // Devuelve el mensaje para que se muestre al usuario
      return confirmationMessage;
    };

    // Agrega el evento beforeunload al cargar el componente
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Elimina el evento beforeunload al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);*/

  function exportToExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.sheet_add_aoa(worksheet, [["Total Bs:", count]], { origin: -1 });
    XLSX.utils.sheet_add_aoa(worksheet, [["Total $:", dolar]], { origin: -1 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${nuevaFecha}.xlsx`);
  }

  function handleExportClick() {
    exportToExcel(productos);
  }

  //USE STATES
  const [count, setCount] = useState(0);
  const [productos, setProductos] = useState([]);

  
  const [precioDolar, setPrecioDolar] = useState(40);

  var dolar = count / precioDolar;

  //VARIABLES FECHAS
  const fechaActual = new Date();
  const nuevaFecha = fechaActual.toLocaleDateString();
  const nuevaHora = fechaActual.toLocaleTimeString();
  const currentDate = new Date(); // currentDate.toLocaleDateString()

  //FUNCIONES
  //Agregar producto
  const agregarProducto = (product, price) => {
    const nuevoProducto = {
      id: productos.length + 1, // Aquí puedes generar un ID único, por ejemplo, con una función como uuid()
      producto: product,
      precio: price, // Precio del producto
      fecha: nuevaFecha,
      hora: nuevaHora,
    };
    setProductos([...productos, nuevoProducto]);
    setCount(count + price);
  };

  //Eliminar productos
  const eliminarProducto = (id, precio) => {
    const nuevaLista = productos.filter((item) => item.id !== id); // Filtrar la lista para excluir el elemento con el ID específico
    setProductos(nuevaLista); // Actualizar el estado con la nueva lista sin el elemento con el ID
    const listaActualizada = nuevaLista.map((tarea, index) => {
      return {
        ...tarea,
        id: index,
      };
    });
    setProductos(listaActualizada);
    setCount(count - precio);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <h5 className="border">
            {" "}
            <span className="border">
              Fecha: {currentDate.toLocaleDateString()}{" "}
            </span>{" "}
            <span className="border"> Dolar hoy: {precioDolar}</span>
          </h5>
          <h5></h5>

          <div className="card text-start bg-warning">
            <div className="card-body">
              <h4 className="card-title">IMPRESIONES</h4>
              <div className="row">
                <div className="col-4">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name="Blanco y negro"
                    price={10}
                  />
                </div>
                <div className="col-4">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name="Copias a color"
                    price={30}
                  />
                </div>
                <div className="col-4">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name="Delante y por detras"
                    price={15}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card text-start mt-2 bg-info">
            <div className="card-body">
              <h4 className="card-title">RECARGAS</h4>
              <div className="row">
                <div className="col-4">
                  <Boton
                    onClick={agregarProducto}
                    name=" Digitel 50"
                    price={10}
                  />
                </div>
                <div className="col-4">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name=" Movistar 45"
                    price={10}
                  />
                </div>
                <div className="col-4">
                  <Boton
                    onClick={agregarProducto}
                    name=" Movilnet 40"
                    price={10}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card text-start mt-2 bg-danger">
            <div class="card-body">
              <h4 class="card-title">Productos</h4>
              <div className="row">
                <div className="col-3">
                  {" "}
                  <Boton onClick={agregarProducto} name="Chupi" price={10} />
                </div>
                <div className="col-3">
                  {" "}
                  <Boton onClick={agregarProducto} name="Yogurt" price={40} />
                </div>
                <div className="col-3">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name="Cartulina"
                    price={20}
                  />
                </div>
                <div className="col-3">
                  {" "}
                  <Boton
                    onClick={agregarProducto}
                    name="Hoja Blanca"
                    price={1}
                  />
                </div>
                <div className="col-3">
                  <Boton
                    onClick={agregarProducto}
                    name="Papel bond"
                    price={20}
                  />
                </div>
                <div className="col-3">
                  <Boton
                    onClick={agregarProducto}
                    name="Foami esc"
                    price={20}
                  />
                </div>
                <div className="col-3">
                  <Boton
                    onClick={agregarProducto}
                    name="Foami liso"
                    price={12}
                  />
                </div>
                <div className="col-3">
                  <Boton
                    onClick={agregarProducto}
                    name="Saca puntas"
                    price={40}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card text-start mt-2 bg-info">
            <div className="card-body">
              <h4 className="card-title">Montos individuales</h4>
              <div className="row">
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="5 Bs" price={5} />
                </div>
                <div className="col-2">
                  {" "}
                  <Boton onClick={agregarProducto} name="10 Bs" price={10} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="15 Bs" price={15} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="20 Bs" price={20} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="25 Bs" price={25} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="30 Bs" price={30} />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="40 Bs" price={40} />
                </div>
                <div className="col-2">
                  {" "}
                  <Boton onClick={agregarProducto} name="50 Bs" price={50} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="60 Bs" price={60} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="70 Bs" price={70} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="80 Bs" price={80} />
                </div>
                <div className="col-2">
                  <Boton onClick={agregarProducto} name="100 Bs" price={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ">
          <h5 className="text-end"> Cantidad: {productos.length} </h5>

          <ul className="liss border">
            <div className="row border">
              <div className="col-3 border fs-4">Concepto</div>
              <div className="col-2  border fs-4">Ingreso</div>
              <div className="col-2 border fs-4">Hora</div>
              <div className="col-4 border fs-4">Fecha</div>
            </div>

            {productos.map((producto, index) => (
              <li key={index} className="row border">
                <div className="col-3 border">{producto.producto}</div>
                <div className="col-2 border">{producto.precio} Bs</div>
                <div className="col-2 border">{producto.hora}</div>
                <div className="col-4 border">{producto.fecha}</div>
                <div className="col-1 ">
                  <button
                    className=" btn btn-danger"
                    onClick={() => {
                      eliminarProducto(producto.id, producto.precio);
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="border">
            Dolares: <span className="text-success"> {dolar}$ </span>/
            Bolivares: <span className="text-success"> {count}Bs</span>
          </h3>
          <button className="btn btn-success" onClick={handleExportClick}>
            Descarga excel
          </button>
          <button
            className="btn btn-info mx-2"
            onClick={() => {
              const valorIngresado = prompt(
                "Por favor, ingresar el valor de dolar a cambiar:"
              );

              const precio = parseFloat(valorIngresado);

              // Verificar si el valor ingresado es un número válido
              if (!isNaN(precio)) {
                // Establecer el estado con el valor ingresado
                setPrecioDolar(precio);
              } else {
                // Si el valor ingresado no es un número, mostrar un mensaje de error al usuario
                alert(
                  "El valor ingresado no es un número válido. Se mantendrá el valor actual de precioDolar."
                );
              }
            }}
          >
            Cambiar precio dolar
          </button>


        </div>
      </div>
    </div>
  );
}

export default App;
