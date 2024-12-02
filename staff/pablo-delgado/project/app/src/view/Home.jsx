import { useState, useEffect } from 'react'

import logic from '../logic'

export default function Home() {
    const [services, setServices] = useState([])
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        // Simulación de llamada a lógica para obtener servicios y recomendaciones
        try {
            const fetchData = async () => {
                const fetchedServices = await logic.getServices() // Simula tu lógica de servicios
                const fetchedRecommendations = await logic.getRecommendations() // Simula tus recomendaciones
                setServices(fetchedServices)
                setRecommendations(fetchedRecommendations)
            }

            fetchData()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    console.log('Home -> render')

    return (
        <div className="home-container py-12 bg-teal-900 text-white">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">PetCare 🐾</h1>
                <p className="text-lg mt-2">¿Qué necesitas para tu mascota?</p>
                <input
                    type="text"
                    placeholder="Busca servicios o negocios"
                    className="mt-4 p-2 w-3/4 mx-auto block rounded"
                />
            </header>

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

            <section className="featured-services my-6">
                <h2 className="text-xl font-bold">Servicios destacados</h2>
                <div className="flex justify-around mt-4">
                    {services.map(service => (
                        <div
                            key={service.id}
                            className="service-item bg-white text-black p-4 rounded-lg shadow w-40"
                        >
                            <p className="text-center font-bold">{service.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="upcoming-appointments my-6">
                <h2 className="text-xl font-bold">Próximas citas</h2>
                <p className="mt-2 text-green-400">Ninguna cita programada</p>
            </section>

            <section className="recommendations my-6">
                <h2 className="text-xl font-bold">Recomendado</h2>
                <div className="flex justify-around mt-4">
                    {recommendations.map(recommendation => (
                        <div
                            key={recommendation.id}
                            className="recommendation-item bg-white text-black p-4 rounded-lg shadow w-40"
                        >
                            <p className="text-center font-bold">{recommendation.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="center-info my-6 text-center">
                <p className="text-lg font-bold">Si tienes un centro, eres entrenador canino o cuidador</p>
                <p className="text-green-400 mt-2">Esto te interesa</p>
                <div className="info-box bg-teal-800 p-4 rounded-lg mt-4">
                    <p>Gestiona horarios, citas, y añade fotos atractivas de tu centro.</p>
                </div>
            </section>

            <footer className="text-center mt-6">
                <p>2024 © PetCare S.L.</p>
                <div className="mt-2">
                    <a href="#" className="mx-2">Registra tu centro</a>
                    <a href="#" className="mx-2">Contacto</a>
                </div>
            </footer>

            <nav className="fixed bottom-0 w-full bg-teal-800 text-white flex justify-around p-4">
                <button>Home</button>
                <button>Explora</button>
                <button>Citas</button>
                <button>Perfil</button>
            </nav>
        </div>
    )
}