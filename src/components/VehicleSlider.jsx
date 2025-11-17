import { useEffect, useMemo, useState } from 'react';

const API_ROOT = (import.meta.env.VITE_API_BASE ?? 'http://localhost:3000').replace(/\/+$/, '');
const FEATURED_ORDER = ['Z-1', 'X-1', 'C-1', 'V-1'];

export default function VehicleSlider({ autoSlideMs = 5000 }) {
  const [vehicles, setVehicles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch(`${API_ROOT}/api/vehicles`)
      .then((r) => r.json())
      .then((data) => setVehicles(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featuredVehicles = useMemo(() => {
    if (!vehicles.length) return [];
    return FEATURED_ORDER.map((name) =>
      vehicles.find((car) => car.car_name === name)
    ).filter(Boolean);
  }, [vehicles]);

  useEffect(() => {
    if (!autoSlideMs || featuredVehicles.length <= 1 || isPaused) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 >= featuredVehicles.length ? 0 : prev + 1
      );
    }, autoSlideMs);
    return () => clearInterval(id);
  }, [autoSlideMs, featuredVehicles.length, isPaused]);

  const showPrev = () => {
    setActiveIndex((prev) =>
      prev - 1 < 0 ? featuredVehicles.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (activeIndex >= featuredVehicles.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, featuredVehicles.length]);

  const showNext = () => {
    setActiveIndex((prev) =>
      prev + 1 >= featuredVehicles.length ? 0 : prev + 1
    );
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

  const activeVehicle =
    featuredVehicles[activeIndex] ?? featuredVehicles[0];

  return (
    <section
      className="vehicle-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        type="button"
        className="slider-nav prev"
        onClick={showPrev}
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
        onClick={showNext}
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
