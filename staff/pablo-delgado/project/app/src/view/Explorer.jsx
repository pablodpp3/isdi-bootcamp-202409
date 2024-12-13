import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchServices from '../logic/searchBar'

export default function Explorer() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Manejo de parámetros desde la URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        const distance = searchParams.get('distance') || 0;

        // Lógica para buscar resultados
        const fetchResults = async () => {
            setLoading(true);
            try {
                const fetchedResults = await searchServices({ query, distance });
                setResults(fetchedResults);
            } catch (error) {
                console.error('Error al buscar servicios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [location]);

    // Función para manejar la búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.query.value.trim();
        const distance = form.distance.value.trim();

        // Actualizar la URL con los parámetros de búsqueda
        const params = new URLSearchParams({ q: query, distance });
        navigate(`/explorer?${params.toString()}`);
    };

    return (
        <div className="explorer-container py-12 bg-teal-900 text-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Explorar Servicios</h1>

            {/* Barra de búsqueda */}
            <form className="mb-6 flex justify-center gap-4" onSubmit={handleSearch}>
                <input
                    type="text"
                    name="query"
                    placeholder="Buscar servicios"
                    className="p-2 rounded border w-1/3"
                />
                <input
                    type="number"
                    name="distance"
                    placeholder="Distancia (km)"
                    className="p-2 rounded border w-1/6"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Buscar
                </button>
            </form>
            //modificar hasta aquí
            {/* Resultados */}
            {loading ? (
                <p className="text-center text-gray-400">Cargando resultados...</p>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map(result => (
                        <div
                            key={result.id}
                            className="result-item bg-white text-black p-4 rounded-lg shadow"
                        >
                            <h2 className="text-lg font-bold">{result.name}</h2>
                            <p>{result.description}</p>
                            <p className="text-sm text-gray-600">Distancia: {result.distance} km</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">No se encontraron resultados.</p>
            )}
        </div>
    );
}
