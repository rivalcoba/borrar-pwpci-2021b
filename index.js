// 1. Importar el modulo http
import http from "http";

/**
 * Codigos de Emojies
 * Ref: https://www.w3schools.com/charsets/ref_emoji.asp
 */

// 2. Crear el servidor
// cb (callback) es una *funcion* que se ejecutara
// ante cualquier peticion de un recurso a nuestro server
// (request, response)
const server = http.createServer((req, res) => {
  // Obteniendo el recurso solicitado
  let { url, method } = req;

  // Informa en la consola del servidor que se recibe una petición
  console.log(`📮 Se ha solicitado el siguiente recurso: ${method}: ${url}`);
  
  // filtrar la url
  if(url === '/'){
    // Respuesta ante "Get /"
    // 1. Estableciendo el tipo de retorno
    // como HTML
    res.setHeader('Content-Type', 'text/html');
    // 2. Escribiendo la respuesta
    res.write('<html>');
    res.write('<head><title>My App</title></head>');
    res.write('<body><h1>&#9889; Hello from my server &#9889;</h1></body>');
    res.write('</html>');
    // Cerrando conexion
    res.end();

  }else{
    // Se registra el Recurso no encontrado
    console.log(`❌ No se ha econtrado el recurso: ${url}`);
    // Recurso no econtrado
    // 1. Estableciendo el tipo de retorno
    // como HTML
    res.setHeader('Content-Type', 'text/html');
    // 2. Escribiendo la respuesta
    res.write('<html>');
    res.write('<head><title>My App</title></head>');
    res.write('<body><h1>Error: 404 - Recurso no encontrado &#9940;</h1></body>');
    res.write('</html>');
    // Cerrando conexion
    res.end();
  }
});

// 3. Pongo a trabajar el servidor
// le paso un callback que escribira en la consola
// cuando el servidor este escuchando
// 192.168.100.11:3000
server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://0.0.0.0:3000");
});
