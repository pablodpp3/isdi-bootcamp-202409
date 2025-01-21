import express from 'express';
import { usersRouter, categoryRouter, getResults } from './routes/index.js'; // Asegúrate de importar el archivo correcto


export {
    usersRouter,
    categoryRouter,
    getResults
    //Explorer
}

const app = express();

// Middleware
app.use(express.json());

// Montar las rutas de usuarios, categorías y proveedores
app.use('/users', usersRouter);         // Rutas relacionadas con usuarios
app.use('/category', categoryRouter);   // Rutas relacionadas con categorías
app.use('/providers', getResults);      // Rutas relacionadas con proveedores

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
