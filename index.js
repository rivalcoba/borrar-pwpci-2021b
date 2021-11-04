// 1. Importar el modulo http
import http from "http";

// 2. Crear el servidor
// cb (callback) es una *funcion* que se ejecutara
// ante cualquier peticion de un recurso a nuestro server
// (request, response)
const server = http.createServer((req, res) => {
  // Informa en la consola del servidor que se recibe una petición
  console.log("> Se ha recibido una petición.");

  // Registrar información de la petición
  console.log(`✒ ✒ Información de la petición`);
  console.log(`✒ Url: ${req.url}`);
  console.log(`✒ Request Method: ${req.method}`);

  // Establecer el tipo de contenido que se entregara al cliente
  res.setHeader("Content-Type", "text/html");

  // Envio el contenido
  res.write("<html>");
  res.write("<head><title>My App</title></head>");
  res.write(`<body><h1>Hello from the server &#128519;</h1><p style="color:red">Recurso solicitado: ${req.url}</p></body>`);
  res.write("</html>");

  // Terminar la conexion
  res.end();
});

// 3. Pongo a trabajar el servidor
// le paso un callback que escribira en la consola
// cuando el servidor este escuchando
// 192.168.100.11:3000
server.listen(3000, "192.168.100.11", () => {
  console.log("👩‍🍳 Servidor escuchando en http://192.168.100.11:3000");
});
