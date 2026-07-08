import React from 'react';
import { FaCalendarCheck, FaHeartbeat, FaClock, FaClipboardList, FaVideo, FaQuestionCircle } from 'react-icons/fa';

export default function Programs() {
  const tracks = [
    {
      icon: <FaClipboardList />,
      title: '14-Day Transformational Lifestyle Challenge',
      subtitle: 'Structured Daily Reset',
      desc: 'Our flagship 14-day reset program designed to jumpstart cellular health. Features structured daily check-lists, nutritional adjustments, stress relief routines, and guided hydration rules. Perfect for resetting habits.',
      delivery: 'WhatsApp-based tracking, daily checklist files, and group support.'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Hypertension Support Track',
      subtitle: 'Arterial Elasticity Focus',
      desc: 'A dedicated pathway focusing on mineral balancing, dietary sodium reduction, vascular compliance exercises, and guided medication adherence accountability. Targets reversal of arterial stiffness.',
      delivery: 'Daily bp monitoring logging templates, customized recipe files, and group check-ins.'
    },
    {
      icon: <FaHeartbeat style={{ color: '#c92828' }} />,
      title: 'Diabetes Support Track',
      subtitle: 'Cellular Insulin Sensitivity Focus',
      desc: 'A guided track to optimize glycemic balance. Emphasizes low-glycemic high-fiber meal designs, resistance training structures to enhance skeletal muscle glucose intake, and sleep rhythms alignment.',
      delivery: 'Blood sugar check templates, specific glycemic indexing guides, and group reviews.'
    },
    {
      icon: <FaClock />,
      title: 'Healthy Living Series',
      subtitle: 'Weekly Interactive Lessons',
      desc: 'Join Dr. Ayeni Blessing every Monday from 7:00 PM to 7:30 PM. These meetings break down complex clinical theories into digestible, actionable rules you can execute in your home immediately.',
      delivery: 'Weekly live Zoom/Meet calls, direct questions, and recorded archives.'
    },
    {
      icon: <FaVideo />,
      title: 'Monthly Webinars',
      subtitle: 'Deep-dive Lifestyle Training',
      desc: 'Comprehensive training webinars focused on particular clinical topics like cardiovascular longevity, hormone resets, leaky gut repairs, and childhood wellness protocols.',
      delivery: 'Detailed slide packs, downloadable cookbooks, and interactive workshop sheets.'
    },
    {
      icon: <FaQuestionCircle />,
      title: 'Live Q&A Sessions',
      subtitle: 'Direct Physician Guidance',
      desc: 'Ask your clinical wellness questions directly. Get verified, evidence-based answers regarding diets, health indicators, supplement choices, and lifestyle adjustments from Dr. Ayeni Blessing.',
      delivery: 'Bi-weekly open group consultations.'
    }
  ];

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Transformation Guides</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Our Lifestyle Programs</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Structured, evidence-based wellness programs designed to help you prevent chronic illnesses and optimize your energy.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clinical Tracks</span>
            <h2 className="section-title">Guided Health Pathways</h2>
            <p className="section-sub">
              Our programs are designed to meet you where you are, using clinical guidelines alongside practical, actionable tools.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {tracks.map((t, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="card-icon" style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43', margin: 0 }}>
                    {t.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: '#0c3e26' }}>{t.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: '#c9952a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.subtitle}</span>
                  </div>
                </div>
                <p style={{ color: '#4d5f57', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                  {t.desc}
                </p>
                <div style={{ borderTop: '1px solid #e1e9df', paddingTop: '16px', fontSize: '0.82rem', color: '#4d5f57' }}>
                  <strong>Delivery Format:</strong> {t.delivery}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Call to Action */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <FaCalendarCheck style={{ fontSize: '2.5rem', color: '#c9952a', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#0c3e26', marginBottom: '16px' }}>Ready to Get Started?</h2>
          <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Access to our 14-day transformational challenges and disease support tracks is included in our **Premium Membership** plans. You can also book a private consultation for a highly personalized plan.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="#premium-membership" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Join Premium Hub</a>
            <a href="#book-consultation" className="btn btn-outline" style={{ textDecoration: 'none' }}>Book Consultation</a>
          </div>
        </div>
      </section>
    </div>
  );
}
