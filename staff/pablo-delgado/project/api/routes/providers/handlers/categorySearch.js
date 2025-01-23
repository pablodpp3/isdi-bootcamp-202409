import express from "express";
import { Provider } from "../../../../dat/models.js"

const app = express();

// Ruta para buscar centros por categoría
app.get("/api/providers", async (req, res) => {
  const { category, name } = req.query;

  try {
    let filtro = {};

    if (category) {
      filtro.categories = category;
    }

    if (name) {
      filtro.name = { $regex: name, $options: "i" };
    }

    const providers = await Provider.find(filtro).populate("categories");

    res.json(providers);
  } catch (error) {
    console.error("Error al buscar proveedores:", error);
    res.status(500).json({ message: "Error al buscar proveedores" });
  }
});

// Exportación por defecto
export default app;
