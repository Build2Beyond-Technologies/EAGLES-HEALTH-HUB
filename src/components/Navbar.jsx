import { pagePaths, followPageLink } from '../navigation';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ currentTab, setCurrentTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Dr. Ayeni' },
    { id: 'lifestyle-medicine', label: 'Lifestyle Medicine' },
    { 
      id: 'community-programs', 
      label: 'Community & Programs', 
      submenu: [
        { id: 'free-community', label: 'Free Community' },
        { id: 'premium-membership', label: 'Premium Membership' },
        { id: 'programs', label: 'Programs' }
      ]
    },
    { id: 'blog', label: 'Blog' },
    { id: 'medical-supplies', label: 'Medical Supplies' },
    { id: 'contact-faq', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a 
          href="/"
          onClick={(e) => followPageLink(e, handleNavClick, 'home')}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img 
            src="/logo.png" 
            alt="Eagles Health Hub Logo" 
            style={{ height: '64px', width: 'auto', objectFit: 'contain', maxWidth: '250px' }} 
          />
        </a>

        <ul className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          {menuItems.map((item) => {
            if (item.submenu) {
              const isSubActive = item.submenu.some(sub => currentTab === sub.id);
              return (
                <li key={item.id} className="dropdown-container">
                  <span className={`nav-link ${isSubActive ? 'active' : ''}`}>
                    {item.label} <span className="dropdown-arrow">▼</span>
                  </span>
                  <ul className="dropdown-menu">
                    {item.submenu.map((sub) => (
                      <li key={sub.id}>
                        <a
                          href={pagePaths[sub.id]}
                          onClick={(e) => followPageLink(e, handleNavClick, sub.id)}
                          className="dropdown-item"
                          style={{
                            color: currentTab === sub.id ? 'var(--leaf-green)' : '',
                            background: currentTab === sub.id ? 'var(--cream-bg)' : ''
                          }}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li key={item.id}>
                <a
                  href={pagePaths[item.id]}
                  onClick={(e) => followPageLink(e, handleNavClick, item.id)}
                  className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={pagePaths['book-consultation']}
              onClick={(e) => followPageLink(e, handleNavClick, 'book-consultation')}
              className="nav-cta-btn btn"
              style={{ cursor: 'pointer', padding: '10px 20px', borderRadius: '50px' }}
            >
              Book Consultation
            </a>
          </li>
        </ul>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
