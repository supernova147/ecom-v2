import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBuilds } from '../hooks/useBuilds';
import Icon from './Icon';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { builds } = useBuilds();
  return <header className="site-header">
    <Link to="/" className="wordmark" aria-label="Aurion home" onClick={() => setOpen(false)}>AURION<span className="wordmark-dot" /></Link>
    <nav id="mobile-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      <NavLink to="/vehicles" onClick={() => setOpen(false)}>Vehicles</NavLink>
      <NavLink to="/charging" onClick={() => setOpen(false)}>Electric living</NavLink>
      <NavLink to="/contact" onClick={() => setOpen(false)}>Experience Aurion</NavLink>
      <Link className="mobile-saved" to="/saved" onClick={() => setOpen(false)}>Saved builds ({builds.length})</Link>
    </nav>
    <div className="header-actions">
      <Link to="/saved" className="saved-link" aria-label={`Saved builds, ${builds.length}`}><Icon name="heart" size={18} /><span>{builds.length > 0 ? builds.length : 'Saved'}</span></Link>
      <Link to="/contact" className="header-drive">Book a demo drive <Icon name="diagonal" size={15} /></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation"><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </header>;
}
