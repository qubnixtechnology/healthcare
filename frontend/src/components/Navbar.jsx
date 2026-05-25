import { Link, NavLink } from 'react-router-dom';
import { Menu, Pill, X } from 'lucide-react';
import { useState } from 'react';
import Button from './Button.jsx';
import logoVideo from '../assets/curaveris-logo.mp4';
import { company } from '../data/siteData.js';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const links = [['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/contact', 'Contact']];

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <video src={logoVideo} autoPlay muted loop playsInline aria-hidden="true" />
            <Pill className="brand-fallback-icon" size={22} />
          </span>
          <span>{company.name}</span>
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
          {isAdmin && (
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Admin
            </NavLink>
          )}
          {isAuthenticated ? (
            <>
              <span className="nav-user">{user?.role === 'admin' ? 'Admin' : 'User'}: {user?.name}</span>
              <Button size="small" variant="outline" onClick={() => { logout(); setOpen(false); }}>Logout</Button>
            </>
          ) : (
            <Button size="small" to="/login" onClick={() => setOpen(false)}>Login</Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
