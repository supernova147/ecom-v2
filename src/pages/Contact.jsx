import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VEHICLES } from '../lib/vehicles';
import Icon from '../components/Icon';

export default function Contact() {
  const [params] = useSearchParams();
  const [model, setModel] = useState(VEHICLES.some((car) => car.id === params.get('model')) ? params.get('model') : 'z1');
  const [confirmation, setConfirmation] = useState(null);
  const vehicle = VEHICLES.find((car) => car.id === model);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setConfirmation({ name: String(data.get('name')).trim(), date: String(data.get('date')), model: vehicle.car_name });
  }
  return <div className="contact-page"><div className="contact-visual"><img src={vehicle.picture_path} alt={`Aurion ${vehicle.car_name} beside the Pacific coast`} /><div className="contact-visual-copy"><p className="eyebrow">EXPERIENCE AURION</p><h1>The beginning<br />of something<br />electric<span>.</span></h1><p>Some things are better felt than explained.</p></div><span className="contact-coordinate">PACIFIC COAST / AURION {vehicle.car_name}</span></div><div className="contact-form-panel">
    {confirmation ? <div className="confirmation" role="status"><div className="confirmation-icon"><Icon name="check" size={28} /></div><p className="eyebrow">YOUR NEXT MOVE</p><h2>Your drive plan<br />is ready, {confirmation.name.split(' ')[0]}.</h2><p>Aurion {confirmation.model} · {new Date(`${confirmation.date}T12:00:00`).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p><div className="confirmation-note"><strong>This is a concept experience.</strong><p>No appointment has been booked and your information has not been sent anywhere. Thanks for exploring Aurion.</p></div><Link to="/vehicles" className="button dark full">Keep exploring <Icon name="arrow" /></Link><button className="text-button" onClick={() => setConfirmation(null)}>Create another drive plan</button></div> : <><p className="eyebrow">GET BEHIND THE FEELING</p><h2>Let’s get acquainted.</h2><p className="form-intro">Choose your Aurion and a day to imagine your first drive.</p><p className="demo-note"><span />Demo experience · No real appointment will be booked.</p><form onSubmit={submit}><label htmlFor="drive-model">Your vehicle</label><select id="drive-model" name="model" value={model} onChange={(e) => setModel(e.target.value)}>{VEHICLES.map((car) => <option key={car.id} value={car.id}>Aurion {car.car_name} — {car.vehicle_type}</option>)}</select><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Your full name" /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={150} placeholder="you@example.com" /><div className="form-row"><div><label htmlFor="zip">ZIP code</label><input id="zip" name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} required placeholder="12345" title="Enter a five-digit US ZIP code" /></div><div><label htmlFor="date">Preferred date</label><input id="date" name="date" type="date" min={minDate} required /></div></div><label className="consent"><input type="checkbox" required name="consent" /><span>I understand this is a demo, and no real appointment will be booked.</span></label><button className="button dark full" type="submit">Create my drive plan <Icon name="diagonal" size={18} /></button><p className="fine-print">Your form information stays in this browser session and is cleared when you leave this page. No email is sent.</p></form></>}
  </div></div>;
}
