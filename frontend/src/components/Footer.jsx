import { Mail, Phone } from 'lucide-react';
import { company, imageCredits } from '../data/siteData.js';
function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><h2>GL Healthcare</h2><p>Dental material products for clinics that need reliable supply, clear pricing, and fast support.</p></div><div><h3>Contact</h3><p><Mail size={16} /> {company.email}</p><p><Phone size={16} /> {company.phone}</p></div><div><h3>Image Sources</h3>{imageCredits.map((credit) => <a key={credit.url} href={credit.url} target="_blank" rel="noreferrer">{credit.label}</a>)}</div></div></footer>;
}
export default Footer;
