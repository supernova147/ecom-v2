import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VEHICLES } from '../lib/vehicles';
import Icon from '../components/Icon';

export default function Charging() {
  const [model, setModel] = useState('z1');
  const [distance, setDistance] = useState(40);
  const [charger, setCharger] = useState('home');
  const vehicle = VEHICLES.find((car) => car.id === model);
  const battery = 90;
  const energy = distance / vehicle.range_mi * battery;
  const hours = energy / (charger === 'home' ? 11 : 1.4) / 0.9;
  const formatTime = hours < 1 ? `${Math.ceil(hours * 60)} min` : `${hours.toFixed(1)} hr`;
  const faqs = [
    ['Can I charge at home?', 'Yes. A dedicated Level 2 home charger can replenish your everyday driving while you sleep. Installation needs a qualified electrician and a suitable electrical supply. A standard outlet is slower and may suit lighter daily use.'],
    ['What affects my range?', 'Driving speed, temperature, hills, climate control, tires, and battery condition all affect range. The figures in this concept are illustrative estimates, so leave a comfortable margin when planning a trip.'],
    ['How do I plan a longer trip?', 'Plan charging stops along your route and check station compatibility, availability, and live status with your charging provider. This concept does not include a live charger network or real station availability.'],
    ['Is Aurion a real vehicle manufacturer?', 'Aurion is an independent design and development concept. The vehicles, specifications, pricing, imagery, and ownership tools demonstrate a possible electric vehicle brand experience.'],
  ];
  return <>
    <section className="charging-hero page-section"><p className="eyebrow">ELECTRIC LIVING, SIMPLIFIED</p><h1>A full charge.<br />A fresh perspective<span className="accent">.</span></h1><p>Less time thinking about your car.<br />More time enjoying where it takes you.</p><div className="charging-hero-icon" aria-hidden="true"><Icon name="bolt" size={130} /></div></section>
    <section className="ownership-grid page-section">{[
      ['01', 'Wake up ready.', 'Plug in at home. Start each morning with the freedom to take the long way.', 'bolt'],
      ['02', 'Enjoy the quiet.', 'Smooth, immediate power. A quieter cabin. A calmer kind of everyday.', 'sun'],
      ['03', 'Keep exploring.', 'Plan your stops, take a break, and make the journey part of the destination.', 'globe'],
    ].map(([number, title, text, icon]) => <article key={number}><div className="ownership-number"><span>{number}</span><Icon name={icon} size={28} /></div><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className="planner page-section"><div className="planner-copy"><p className="eyebrow">MAKE ROOM FOR ELECTRIC</p><h2>What does your<br />everyday look like?</h2><p>Get a feel for the charging time needed to replenish your daily drive.</p><label htmlFor="planner-model">Your Aurion</label><select id="planner-model" value={model} onChange={(e) => setModel(e.target.value)}>{VEHICLES.map((car) => <option value={car.id} key={car.id}>Aurion {car.car_name} · {car.vehicle_type}</option>)}</select><label htmlFor="daily-distance" className="range-label">Your daily drive <strong>{distance} miles</strong></label><input id="daily-distance" type="range" min="10" max="200" step="5" value={distance} onChange={(e) => setDistance(Number(e.target.value))} /><div className="range-extents"><span>10 miles</span><span>200 miles</span></div><div className="charger-toggle" role="group" aria-label="Charger type"><button className={charger === 'home' ? 'active' : ''} aria-pressed={charger === 'home'} onClick={() => setCharger('home')}>Home charger · 11 kW</button><button className={charger === 'outlet' ? 'active' : ''} aria-pressed={charger === 'outlet'} onClick={() => setCharger('outlet')}>Standard outlet · 1.4 kW</button></div></div><div className="planner-result" aria-live="polite"><Icon name="bolt" size={36} /><span className="eyebrow">REPLENISH YOUR DAILY DRIVE</span><strong className="charge-time">{formatTime}</strong><p>of estimated charging for {distance} miles</p><div className="battery-meter"><span style={{width:`${distance / vehicle.range_mi * 100}%`}} /></div><div className="planner-result-details"><span>{Math.round(distance / vehicle.range_mi * 100)}% of estimated range</span><span>{energy.toFixed(1)} kWh</span></div><p className="fine-print">Illustrative calculation assumes a 90 kWh usable battery, {vehicle.range_mi} mi range and 90% charging efficiency. Real charging varies by vehicle, supply and conditions. This is daily replenishment time, not a full charge.</p></div></section>
    <section className="faq-section page-section"><p className="eyebrow">A FEW GOOD QUESTIONS</p><h2>Good to know.</h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" size={20} /></summary><p>{answer}</p></details>)}</div></section>
    <section className="drive-cta page-section"><p className="eyebrow">THE BEST WAY TO UNDERSTAND IT</p><h2>Feel the difference.</h2><Link className="button dark" to="/contact">Experience Aurion <Icon name="diagonal" size={18} /></Link></section>
  </>;
}
