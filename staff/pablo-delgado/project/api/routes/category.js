import { Router } from 'express';
import { Category } from '../models/index.js'; // Asegúrate de que la ruta sea correcta

const router = Router();

// Endpoint para obtener categorías
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); // Obtiene todas las categorías
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

export default router;
