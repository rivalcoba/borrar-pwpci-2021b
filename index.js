// 1. Importar el modulo http
import http from "http";
import fs from "fs";

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
  if (url === "/") {
    // Respuesta ante "Get /"
    // 1. Estableciendo el tipo de retorno
    // como HTML
    res.setHeader("Content-Type", "text/html");
    // 2. Escribiendo la respuesta
    res.write(`
    <html>
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <h1>Send Message</h1>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">send</button>
        </form>
      </body>
    </html>
    `);
    // Cerrando conexion
    res.end();
  } else if (url === "/message" && method === "POST") {
    // 1. Se crea una variable para guardar los datos de entrada
    let body = [];
    // 2. Registrar un manejador para la entrada de los datos
    req.on("data", (chunk) => {
      // 2.1 Registrando los trozos que llegan al backend
      console.log(chunk);
      // 2.2 Acumulo los datos de entrad
      body.push(chunk);
      // 2.3 Proteccion en caso de recepción masiva de datos
      if (body.length > 1e6) req.socket.destroy();
    });

    // EjecutaOperacion(ARGS1,ARG2,ARG3, cb)
    // Modelo Asincrono
    // Suma2Numeros(1,2,cb)
    /*
    1. let res = Suma2Numeros(1,2);
    2. console.log(res) // undefined
    */

    // 3. Registrando un manejador de fin de recepción de datos
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // Guardando el mensaje en un archivo
      fs.writeFile('message.txt', message, (err)=>{
        // Verificar si hubo error
        if(err){
          console.log("> No se pudo grabar el archivo");
          res.statusCode = 500; // Internal Server Error
          res.setHeader("Content-Type", "text/html");
          res.write("ERROR WHEN LOADING FILE");
          return res.end();
        }
        // en caso de no haber error
        // Establecer el status code de redireccionamiento
        res.statusCode = 302;
        // Establecer la ruta de direcciones
        res.setHeader('Location','/');
        // Finalizo conección
        return res.end();
      });
    });
  } else if (url === "/author") {
    // Respuesta ante "Get /"
    // 1. Estableciendo el tipo de retorno
    // como HTML
    res.setHeader("Content-Type", "text/html");
    let url_image =
      "https://yt3.ggpht.com/ytc/AKedOLR8TH6qHa2gwbGT6muhZKx_IotBWygSNcG3LGzFosM=s900-c-k-c0x00ffffff-no-rj";
    // 2. Escribiendo la respuesta
    res.write("<html>");
    res.write("<head><title>My App</title></head>");
    res.write("<body>");
    res.write("<h1>&#9889; Author &#9889;</h1>");
    res.write("<p>Ivan Rivalcoba Rivas - Web Developer</p>");
    res.write(
      `<img width="300px" src="${url_image}" alt="Foto Ivan Rivalcoba">`
    );
    res.write("</body>");
    res.write("</html>");
    // Cerrando conexion
    res.end();
  } else {
    // Se registra el Recurso no encontrado
    console.log(`❌ No se ha econtrado el recurso: ${url}`);
    // Recurso no econtrado
    // 1. Estableciendo el tipo de retorno
    // como HTML
    res.setHeader("Content-Type", "text/html");
    // 2. Escribiendo la respuesta
    res.write("<html>");
    res.write("<head><title>My App</title></head>");
    res.write(
      "<body><h1>Error: 404 - Recurso no encontrado &#9940;</h1></body>"
    );
    res.write("</html>");
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
