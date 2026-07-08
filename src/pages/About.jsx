import React from 'react';
import { FaGraduationCap, FaQuoteLeft, FaHeart, FaEye, FaBullhorn } from 'react-icons/fa';

export default function About({ setCurrentTab }) {
  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Meet the Founder</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Dr. Ayeni Blessing</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Empowering individuals to take control of their health through clinical Lifestyle Medicine and sustainable transformation.
          </p>
        </div>
      </div>

      {/* Main Bio Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', top: '15px', left: '-15px', width: '100%', height: '100%', border: '4px solid #c9952a', borderRadius: '24px', zIndex: 1 }}></div>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', zIndex: 2, background: '#0c3e26', height: '480px' }}>
                {/* Styled Vector representation of Dr. Ayeni Blessing since we don't have local image */}
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '40px', textAlign: 'center' }}>
                  <svg width="120" height="120" viewBox="0 0 100 100" style={{ marginBottom: '24px' }}>
                    <circle cx="50" cy="40" r="22" fill="#fff" />
                    <path d="M15 85 C15 62, 28 55, 50 55 C72 55, 85 62, 85 85 Z" fill="#287a43" />
                    {/* Stethoscope */}
                    <path d="M35 48 C35 58, 65 58, 65 48" fill="none" stroke="#c9952a" strokeWidth="4" />
                    <path d="M50 56 V72 C50 78, 40 78, 40 82" fill="none" stroke="#c9952a" strokeWidth="4" />
                  </svg>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>Dr. Ayeni Blessing</h3>
                  <p style={{ color: '#c9952a', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Medical Practitioner & Lifestyle Specialist</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                    "Treating root causes of disease with empathy, education, and accountability."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="section-tag">Professional Profile</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '24px' }}>Who is Behind Eagles Health Hub?</h2>
            <p style={{ color: '#4d5f57', marginBottom: '18px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              <strong>Dr. Ayeni Blessing</strong> is a dedicated medical doctor and lifestyle medicine expert passionate about preventive healthcare. Her medical practice centers on partnering with patients to treat and reverse chronic conditions through evidence-based lifestyle changes, rather than merely suppressing symptoms with life-long medications.
            </p>
            <p style={{ color: '#4d5f57', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Having witnessed thousands of individuals struggle with preventable chronic conditions like Hypertension, Type 2 Diabetes, Obesity, and Cardiovascular diseases, she founded **Eagles Health Hub** as a structured platform to bridge clinical care with actionable lifestyle transformation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '30px 0' }}>
              <div style={{ background: '#fcfff0', padding: '20px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
                <FaGraduationCap style={{ fontSize: '1.8rem', color: '#c9952a', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Education & training</h4>
                <p style={{ fontSize: '0.82rem', color: '#4d5f57' }}>Licensed Medical Practitioner, trained extensively in clinical medicine and Lifestyle Medicine interventions.</p>
              </div>
              <div style={{ background: '#fcfff0', padding: '20px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
                <FaHeart style={{ fontSize: '1.8rem', color: '#287a43', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Clinical Focus</h4>
                <p style={{ fontSize: '0.82rem', color: '#4d5f57' }}>Prevention and management of Hypertension, Diabetes, Obesity, and cardiovascular health.</p>
              </div>
            </div>

            <button onClick={() => setCurrentTab('book-consultation')} className="btn btn-primary">
              Book a Consultation with Dr. Ayeni
            </button>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df', borderBottom: '1px solid #e1e9df' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="card" style={{ padding: '40px' }}>
              <div className="card-icon" style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43' }}>
                <FaEye />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.7' }}>
                To establish a society where chronic, lifestyle-induced diseases are no longer seen as inevitable, but preventable. We envision Eagles Health Hub as a top African center for guided lifestyle transformation and holistic primary healthcare.
              </p>
            </div>

            <div className="card" style={{ padding: '40px' }}>
              <div className="card-icon" style={{ background: 'rgba(201,149,42,0.1)', color: '#c9952a' }}>
                <FaHeart />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.7' }}>
                To empower individuals, families, and organizations with the practical knowledge, clinical diagnostics, and accountability support needed to construct sustainable habits, prevent chronic illnesses, and invest in long-term health.
              </p>
            </div>

            <div className="card" style={{ padding: '40px' }}>
              <div className="card-icon" style={{ background: 'rgba(12,62,38,0.1)', color: '#0c3e26' }}>
                <FaBullhorn />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Why We Were Created</h3>
              <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Conventional healthcare focuses heavily on managing symptoms after they appear. Eagles Health Hub was created to intervene early, targeting the underlying roots of disease through lifestyle therapy, daily habit structures, and community accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{ padding: '100px 0', background: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <FaQuoteLeft style={{ fontSize: '3rem', color: '#e1e9df', marginBottom: '24px' }} />
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '400', fontSize: '1.8rem', lineHeight: '1.6', color: '#0c3e26', marginBottom: '24px', fontStyle: 'italic' }}>
            "Good healthcare shouldn't just meet you when you are ill. The best healthcare equips you so you never have to be ill in the first place. Lifestyle Medicine is an investment in your greatest wealth — your health."
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#c9952a' }}>— Dr. Ayeni Blessing</p>
        </div>
      </section>
    </div>
  );
}
