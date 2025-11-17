import { useEffect, useState } from 'react';

const API_ROOT = (import.meta.env.VITE_API_BASE ?? 'http://localhost:3000').replace(/\/+$/, '');
// Names of the models we want to feature, in order
const FEATURED_ORDER = ['Z-1', 'X-1', 'C-1', 'V-1'];

export default function VehicleSlider() {
  // Slider state: loaded vehicles, which slide is active, and loading flag
  const [vehicles, setVehicles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetching vehicles
  useEffect(() => {
    fetch(`${API_ROOT}/api/vehicles`)
      .then((r) => r.json())
      .then(setVehicles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Pick featured vehicles based on their car_name
  const featuredVehicles = FEATURED_ORDER
    .map((name) => vehicles.find((car) => car.car_name === name))
    .filter(Boolean);

  // Go to the previous vehicle
  const goToPreviousVehicle = () => {
    setActiveIndex((prev) => {
      if (prev === 0) { 
        return featuredVehicles.length - 1; // if on the first vehicle, go back to the last vehicle
      }
      return prev - 1;
    });
  };

  // Selecting Next vehicle
  const goToNextVehicle = () => {
    setActiveIndex((prev) => {
      if (prev === featuredVehicles.length - 1) {
        return 0; // If on last vehicle, go back to the first index
      }
      return prev + 1;
    });
  };

  if (loading) {
    return (
      <section className="vehicle-slider">
        <p>Loading featured vehicles…</p>
      </section>
    );
  }

  if (featuredVehicles.length === 0) {
    return null;
  }

  const activeVehicle = featuredVehicles[activeIndex] ?? featuredVehicles[0];

  return (
    <section className="vehicle-slider">
      <button
        type="button"
        className="slider-nav prev"
        onClick={goToPreviousVehicle}
        aria-label="Previous vehicle"
      >
        ‹
      </button>

      <div className="slider-content">
        <img
          src={activeVehicle.picture_path}
          alt={activeVehicle.car_name}
          loading="lazy"
        />
        <div className="slider-details">
          <p className="slider-eyebrow">Featured build</p>
          <h3>{activeVehicle.car_name}</h3>
          <p className="slider-price">
            ${Number(activeVehicle.price_usd).toLocaleString()}
          </p>
          <p className="slider-meta">
            {activeVehicle.vehicle_type} • {activeVehicle.range_mi} mi est. range
          </p>
        </div>
      </div>

      <button
        type="button"
        className="slider-nav next"
        onClick={goToNextVehicle}
        aria-label="Next vehicle"
      >
        ›
      </button>

      <div className="slider-dots">
        {featuredVehicles.map((vehicle, idx) => (
          <button
            key={vehicle.id}
            type="button"
            className={idx === activeIndex ? 'active' : ''}
            aria-label={`Show ${vehicle.car_name}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
}
