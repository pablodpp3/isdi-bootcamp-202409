import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logic from '../logic';
import Footer from './components/Footer';

export default function Explorer() {
    const [services, setServices] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [searchResults, setSearchResults] = useState([]); // Estado para resultados búsqueda
    const [query, setQuery] = useState(''); // Estado para el query
    const [distance, setDistance] = useState(0); // Estado para la distancia

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Explorer -> useEffect "componentDidMount"');
        try {
            const fetchData = async () => {
                const fetchedServices = await logic.getServices();
                const fetchedRecommendations = await logic.getRecommendations();
                setServices(fetchedServices);
                setRecommendations(fetchedRecommendations);
            };
            fetchData();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }, []);

    // Función para manejar la búsqueda
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const fetchedSearchResults = await logic.searchServices(query, distance); // Asumimos que tienes una función de búsqueda en 'logic'
            setSearchResults(fetchedSearchResults); // Establecemos los resultados en el estado
        } catch (error) {
            alert('Error al realizar la búsqueda');
            console.error(error);
        }
    };

    return (
        <div className="explorer-container py-12 bg-teal-900 text-white">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">PetCare 🐾</h1>
                <p className="text-lg mt-2">¿Qué necesitas para tu mascota?</p>
                <form onSubmit={handleSearch} className="mt-4">
                    <input
                        type="text"
                        name="query"
                        value={query} // Vinculamos el valor al estado 'query'
                        onChange={(e) => setQuery(e.target.value)} // Actualizamos el estado con el input del usuario
                        placeholder="Busca servicios o negocios"
                        className="p-2 w-3/4 mx-auto block rounded text-black"
                    />
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <input
                            type="number"
                            name="distance"
                            value={distance} // Vinculamos el valor al estado 'distance'
                            onChange={(e) => setDistance(e.target.value)} // Actualizamos el estado con el input de distancia
                            placeholder="kms"
                            className="p-2 w-20 rounded text-black"
                        />
                        <button
                            type="submit"
                            className="bg-white text-black px-3 py-2 rounded text-sm"
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </header>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
                <section className="search-results mt-6">
                    <h2 className="text-xl font-bold">Resultados</h2>
                    <div className="flex justify-around mt-4">
                        {searchResults.map((result) => (
                            <div
                                key={result.id}
                                className="service-item bg-white text-black p-4 rounded-lg shadow w-40"
                            >
                                <p className="text-center font-bold">{result.name}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="categories text-center my-6">
                <div className="flex justify-around items-center">
                    {['Centros veterinarios', 'Grooming', 'Cuidados especializados'].map((category, index) => (
                        <div key={index} className="category-item">
                            <div className="rounded-full bg-white w-16 h-16 mx-auto mb-2"></div>
                            <p>{category}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Servicios destacados */}
            <section className="featured-services my-6">
                <h2 className="text-xl font-bold">Servicios destacados</h2>
                <div className="flex justify-around mt-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-item bg-white text-black p-4 rounded-lg shadow w-40"
                        >
                            <p className="text-center font-bold">{service.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
