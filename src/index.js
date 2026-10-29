import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./util.js";

const app = express();
const port = 3000;

// 1. Configuración del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// 2. Para leer lo que se escribe en el formulario
app.use(express.urlencoded({ extended: true }));

// 3. Para que funcione el archivo CSS
app.use(express.static(__dirname + "/public"));

// 4. Aquí se guardan los mensajes
const mensajes = [];

// 5. Página principal
app.get("/", (req, res) => {
  // CUADRO 2: el nombre viene de la URL
  const username = req.query.username || "Stefanny";

  res.render("index", {
    title: "Publicidad",
    username: username,
    mensajes: mensajes,              // CUADRO 3
    hayMensajes: mensajes.length > 0
  });
});

// 6. Cuando se presiona ENVIAR
app.post("/mensaje", (req, res) => {
  const { username, mensaje } = req.body;

  if (mensaje && mensaje.trim() !== "") {
    mensajes.push({
      username: username,
      mensaje: mensaje.trim(),
      hora: new Date().toLocaleTimeString("es-CO")
    });
  }

  res.redirect("/?username=" + encodeURIComponent(username));
});

// 7. Encender el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});