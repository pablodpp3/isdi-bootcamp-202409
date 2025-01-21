const express = require("express");
const Provider = require("./models/provider")
const app = express();

// Ruta para buscar centros por categoría
app.get("/api/providers", async (req, res) => {
  const { category, name } = req.query; // Obtenemos la categoría desde el query

  try {
    // Crea un objeto de filtro vacío
    let filtro = {};

    // para la categoría
    if (category) {
      filtro.categories = category;
    }

    //para el nombre
    if (name) {
      filtro.name = { $regex: name, $options: "i" }; 
    }

    // Busca los proveedores en la base de datos con los filtros aplicados
    const providers = await Provider.find(filtro).populate("categories");

    // Devuelve los proveedores encontrados
    res.json(providers);
  } catch (error) {
    console.error("Error al buscar proveedores:", error);
    res.status(500).json({ message: "Error al buscar proveedores" });
  }
});