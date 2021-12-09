// 1 Importando el enrutador de Express
import { Router } from "express";
// Importando el modulo Path de node
// para trabajar con rutas absolutas
import path from "path";
// Importando Helper
import { ROOT_DIR } from '../helpers/path.helper.js';

// 2 Crear una instancia del enrutador
const router = Router();

// Se debe colocar primero ya que el orden de registro
// determina el orden de verificación
router.get("/about", (_, res) => {
  res.send("<h1>💡 Acerca de...</h1>\n🙋‍♂️ Sitio inicial hecho con NodeJs");
});

// La ruta raíz entra en todo tipo de petición
router.get(["/", "/home"], (_, res) => {
  const filePath = path.join(ROOT_DIR, "server", "views", "shop.html");
  res.sendFile(filePath);
});

export default router;
