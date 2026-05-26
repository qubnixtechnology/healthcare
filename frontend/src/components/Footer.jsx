import { Mail, Phone } from 'lucide-react';
import { company, imageCredits } from '../data/siteData.js';
function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><h2>{company.name}</h2><p>Tech-enabled pharmaceutical marketing with QR authentication, GPS field tracking, and transparent reporting.</p></div><div><h3>Contact</h3><p><Mail size={16} /> {company.email}</p><p><Phone size={16} /> Call or WhatsApp: {company.phone}</p></div><div><h3>Image Sources</h3>{imageCredits.map((credit) => <a key={credit.url} href={credit.url} target="_blank" rel="noreferrer">{credit.label}</a>)}</div></div><div className="footer-credit"><a href="https://www.qubnixtechnology.com/" target="_blank" rel="noreferrer">Developed by Qubnix Technology</a></div></footer>;
}
export default Footer;
