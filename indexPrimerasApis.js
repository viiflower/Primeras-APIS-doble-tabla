const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const usuariosRoutes = require("./src/routes/usuariosroutes");
const productosRoutes = require("./src/routes/productosRoutes");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});