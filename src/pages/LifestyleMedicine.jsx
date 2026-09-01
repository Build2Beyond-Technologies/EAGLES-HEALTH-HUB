import React, { useState } from 'react';
import { FaAppleAlt, FaRunning, FaSmile, FaMoon, FaUsers, FaExclamationTriangle, FaHeartbeat, FaInfoCircle } from 'react-icons/fa';

export default function LifestyleMedicine() {
  const [activeTab, setActiveTab] = useState('hypertension');

  const pillars = [
    {
      icon: <FaAppleAlt />,
      title: 'Nutrition',
      desc: 'Focusing on whole-food, plant-predominant eating patterns. Rebalancing minerals, increasing dietary fiber, and reducing processed foods to restore vascular and metabolic health.'
    },
    {
      icon: <FaRunning />,
      title: 'Physical Activity',
      desc: 'Designing sustainable, daily movement routines. Combining cardiovascular exercise with muscle-strengthening resistance work to optimize glucose disposal and lower blood pressure.'
    },
    {
      icon: <FaSmile />,
      title: 'Stress Management',
      desc: 'Addressing mental well-being and reducing cortisol levels. Incorporating mindfulness, breathing exercises, and nervous system regulation to mitigate blood vessel damage.'
    },
    {
      icon: <FaMoon />,
      title: 'Sleep Hygiene',
      desc: 'Prioritizing 7–9 hours of restorative sleep per night. Proper sleep heals blood vessels, regulates hunger hormones, and supports correct glucose metabolism.'
    },
    {
      icon: <FaUsers />,
      title: 'Social Connections',
      desc: 'Fostering strong, supportive relationships. Active participation in a wellness community reduces anxiety, enhances motivation, and aids habit accountability.'
    },
    {
      icon: <FaExclamationTriangle />,
      title: 'Substance Avoidance',
      desc: 'Reducing or eliminating high-risk substances such as tobacco, excess alcohol, and toxic environmental exposures that stiffen arteries and trigger inflammation.'
    }
  ];

  const diseaseGuide = {
    hypertension: {
      title: 'Hypertension (High Blood Pressure)',
      subtitle: 'reversing arterial stiffness and restoring vascular compliance.',
      points: [
        'Reducing sodium intake while elevating potassium and magnesium via whole foods.',
        'Activating the parasympathetic nervous system (stress reduction) to reduce baseline heart rate and vascular resistance.',
        'Engaging in aerobic movement which promotes nitric oxide release, relaxing arterial walls.',
        'Accountability structures to track blood pressure readings and support medication adherence.'
      ]
    },
    diabetes: {
      title: 'Type 2 Diabetes',
      subtitle: 'reversing insulin resistance at the cellular level.',
      points: [
        'Shifting to low-glycemic, fiber-rich diets that slow glucose absorption and prevent blood sugar spikes.',
        'Increasing skeletal muscle activity to promote GLUT4 transporter migration, pulling glucose from the blood without relying on excess insulin.',
        'Restoring natural circadian rhythms through good sleep, which directly lowers morning cortisol and insulin resistance.',
        'Monitoring HbA1c progress and providing structured daily lifestyle feedback.'
      ]
    },
    obesity: {
      title: 'Obesity & Weight Management',
      subtitle: 'correcting endocrine imbalances and supporting metabolic health.',
      points: [
        'Focusing on nutrient density and dietary satiety, not extreme starvation diets.',
        'Balancing leptin (satiety) and ghrelin (hunger) hormones through sleep hygiene and stress management.',
        'Enhancing resting metabolic rate through building lean muscle mass and active daily movement.',
        'Breaking emotional eating patterns through mindfulness coaching and community support.'
      ]
    },
    heart: {
      title: 'Cardiovascular (Heart) Disease',
      subtitle: 'preventing plaque formation and managing cardiovascular risk.',
      points: [
        'Emphasizing foods rich in omega-3 fatty acids, antioxidants, and soluble fibers to reduce vascular inflammation.',
        'Stopping tobacco use, which immediately stops ongoing damage to the endothelial lining of the heart vessels.',
        'Managing cholesterol ratios, blood pressure, and blood sugar levels in tandem through daily health checklists.',
        'Guided, low-impact exercise progression to build heart strength safely.'
      ]
    }
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Core Philosophy</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>What is Lifestyle Medicine?</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            A clinical approach that utilizes evidence-based lifestyle changes to prevent, manage, and reverse chronic conditions.
          </p>
        </div>
      </div>

      {/* Intro Info Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Root-Cause Medicine</span>
            <h2 className="section-title">Treat the Cause, Not Just the Symptoms</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Conventional medical approaches often focus on prescribing lifelong medications to suppress markers of chronic illnesses. While medications are critical and appropriate in many clinical stages, they rarely fix the root drivers of the illness.
            </p>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              <strong>Lifestyle Medicine</strong> focuses on the root behaviors that trigger metabolic, hormonal, and vascular dysfunction. By adjusting what we eat, how we move, how we sleep, and how we cope with stress, we can address the physiological root causes of disease.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fcfff0', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #287a43' }}>
              <FaInfoCircle style={{ color: '#287a43', fontSize: '1.5rem', flexShrink: 0 }} />
              <p style={{ fontSize: '0.88rem', color: '#0c3e26', fontWeight: '500' }}>
                Lifestyle medicine works <em>alongside</em> conventional medical care, offering a structured, drug-free pathway to reduce medication dependency where clinically appropriate.
              </p>
            </div>
          </div>

          <div style={{ background: '#fcfff0', padding: '40px', borderRadius: '24px', border: '1px solid #e1e9df' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>The Health Paradigm</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e1e9df' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#c62828', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Symptom Suppression</span>
                <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>Prescribing medications to lower blood pressure, lower blood glucose, or mask inflammation without correcting the patient's daily habits.</p>
              </div>
              <div style={{ textAlign: 'center', color: '#287a43', fontWeight: '800', fontSize: '1.2rem' }}>VS</div>
              <div style={{ background: '#fff', padding: '18px', borderRadius: '12px', border: '2px solid #287a43' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2e7d32', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Lifestyle Intervention</span>
                <p style={{ fontSize: '0.88rem', color: '#4d5f57' }}>Re-engineering diet, optimizing physical activity, improving sleep quality, and implementing mindfulness to correct cellular and arterial dysfunction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df', borderBottom: '1px solid #e1e9df' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clinical Framework</span>
            <h2 className="section-title">The Six Pillars of Lifestyle Medicine</h2>
            <p className="section-sub">These six core areas form the foundation of our clinical interventions and transformation challenges.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {pillars.map((p, idx) => (
              <div key={idx} className="card" style={{ padding: '30px' }}>
                <div className="card-icon" style={{ background: 'rgba(40,122,67,0.1)', color: '#287a43' }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ color: '#4d5f57', fontSize: '0.9rem', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chronic Disease Focus Tabs */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Disease Management</span>
            <h2 className="section-title">Preventing & Reversing Chronic Disease</h2>
            <p className="section-sub">Select a health track to understand how targeted lifestyle interventions address specific diagnoses.</p>
          </div>

          <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
            {/* Tab Headers */}
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '2px solid #e1e9df', marginBottom: '40px', flexWrap: 'wrap', gap: '10px' }}>
              {Object.keys(diseaseGuide).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: activeTab === key ? '#287a43' : '#4d5f57',
                    borderBottom: activeTab === key ? '3px solid #287a43' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                >
                  {key === 'heart' ? 'Heart Disease' : key}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ background: '#fcfff0', border: '1px solid #e1e9df', borderRadius: '24px', padding: '40px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#287a43', color: '#fff', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                <FaHeartbeat />
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', color: '#0c3e26' }}>{diseaseGuide[activeTab].title}</h3>
                <p style={{ color: '#c9952a', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
                  {diseaseGuide[activeTab].subtitle}
                </p>
                <ul style={{ listStyle: 'none' }}>
                  {diseaseGuide[activeTab].points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', color: '#4d5f57', fontSize: '0.98rem', lineHeight: '1.6' }}>
                      <span style={{ color: '#287a43', fontWeight: '800' }}>✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
