import VehicleSlider from '../components/VehicleSlider.jsx';

export default function Home() {
  return (
    <>
      <div className="heroimg-container">
        <div>
          <h3 className="heroimg-h">Excellence Electrified</h3>
          <p className="heroimg-p">Experience Aurion</p>
        </div>
      </div>

      <VehicleSlider />

      <div className="home-text-container">
        <p className="home-text">
          We build Aurion from the ground up. Performance. Elegance. Aurion. From
          sedans to SUVs and trucks, each model is crafted to define excellence.
          Explore the lineup today.
        </p>
      </div>

      <div className="current-offers">
        <h4 className="offers-heading">Current Offers</h4>
        <p className="offers-text">Limited inventory. Take delivery now.</p>
        <a className="offers-button" href="/vehicles">
          Check Our Vehicles
        </a>
      </div>
    </>
  );
}
