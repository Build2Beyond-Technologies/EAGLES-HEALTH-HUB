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
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleNavClick('home')}>
          {/* Custom vector representation of Eagles Health Hub Logo: Green Eagle & Medical Cross Leaf */}
          <svg width="48" height="48" viewBox="0 0 100 100" style={{ marginRight: '10px' }}>
            <circle cx="50" cy="50" r="45" fill="#f4fcf7" stroke="#287a43" strokeWidth="2" />
            {/* Eagle Head Wings Shape */}
            <path d="M25 45 C35 25, 60 20, 75 35 C80 40, 82 48, 75 52 C70 55, 65 52, 60 48" fill="none" stroke="#0c3e26" strokeWidth="6" strokeLinecap="round" />
            <path d="M22 55 C35 48, 50 48, 65 58 C72 64, 78 72, 72 78 C65 85, 55 80, 48 70" fill="none" stroke="#287a43" strokeWidth="5" strokeLinecap="round" />
            {/* Health Leaf Cross */}
            <path d="M48 38 C53 38, 55 45, 55 50 C55 58, 48 65, 48 65 C48 65, 41 58, 41 50 C41 45, 43 38, 48 38 Z" fill="#287a43" opacity="0.8" />
            <path d="M48 44 V56 M42 50 H54" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            {/* Eye of the Eagle */}
            <circle cx="68" cy="38" r="2.5" fill="#c9952a" />
          </svg>
          <div className="logo-text">
            Eagles Health Hub
            <span>Lifestyle Medicine & Preventive Care</span>
          </div>
        </div>

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
                        <span
                          onClick={() => handleNavClick(sub.id)}
                          className="dropdown-item"
                          style={{
                            color: currentTab === sub.id ? 'var(--leaf-green)' : '',
                            background: currentTab === sub.id ? 'var(--cream-bg)' : ''
                          }}
                        >
                          {sub.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li key={item.id}>
                <span
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
          <li>
            <span
              onClick={() => handleNavClick('book-consultation')}
              className="nav-cta-btn btn"
              style={{ cursor: 'pointer', padding: '10px 20px', borderRadius: '50px' }}
            >
              Book Consultation
            </span>
          </li>
        </ul>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
