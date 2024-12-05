import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import logic from '../logic'; // Suponiendo que tienes lógica en este archivo

export default function Explorer() {
    const [date, setDate] = useState('');
    const [categories] = useState(['Centros veterinarios', 'Grooming', 'Entrenamiento', 'Cuidadores']);
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log('Explorer -> useEffect "componentDidMount"');

        const fetchResults = async () => {
            try {
                const fetchedResults = await logic.getResults(); // Simula tu lógica para obtener resultados
                setResults(fetchedResults);
            } catch (error) {
                console.error(error);
                alert('Error al obtener los resultados');
            }
        };

        fetchResults();
    }, []);

    console.log('Explorer -> render');

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
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="category-item bg-white text-black p-4 rounded-lg shadow min-w-[120px] flex-shrink-0"
                        >
                            <p className="text-center font-bold">{category}</p>
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
                                key={result.id}
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
