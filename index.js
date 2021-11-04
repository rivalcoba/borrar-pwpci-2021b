// 1. Importar el modulo http
import http from "http";

// 2. Crear el servidor
// cb (callback) es una *funcion* que se ejecutara
// ante cualquier peticion de un recurso a nuestro server
// (request, response)
const server = http.createServer((req, res) => {
  console.log("> Se ha recibido una petición.");
  // Registrar información de la petición
  console.log(`✒ ✒ Información de la petición`);
  console.log(`✒ url: ${req.url}`);
  console.log(`✒ Request Method: ${req.method}`);
  console.log(`✒ Plataforma del cliente: ${req.headers["sec-ch-ua-platform"]}`);
  // Respondemos
  res.write("Esta es la respuesta del servidor.");
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
