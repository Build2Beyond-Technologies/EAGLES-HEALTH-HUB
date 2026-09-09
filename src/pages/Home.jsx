import React from 'react';
import { FaWhatsapp, FaCalendarCheck, FaUsers, FaArrowRight, FaShieldAlt, FaBriefcase, FaGraduationCap, FaHeartbeat } from 'react-icons/fa';

export default function Home({ setCurrentTab }) {
  const handleAction = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in-up">
      {/* Premium Hero Section */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="section-tag" style={{ color: '#c9952a' }}>Eagles Health Hub</span>
              <h1>
                Your Health. 
                <em>Our Priority.</em>
              </h1>
              <p className="hero-subtext">
                A modern clinical community designed to help you construct healthier habits, control blood pressure, and reverse chronic conditions through evidence-based Lifestyle Medicine.
              </p>
              
              <div className="hero-buttons">
                <button 
                  onClick={() => handleAction('free-community')} 
                  className="btn btn-primary"
                >
                  <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Join Free Community
                </button>
                <button 
                  onClick={() => handleAction('premium-membership')} 
                  className="btn btn-secondary"
                >
                  Become a Premium Member
                </button>
                <button 
                  onClick={() => handleAction('book-consultation')} 
                  className="btn btn-outline-white"
                >
                  Book a Consultation
                </button>
              </div>

              <div className="hero-stats">
                <div className="hero-stat-item">
                  <h3>1-on-1</h3>
                  <p>Consultation</p>
                </div>
                <div className="hero-stat-item">
                  <h3>Twice-Monthly</h3>
                  <p>Health Series</p>
                </div>
                <div className="hero-stat-item">
                  <h3>100%</h3>
                  <p>Evidence-Based</p>
                </div>
              </div>
            </div>

            <div className="hero-image-container">
              <div className="hero-img-backdrop"></div>
              <div className="hero-img-frame animate-float">
                <img 
                  src="/dr_ayani.jpeg" 
                  alt="Dr. Ayeni Blessing O. (MBChB, MPH, MWACP)" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Elements Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-flex">
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>Licensed Clinical Practice</span>
            </div>
            <div className="trust-item">
              <FaHeartbeat className="trust-icon" />
              <span>Lifestyle Medicine Focus</span>
            </div>
            <div className="trust-item">
              <FaUsers className="trust-icon" />
              <span>Accountability Support Groups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brief Intro section */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Clinical Mission</span>
            <h2 className="section-title">Small Healthy Choices. Lasting Results.</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Welcome to <strong>Eagles Health Hub</strong>. Directed by Dr. Ayeni Blessing, we focus on identifying the chemical and biological root causes of chronic illness. Rather than prescribing lifelong drug interventions to suppress symptoms, we partner with you to rebuild your cellular health.
            </p>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
              We integrate core medicine with target interventions in nutrition, physical movement, stress release, and sleep hygiene.
            </p>
            <button onClick={() => handleAction('about')} className="btn btn-outline">
              Learn More About Dr. Ayeni
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#0c3e26', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#287a43' }}>1.</span> Free Community Channel
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>
                Access general wellness checklists, dietary tip guides, and early updates regarding clinical webinars directly on WhatsApp.
              </p>
            </div>
            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#0c3e26', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#c9952a' }}>2.</span> Premium Membership Hub
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>
                Structured 14-day challenges, targeted Hypertension and Diabetes tracks, twice-monthly live sessions, and direct accountability channels.
              </p>
            </div>
            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#0c3e26', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#287a43' }}>3.</span> Clinical Sourcing Assistance
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>
                Source certified upper-arm blood pressure monitors, blood sugar testing glucometers, and weight scales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Membership Banner */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className="section-tag" style={{ color: '#c9952a' }}>Premium Programs</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Eagles' Health Premium Hub</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
              Join a guided cohort to build healthy habits. Get custom meal designs, blood pressure tracking logs, glucose templates, and join twice-monthly live Zooms.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => handleAction('premium-membership')} className="btn btn-secondary">
                View Pricing Plans
              </button>
              <button onClick={() => handleAction('programs')} className="btn btn-outline-white">
                Explore Support Tracks
              </button>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '24px' }}>Premium Inclusions:</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['14-Day Lifestyle Transformation Challenge', 'Hypertension & Diabetes Support Tracks', 'Twice-Monthly Live Zoom Sessions', 'Medication adherence accountability'].map((inc, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.95rem' }}>
                  <span style={{ color: '#c9952a', fontWeight: '800' }}>✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
