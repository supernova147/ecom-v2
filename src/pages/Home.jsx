import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VEHICLES, money } from '../lib/vehicles';
import Icon from '../components/Icon';

export default function Home() {
  const [active, setActive] = useState(0);
  const vehicle = VEHICLES[active];
  return <>
    <div className="announcement"><span>A new perspective on electric.</span><Link to="/vehicles">Meet the Aurion collection <Icon name="arrow" size={14} /></Link></div>
    <section className="hero" aria-label="Explore the Aurion collection">
      <img key={vehicle.id} className="hero-image" src={vehicle.picture_path} alt={`Aurion ${vehicle.car_name} electric ${vehicle.vehicle_type.toLowerCase()} on the Pacific coast`} fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content"><p className="eyebrow"><span className="red-line" />EXCELLENCE ELECTRIFIED</p><h1>A new kind<br />of forward<span className="accent">.</span></h1><p>Considered design. Extraordinary electric.<br />Made for wherever life takes you.</p><div className="hero-buttons"><Link className="button dark" to={`/vehicles/${vehicle.id}`}>Discover the {vehicle.car_name} <Icon name="arrow" size={18} /></Link><Link className="button glass" to="/contact">Experience Aurion</Link></div></div>
      <div className="hero-bottom"><div className="hero-model"><span className="eyebrow">AURION {vehicle.car_name}</span><span>{vehicle.tagline}</span></div><div className="hero-specs"><div><strong>{vehicle.range_mi}<small> mi</small></strong><span>Est. range</span></div><div><strong>{vehicle.acceleration}<small> s</small></strong><span>0–60 mph</span></div><div><strong>100<small>%</small></strong><span>Electric</span></div></div><div className="hero-pagination" aria-label="Featured vehicle">{VEHICLES.map((car, index) => <button key={car.id} className={index === active ? 'selected' : ''} onClick={() => setActive(index)} aria-label={`Show Aurion ${car.car_name}`} aria-pressed={index === active}>{car.car_name}<span /></button>)}</div></div>
    </section>
    <section className="intro-section page-section"><p className="eyebrow">A DIFFERENT WAY TO MOVE</p><div><h2>Less ordinary.<br />More possibility.</h2><p>We believe the future should feel as good as it looks. So we build electric vehicles around the things that matter: the open road, the people beside you, and the world ahead.</p><Link to="/vehicles" className="text-link">Find your Aurion <Icon name="arrow" /></Link></div></section>
    <section className="lineup-section page-section"><div className="section-heading"><div><p className="eyebrow">FOUR EXPRESSIONS. ONE VISION.</p><h2>The Aurion collection</h2></div><Link to="/vehicles" className="text-link">Explore all vehicles <Icon name="arrow" /></Link></div>
      <div className="home-lineup">{VEHICLES.map((car, index) => <Link key={car.id} to={`/vehicles/${car.id}`} className="lineup-card"><div className="lineup-card-top"><span className="eyebrow">0{index + 1} / {car.vehicle_type === 'Sports' ? 'GRAND TOURER' : car.vehicle_type.toUpperCase()}</span><Icon name="diagonal" /></div><img src={car.picture_path} alt={`Aurion ${car.car_name}`} loading="lazy" /><div className="lineup-card-bottom"><div><h3>{car.car_name}</h3><p>{car.tagline}</p></div><span>From {money(car.price_usd)}</span></div></Link>)}</div>
    </section>
    <section className="electric-section"><div className="electric-copy"><p className="eyebrow">WELCOME TO ELECTRIC LIVING</p><h2>Your next chapter.<br />Fully charged.</h2><p>Wake up ready. Go a little further. Enjoy the quiet. Electric ownership is a simpler way to move through your day.</p><Link to="/charging" className="button light">Explore electric living <Icon name="arrow" size={18} /></Link><div className="electric-points"><span><Icon name="bolt" />Charge at home</span><span><Icon name="sun" />A quieter everyday</span></div></div><div className="electric-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="charge-symbol"><Icon name="bolt" size={72} /></div><span className="charge-label">THE FUTURE IS ALREADY HERE</span><span className="art-coordinate">36°16′ N / 121°48′ W</span></div></section>
    <section className="drive-cta page-section"><p className="eyebrow">SOME THINGS NEED TO BE FELT</p><h2>Meet your next move.</h2><p>Get to know Aurion, one drive at a time.</p><Link to="/contact" className="button dark">Plan a demo drive <Icon name="diagonal" size={18} /></Link></section>
  </>;
}
