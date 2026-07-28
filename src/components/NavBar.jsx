import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    color: location.pathname === path ? '#4f46e5' : '#333',
  });

  return (
    <nav className="navbar">
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/projects" style={linkStyle('/projects')}>Projects</Link>
      <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
    </nav>
  );
}

export default NavBar;