import vehicles from '../data/vehicles.json';

export const VEHICLES = vehicles;
export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export const FINISHES = [
  { id: 'pearl', name: 'Pearl White', hex: '#eae8e2', price: 0 },
  { id: 'graphite', name: 'Graphite', hex: '#424743', price: 1200 },
  { id: 'oxide', name: 'Oxide Red', hex: '#87382f', price: 1800 },
  { id: 'sage', name: 'Coastal Sage', hex: '#929b8e', price: 1800 },
];
export const WHEELS = [ { id: 'aero', name: '19″ Aero', price: 0 }, { id: 'sport', name: '21″ Sport', price: 2000 } ];
export function priceBuild(vehicle, trim, finish, wheels) {
  return vehicle.price_usd + (trim === 'performance' ? vehicle.performancePrice : 0) + finish.price + wheels.price;
}
