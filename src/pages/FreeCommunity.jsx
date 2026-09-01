import React from 'react';
import { FaWhatsapp, FaInfoCircle, FaCheckCircle, FaBullhorn, FaBookOpen } from 'react-icons/fa';

export default function FreeCommunity({ setCurrentTab }) {
  // Direct WhatsApp Group & Channel Links
  const whatsappCommunityLink = "https://chat.whatsapp.com/Dg8OJBPEF1s04XOYQfchLD?s=cl&p=a&ilr=1&amv=3";
  const whatsappChannelLink = "https://whatsapp.com/channel/0029VbC5cwzBFLgZxnNXIj1L";

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Free Platform</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Eagles Health Community</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Empowering individuals with practical health knowledge to make healthier choices and prevent lifestyle-related chronic diseases.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">🌿 Welcome to the Eagles Health Community</span>
            <h2 className="section-title">Join a Supportive Health Journey</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '18px' }}>
              The <strong>Eagles Health Community</strong> is a completely <strong>FREE</strong> platform dedicated to promoting healthy living through evidence-based health education, lifestyle awareness, and preventive care.
            </p>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              We believe that the first step to reversing chronic illness is knowledge. In this community, we break down complex clinical ideas into simple, daily actions you can take to protect your family's health.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '30px 0' }}>
              <a 
                href={whatsappCommunityLink} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
                style={{ background: '#25d366', borderColor: '#25d366' }}
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Join Free WhatsApp Community
              </a>
              <a 
                href={whatsappChannelLink} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline"
                style={{ color: '#128c7e', borderColor: '#128c7e' }}
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Follow WhatsApp Channel
              </a>
            </div>
            
            <p style={{ fontStyle: 'italic', color: '#c9952a', fontWeight: '700', textAlign: 'center' }}>
              🌱 Health is Wealth... Invest in Your Health!
            </p>
          </div>

          <div style={{ background: '#fcfff0', padding: '40px', borderRadius: '24px', border: '1px solid #e1e9df' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#0c3e26' }}>💡 As a member, you'll receive:</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                  <FaBookOpen />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>General Health Tips & Education</h4>
                  <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>Practical tips on nutrition, movement, hydration, and disease prevention rules.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Lifestyle & Wellness Tips</h4>
                  <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>Guided actionable hacks on sleep, posture, weight management, and stress management.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                  <FaBullhorn />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Health Updates & Announcements</h4>
                  <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>Get early notifications regarding Dr. Ayeni's seminars, medical outreaches, and free public webinars.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium Section */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <FaInfoCircle style={{ fontSize: '2.5rem', color: '#c9952a', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#0c3e26', marginBottom: '16px' }}>Need a Guided Transformation Pathway?</h2>
          <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
            The <strong>Eagles Health Community</strong> will always remain <strong>FREE</strong> for general health tips and public updates. However, for individuals who desire personalized clinical guidance, strict accountability, support groups, and structured lifestyle transformational tracks, we offer the <strong>Premium Membership</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentTab('premium-membership')} className="btn btn-secondary">
              Explore Premium Benefits
            </button>
            <button onClick={() => setCurrentTab('book-consultation')} className="btn btn-outline">
              Book Private Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
