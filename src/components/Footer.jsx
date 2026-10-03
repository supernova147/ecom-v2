import { Link } from 'react-router-dom';
import Icon from './Icon';
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><Link to="/" className="wordmark">AURION<span className="wordmark-dot" /></Link><p>Excellence. Electrified.</p></div>
      <div className="footer-links"><Link to="/vehicles">Explore the lineup</Link><Link to="/charging">Electric living</Link><Link to="/contact">Get in touch <Icon name="diagonal" size={14} /></Link><a href="https://github.com/supernova147/ecom-v2" target="_blank" rel="noreferrer">Behind the project <Icon name="diagonal" size={14} /></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Aurion Electric</span><span>Independent concept project · Vehicles, prices & specifications are illustrative.</span><span>Designed to move you.</span></div>
  </footer>;
}
