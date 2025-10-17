import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000';

export default function Vehicles() {

const [cars, setCars] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch(`${API}/vehicles`)
        .then(r => r.json())
        .then(data => setCars(data))
        .catch(console.error)
        .finally(() => setLoading(false));
}, []);

    if (loading) return <p style={{padding: '1rem'}}>Loading…</p>;

return (
    <div id="json_container" className="car_products">
        {cars.map(car => (
        <article key={car.id} className="car_card">
            <img
            src={car.picture_path} 
            alt={car.car_name}
            width={320}
            height={200}
            loading="lazy"
            />
            <h3>{car.car_name}</h3>
            <p>${Number(car.price_usd).toLocaleString()}</p>
            <small>{car.range_mi} mi (est.)</small>
        </article>
        ))}
    </div>
    );
}
