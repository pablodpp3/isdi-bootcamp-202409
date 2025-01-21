export default function ProviderCard({ provider }) {
    return (
        <div className="flex flex-col items-center">
            <img src={provider.image} alt={provider.name} className="w-32 h-32 object-cover rounded-full" />
            <h3 className="text-lg font-bold mt-2">{provider.name}</h3>
            <p>{provider.category}</p>
        </div>
    );
}
