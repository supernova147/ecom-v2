import { Link } from 'react-router-dom';
import { useBuilds } from '../hooks/useBuilds';
import { VEHICLES, FINISHES, WHEELS, money, priceBuild } from '../lib/vehicles';
import Icon from '../components/Icon';
export default function Saved() {
  const { builds, remove } = useBuilds();
  return <div className="saved-page page-section"><div className="page-heading"><p className="eyebrow">YOUR NEXT CHAPTER</p><h1>A little closer to yours<span className="accent">.</span></h1><p>Your saved Aurion builds, ready when you are.<br />Stored on this device, just for you.</p></div>
    {!builds.length ? <div className="empty-state"><Icon name="heart" size={44} /><h2>Your possibilities start here.</h2><p>Explore the collection and save a build that feels like you.</p><Link to="/vehicles" className="button dark">Find your Aurion <Icon /></Link></div> : <div className="vehicle-grid">{builds.map((build) => {
      const car = VEHICLES.find((item) => item.id === build.vehicleId);
      const finish = FINISHES.find((item) => item.id === build.finishId);
      const wheels = WHEELS.find((item) => item.id === build.wheelsId);
      if (!car || !finish || !wheels) return null;
      return <article className="vehicle-card" key={build.id}><img className="saved-image" src={car.picture_path} alt={`Aurion ${car.car_name}`} /><div className="vehicle-body"><div className="vehicle-title"><h2>{car.car_name}</h2><button className="icon-button" aria-label={`Remove ${car.car_name} build`} onClick={() => remove(build.id)}><Icon name="close" size={18} /></button></div><p>{build.trim === 'performance' ? 'Performance' : 'Long Range'} · {finish.name} · {wheels.name}</p><h3>{money(priceBuild(car, build.trim, finish, wheels))}</h3><Link className="button outline full" to={`/vehicles/${car.id}?trim=${build.trim}&finish=${finish.id}&wheels=${wheels.id}`}>Continue your build <Icon size={16} /></Link></div></article>;
    })}</div>}
  </div>;
}
