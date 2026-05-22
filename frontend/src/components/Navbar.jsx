import { Link, NavLink } from 'react-router-dom';
import { Menu, Pill, X } from 'lucide-react';
import { useState } from 'react';
import Button from './Button.jsx';

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/dashboard', 'Dashboard'], ['/contact', 'Contact']];

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-icon"><Pill size={22} /></span>
          <span>GL Healthcare</span>
        </Link>
        <Button variant="unstyled" className="icon-button menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {label}
            </NavLink>
          ))}
          <Button size="small" to="/login" onClick={() => setOpen(false)}>Login</Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
