import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Container from '../view/library/Container';
import Form from '../view/library/Form';
import Button from '../view/library/Button';
import ExplorerIcon from './icons/ExplorerIcon';
import ResultsProvidersList from './ResultsProvidersList';

export default function SearchProviders() {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [searchParams] = useSearchParams(); // Parámetros de la URL
    const [query, setQuery] = useState('');

    // Obtener valor de "q"
    useEffect(() => {
        const q = searchParams.get('q'); // Obtén el valor de "q" desde los parámetros de la URL
        if (q) setQuery(q); // Si existe, actualiza el estado del input
    }, [searchParams]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const queryValue = searchInputRef.current.value.trim();

        // Si no hay búsqueda, navegar a /explorer
        if (!queryValue) {
            navigate('/explorer');
        } else {
            // Actualiza la URL con el parámetro "q"
            navigate(`/explorer?q=${queryValue}`);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Actualiza el estado del input
    };

    return (
        <Container>
            <Form onSubmit={handleSearchSubmit}>
                <Container className="flex flex-row items-center">
                    <input
                        ref={searchInputRef}
                        className="border border-gray-300 p-2 rounded w-full"
                        type="text"
                        name="q"
                        placeholder="Search by center, service, or category"
                        value={query}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                        <ExplorerIcon />
                    </Button>
                </Container>
                <ResultsProvidersList />
            </Form>
        </Container>
    );
}
