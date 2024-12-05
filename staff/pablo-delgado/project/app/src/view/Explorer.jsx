import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import { getCategories, getProvidersByCategory } from '../logic/explorer'

export default function Explorer() {
    const [date, setDate] = useState('');
    const [categories, setCategories] = useState([]); // Inicializamos vacío porque las categorías vienen de la API
    const [selectedCategory, setSelectedCategory] = useState(null); // Corregido el uso de setState a useState
    const [results, setResults] = useState([]);

    // Efecto para cargar las categorías al montar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories(); // Obtenemos las categorías de la API
                setCategories(fetchedCategories); // Actualizamos el estado con las categorías obtenidas
            } catch (error) {
                console.error(error);
                alert('Error al obtener las categorías');
            }
        };

        fetchCategories();
    }, []); // Este efecto se ejecuta una vez al montar el componente

    // Efecto para cargar los resultados cuando se selecciona una categoría
    useEffect(() => {
        if (!selectedCategory) return; // Si no hay categoría seleccionada, no hacemos nada

        const fetchProviders = async () => {
            try {
                const fetchedResults = await getProvidersByCategory(selectedCategory); // Llamamos a la API con la categoría seleccionada
                setResults(fetchedResults); // Guardamos los resultados en el estado
            } catch (error) {
                console.error(error);
                alert('Error al obtener los resultados para esta categoría');
            }
        };

        fetchProviders();
    }, [selectedCategory]); // Este efecto se ejecuta cuando cambia la categoría seleccionada

    return (
        <div className="explorer-container py-12 bg-teal-900 text-white">
            {/* Barra de búsqueda */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">Explorar Servicios</h1>
                <input
                    type="text"
                    placeholder="Busca servicios o negocios"
                    className="mt-4 p-2 w-3/4 mx-auto block rounded text-black"
                />
            </header>

            {/* Selector de fecha */}
            <section className="date-picker text-center mb-6">
                <h2 className="text-lg font-bold">¿Cuándo?</h2>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 p-2 rounded bg-white text-black"
                />
            </section>

            {/* Carrusel de categorías */}
            <section className="categories text-center mb-6">
                <h2 className="text-lg font-bold mb-4">Categorías sugeridas</h2>
                <div className="flex overflow-x-scroll no-scrollbar space-x-4 px-4">
                    {categories.map((category) => (
                        <div
                            key={category.id} // Usamos un id único que venga de la API
                            className={`category-item bg-white text-black p-4 rounded-lg shadow min-w-[120px] flex-shrink-0 ${
                                selectedCategory === category.id ? 'bg-blue-500 text-white' : ''
                            }`}
                            onClick={() => setSelectedCategory(category.id)} // Actualizamos la categoría seleccionada
                        >
                            <p className="text-center font-bold">{category.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resultados */}
            <section className="results my-6">
                <h2 className="text-xl font-bold text-center mb-4">Resultados</h2>
                <div className="results-list max-h-[400px] overflow-y-scroll px-4 space-y-4">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <div
                                key={result.id} // Usamos un id único que venga de la API
                                className="result-item bg-white text-black p-4 rounded-lg shadow"
                            >
                                <p className="font-bold">{result.name}</p>
                                <p className="text-sm">{result.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">No se encontraron resultados</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
