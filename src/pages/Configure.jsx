import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { VEHICLES, FINISHES, WHEELS, money, priceBuild } from '../lib/vehicles';
import { useBuilds } from '../hooks/useBuilds';
import Icon from '../components/Icon';

function Builder({ vehicle }) {
  const [params] = useSearchParams();
  const [trim, setTrim] = useState(params.get('trim') === 'performance' ? 'performance' : 'long-range');
  const [finish, setFinish] = useState(FINISHES.find((item) => item.id === params.get('finish')) || FINISHES[0]);
  const [wheels, setWheels] = useState(WHEELS.find((item) => item.id === params.get('wheels')) || WHEELS[0]);
  const [notice, setNotice] = useState('');
  const { save } = useBuilds();
  const price = priceBuild(vehicle, trim, finish, wheels);
  const range = trim === 'performance' ? vehicle.performanceRange : vehicle.range_mi;
  const acceleration = trim === 'performance' ? vehicle.performanceAcceleration : vehicle.acceleration;
  const selection = (callback, value) => { callback(value); setNotice(''); };
  function saveBuild() {
    const id = `${vehicle.id}-${trim}-${finish.id}-${wheels.id}`;
    setNotice(save({ id, vehicleId: vehicle.id, trim, finishId: finish.id, wheelsId: wheels.id }) ? 'Your build is saved on this device.' : 'Your browser could not save this build. Please allow local storage.');
  }
  return <>
    <div className="builder-top"><Link className="text-link" to="/vehicles"><span aria-hidden="true">←</span> Back to the collection</Link><span className="eyebrow">YOUR AURION, YOUR WAY</span></div>
    <div className="builder"><div className="builder-visual"><div className="builder-headline"><p className="eyebrow">{vehicle.eyebrow}</p><h1>Aurion {vehicle.car_name}<span className="accent">.</span></h1><p>{vehicle.tagline}</p></div><img src={vehicle.picture_path} alt={`Aurion ${vehicle.car_name} concept in its studio finish`} /><div className="builder-specs"><div><strong>{range}<small> mi</small></strong><span>Est. range</span></div><div><strong>{acceleration}<small> s</small></strong><span>0–60 mph</span></div><div><strong>{vehicle.seats}</strong><span>Seats</span></div></div><p className="visual-caption">Studio concept shown. Finish and wheel choices are reflected in your build summary.</p><div className="builder-story"><h2>Beautifully electric.<br />Unmistakably yours.</h2><p>{vehicle.description}</p><ul><li><Icon name="check" size={16} />Panoramic glass roof</li><li><Icon name="check" size={16} />Thoughtfully connected cabin</li><li><Icon name="check" size={16} />All-electric powertrain</li></ul></div></div>
      <aside className="builder-panel" aria-label="Configure your Aurion"><div className="panel-heading"><p className="eyebrow">MAKE IT YOURS</p><h2>Build your {vehicle.car_name}</h2></div><fieldset><legend><span>01</span> Choose your drive</legend>{[{id:'long-range',name:'Long Range',description:'More miles. More possibilities.',price:vehicle.price_usd},{id:'performance',name:'Performance',description:'A little more exhilaration.',price:vehicle.price_usd+vehicle.performancePrice}].map((option) => <label key={option.id} className={`option-card ${trim === option.id ? 'selected' : ''}`}><input type="radio" name="trim" value={option.id} checked={trim === option.id} onChange={() => selection(setTrim, option.id)} /><div><strong>{option.name}</strong><small>{option.description}</small></div><span>{money(option.price)}</span></label>)}</fieldset>
        <fieldset><legend><span>02</span> Exterior finish</legend><div className="finish-heading"><span>{finish.name}</span><span>{finish.price ? `+ ${money(finish.price)}` : 'Included'}</span></div><div className="finish-options">{FINISHES.map((color) => <label key={color.id} title={color.name} className={`finish-swatch ${finish.id === color.id ? 'selected' : ''}`} style={{'--swatch':color.hex}}><input type="radio" name="finish" aria-label={color.name} checked={finish.id === color.id} onChange={() => selection(setFinish, color)} /><span aria-hidden="true">{finish.id === color.id && <Icon name="check" size={16} />}</span></label>)}</div></fieldset>
        <fieldset><legend><span>03</span> Wheels</legend><div className="wheel-options">{WHEELS.map((option) => <label key={option.id} className={`wheel-option ${wheels.id === option.id ? 'selected' : ''}`}><input type="radio" name="wheels" checked={wheels.id === option.id} onChange={() => selection(setWheels, option)} /><span className={`wheel-illustration ${option.id}`} aria-hidden="true" /><strong>{option.name}</strong><small>{option.price ? `+ ${money(option.price)}` : 'Included'}</small></label>)}</div></fieldset>
        <div className="build-summary"><span>Your {vehicle.car_name}</span><strong>{money(price)}</strong><p>{trim === 'performance' ? 'Performance' : 'Long Range'} · {finish.name} · {wheels.name}</p></div><button className="button dark full" onClick={saveBuild}>Save this build <Icon name="heart" size={18} /></button><p className="save-notice" role="status">{notice}{notice.startsWith('Your build is saved') && <> <Link to="/saved">View saved builds →</Link></>}</p><Link className="button outline full" to={`/contact?model=${vehicle.id}`}>Experience the {vehicle.car_name} <Icon name="diagonal" size={17} /></Link><p className="fine-print">An illustrative build, saved locally. No purchase, payment, or reservation is made. Taxes, fees and delivery excluded.</p>
      </aside>
    </div>
  </>;
}
export default function Configure() {
  const { id } = useParams();
  const vehicle = VEHICLES.find((car) => car.id === id);
  if (!vehicle) return <div className="empty-state page-section"><h1>Let’s find your Aurion.</h1><Link className="button dark" to="/vehicles">Explore the collection</Link></div>;
  return <Builder key={vehicle.id} vehicle={vehicle} />;
}
