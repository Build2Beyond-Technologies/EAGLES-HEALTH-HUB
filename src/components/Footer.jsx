import { pagePaths, followPageLink } from '../navigation';
import React from 'react';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer({ setCurrentTab }) {
  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#082a1a', color: 'rgba(255,255,255,0.7)', padding: '80px 0 30px' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '40px', 
          marginBottom: '50px' 
        }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px' }}>Eagles Health Hub</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Empowering you with evidence-based health education, lifestyle medicine, and clinical guidance to achieve sustainable health transformation.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://wa.me/2347055893239" target="_blank" rel="noreferrer" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}><FaWhatsapp /></a>
              <a href="mailto:eaglemedicalservices6@gmail.com" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}><FaEnvelope /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}><FaFacebook /></a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              {['home', 'about', 'lifestyle-medicine', 'free-community', 'premium-membership'].map((tab) => (
                <li key={tab} style={{ marginBottom: '10px' }}>
                  <a
                    href={pagePaths[tab]}
                    onClick={(e) => followPageLink(e, handleNavClick, tab)}
                    style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem', textTransform: 'capitalize', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#c9952a'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {tab.replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services & Resources</h4>
            <ul style={{ listStyle: 'none' }}>
              {['programs', 'book-consultation', 'speaking-engagements', 'medical-supplies', 'blog', 'contact-faq'].map((tab) => (
                <li key={tab} style={{ marginBottom: '10px' }}>
                  <a
                    href={pagePaths[tab]}
                    onClick={(e) => followPageLink(e, handleNavClick, tab)}
                    style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem', textTransform: 'capitalize', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#c9952a'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {tab.replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Information</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '10px' }}>
              <strong>WhatsApp:</strong> +234 705 589 3239
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '10px' }}>
              <strong>Email:</strong> eaglemedicalservices6@gmail.com
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
              <strong>Mailing Address:</strong> Lagos, Nigeria
            </p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '8px', 
          padding: '18px 22px', 
          fontSize: '0.8rem', 
          lineHeight: '1.6', 
          marginBottom: '30px', 
          textAlign: 'justify' 
        }}>
          <strong>Medical Disclaimer:</strong> The health tips, webinars, challenges, and general educational content provided on this website are for educational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with your doctor or a qualified healthcare provider regarding a medical condition or treatment plan. Booking consultations online does not establish an emergency medical service relationship. For medical emergencies, please visit the nearest hospital immediately.
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '20px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'between', 
          alignItems: 'center', 
          fontSize: '0.8rem' 
        }}>
          <p style={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} Eagles Health Hub. All Rights Reserved. Designed for premium preventive healthcare. | Designed By{' '}
            <a 
              href="https://techbridgedigitalsolutions.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#c9952a', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = '#fff'}
              onMouseOut={(e) => e.target.style.color = '#c9952a'}
            >
              Techbridge Digital Solutions LTD
            </a>
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href={pagePaths.admin} onClick={(e) => followPageLink(e, handleNavClick, 'admin')} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}>Admin Area</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
