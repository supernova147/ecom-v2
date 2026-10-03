import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Configure from './pages/Configure';
import Charging from './pages/Charging';
import Contact from './pages/Contact';
import Saved from './pages/Saved';
function NavigationEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = { '/': 'Aurion — Excellence Electrified', '/vehicles': 'The Lineup — Aurion', '/charging': 'Electric Living — Aurion', '/contact': 'Experience Aurion', '/saved': 'Your Saved Builds — Aurion' };
    document.title = titles[pathname] || 'Build Your Aurion';
  }, [pathname]);
  return null;
}
export default function App() {
  return <><a href="#main-content" className="skip-link">Skip to content</a><NavigationEffects /><NavBar />
    <main id="main-content"><Routes>
      <Route path="/" element={<Home />} /><Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicles/:id" element={<Configure />} /><Route path="/charging" element={<Charging />} />
      <Route path="/contact" element={<Contact />} /><Route path="/saved" element={<Saved />} />
      <Route path="*" element={<div className="empty-state page-section"><p className="eyebrow">A DIFFERENT DIRECTION</p><h1>This road ends here.</h1><Link to="/" className="button dark">Back to Aurion</Link></div>} />
    </Routes></main><Footer /></>;
}
