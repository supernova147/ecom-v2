import { useEffect, useState } from 'react';

const API_ROOT = (import.meta.env.VITE_API_BASE ?? 'http://localhost:3000').replace(/\/+$/, '');
const VEHICLE_TYPES = ['all', 'Sedan', 'Sports', 'SUV', 'Truck'];

export default function Vehicles() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState('all');
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
        type: 'all',
        min: '',
        max: '',
  });

  useEffect(() => {
    fetch(`${API_ROOT}/api/vehicles`)
      .then((r) => r.json())
        .then((data) => setCars(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

const filteredCars = (() => {
    const min = appliedFilters.min === '' ? null : Number(appliedFilters.min);
    const max = appliedFilters.max === '' ? null : Number(appliedFilters.max);

    return cars.filter((car) => {
    const matchesType =
        appliedFilters.type === 'all' ||
        (car.vehicle_type &&
        car.vehicle_type.toLowerCase() === appliedFilters.type.toLowerCase());

        const price = Number(car.price_usd);
        const matchesMin = min === null || (!Number.isNaN(min) && price >= min);
        const matchesMax = max === null || (!Number.isNaN(max) && price <= max);

        return matchesType && matchesMin && matchesMax;
    });
})();

const onApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters({
        type: typeFilter,
        min: minPriceInput.trim(),
        max: maxPriceInput.trim(),
    });
};

const onResetFilters = () => {
    setTypeFilter('all');
    setMinPriceInput('');
    setMaxPriceInput('');
    setAppliedFilters({
        type: 'all',
        min: '',
        max: '',
    });
};

if (loading) return <p style={{ padding: '1rem' }}>Loading…</p>;

return (
    <section className="vehicles-page">
    <form className="vehicle-filters" onSubmit={onApplyFilters}>
        <div className="filter-group">
            <label htmlFor="vehicle-type">Vehicle type</label>
            <select
            id="vehicle-type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
        >
            {VEHICLE_TYPES.map((type) => (
                <option key={type} value={type}>
                {type === 'all' ? 'All vehicles' : type}
            </option>
            ))}
        </select>
        </div>

        <div className="filter-group">
        <label htmlFor="min-price">Min price (USD)</label>
        <input
            id="min-price"
            type="number"
            min="0"
            inputMode="numeric"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            placeholder="e.g. 15000"
        />
        </div>

        <div className="filter-group">
        <label htmlFor="max-price">Max price (USD)</label>
        <input
            id="max-price"
            type="number"
            min="0"
            inputMode="numeric"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            placeholder="e.g. 40000"
        />
        </div>

        <div className="filter-actions">
        <button type="submit">Apply filters</button>
        <button type="button" onClick={onResetFilters} className="ghost">
            Reset
        </button>
        </div>
    </form>

    <p className="vehicle-results-count">
        Showing {filteredCars.length} of {cars.length} vehicles
    </p>

    <div id="json_container" className="car_products">
        {filteredCars.length === 0 ? (
        <p style={{ gridColumn: '1 / -1', padding: '1rem' }}>
            No vehicles match the selected filters.
        </p>
        ) : (
        filteredCars.map((car) => (
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
                <small className="vehicle-type-pill">{car.vehicle_type}</small>
            </article>
            ))
        )}
    </div>
    </section>
);
}
