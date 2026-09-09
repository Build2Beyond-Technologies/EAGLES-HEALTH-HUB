import React, { useState } from 'react';
import { FaCheckCircle, FaStar, FaChevronRight } from 'react-icons/fa';

export default function PremiumMembership() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedPlan, setSelectedPlan] = useState(null); // { name, price, key }
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Quarterly Plan',
      price: 12500,
      period: '3 months',
      savings: null,
      popular: true,
      benefits: [
        'Twice-Monthly Healthy Living Series & Webinars',
        'Live Q&A Sessions with Dr. Ayeni',
        '14-Day Lifestyle Transformation Challenge',
        'Hypertension & Diabetes Support Tracks',
        'Medication Adherence & Accountability Support',
        'Downloadable Educational Resources'
      ]
    },
    {
      name: 'Annual Plan',
      price: 48000,
      period: 'year',
      savings: 'Save ₦2,000 vs Quarterly',
      popular: false,
      benefits: [
        'All Quarterly Plan Benefits & Tracks',
        'Direct 1-on-1 monthly follow-up check',
        'Extended family resource sharing',
        'Accountability partner matching',
        'Complete digital resources archive & priority access'
      ]
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openPaymentModal = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    setPaymentSuccess(false);
  };

  const handlePaystackPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);

    // Paystack Inline SDK Integration
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_352a08bf24ddb16eb1dffafd367edc7b37e49f8e', // standard test key
        email: formData.email,
        amount: selectedPlan.price * 100, // in kobo
        currency: 'NGN',
        ref: 'EHH-SUB-' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phone
            },
            {
              display_name: "Subscription Plan",
              variable_name: "subscription_plan",
              value: selectedPlan.name
            }
          ]
        },
        callback: (response) => {
          // On Payment Successful
          setLoading(false);
          setIsCheckoutOpen(false);
          setPaymentSuccess(true);

          const subscription = {
            id: response.reference,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            plan: selectedPlan.name,
            price: selectedPlan.price,
            date: new Date().toLocaleDateString(),
            reference: response.reference,
            status: 'Paid'
          };

          // Save to localStorage for Admin view
          const currentSubs = JSON.parse(localStorage.getItem('ehh_subscriptions') || '[]');
          currentSubs.unshift(subscription);
          localStorage.setItem('ehh_subscriptions', JSON.stringify(currentSubs));

          // Prepare WhatsApp link for onboarding
          const message = `Hello Dr. Ayeni Blessing,\n\nI have successfully subscribed to the Premium Membership (${selectedPlan.name}).\n\n*Payment Details:*\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Ref: ${response.reference}\n- Amount Paid: ₦${selectedPlan.price.toLocaleString()}\n\nPlease verify my payment and add me to the Premium onboarding channels.`;
          
          const whatsappUrl = `https://wa.me/2347055893239?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        },
        onClose: () => {
          setLoading(false);
          alert('Transaction cancelled.');
        }
      });
      handler.openIframe();
    } else {
      setLoading(false);
      alert('Paystack SDK failed to load. Please refresh the page and try again.');
    }
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Premium Tier</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Eagles Health Premium Hub</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Structured transformations, accountability tracks, and direct clinical wellness guidance with Dr. Ayeni Blessing.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <section style={{ padding: '80px 0', background: '#fcfff0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Exclusive Privileges</span>
            <h2 className="section-title">What You Get as a Premium Member</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              For members who desire structured lifestyle transformation, custom care guides, and professional accountability, we offer our premium tracks. Premium membership helps you take the six pillars of lifestyle medicine and apply them step-by-step.
            </p>

            <ul style={{ listStyle: 'none' }}>
              {[
                { title: '14-Day Lifestyle Transformation Challenge', desc: 'A structured daily reset focusing on resetting hydration, digestion, blood sugar, and stress responses.' },
                { title: 'Hypertension & Diabetes Support Tracks', desc: 'Targeted care guides with active accountability checklists to support blood pressure and blood glucose compliance.' },
                { title: 'Twice-Monthly Healthy Living Series & Live Webinars', desc: 'Exclusive interactive sessions (7:00PM - 7:30PM) and monthly workshops with Dr. Ayeni.' },
                { title: 'Medication Adherence Support', desc: 'Structured accountability protocols to build compliance and guide safe tapering under medical supervision.' }
              ].map((b, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <FaCheckCircle style={{ color: '#287a43', fontSize: '1.4rem', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#0c3e26' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#4d5f57', lineHeight: '1.5' }}>{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e1e9df', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-medium)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#0c3e26', textAlign: 'center' }}>Twice-Monthly Live Sessions</h3>
            <p style={{ color: '#4d5f57', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px' }}>Exclusively accessible to Premium Members</p>
            
            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ background: '#c9952a', color: '#fff', display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>TWICE MONTHLY</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Healthy Living Series</h4>
              <p style={{ fontSize: '0.9rem', color: '#4d5f57', fontWeight: '500' }}>7:00 PM — 7:30 PM</p>
              <p style={{ fontSize: '0.82rem', color: '#4d5f57', marginTop: '12px' }}>
                Join Dr. Ayeni Blessing online for practical tips, lifestyle adjustments, and Q&A sessions on managing hypertension and diabetes.
              </p>
            </div>

            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Monthly Webinars & Challenges</h4>
              <p style={{ fontSize: '0.82rem', color: '#4d5f57' }}>
                Receive full digital kits, recipe books, exercise challenges, and downloadable trackers to support your transformation goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Subscribing Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing Plans</span>
            <h2 className="section-title">Invest in Your Long-Term Health</h2>
            <p className="section-sub">Choose a premium membership plan. Transactions are processed securely via Paystack.</p>
          </div>

          <div className="pricing-grid">
            {plans.map((p, idx) => (
              <div key={idx} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
                {p.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="pricing-name">{p.name}</h3>
                  <div className="pricing-price">
                    ₦{p.price.toLocaleString()}
                    <span>/{p.period}</span>
                  </div>
                  {p.savings && <span className="pricing-savings">{p.savings}</span>}
                </div>

                <ul className="pricing-features">
                  {p.benefits.map((benefit, bIdx) => (
                    <li key={bIdx}>
                      <FaChevronRight />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openPaymentModal(p)} 
                  className={`btn ${p.popular ? 'btn-secondary' : 'btn-outline'}`}
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Become a Premium Member
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paystack Checkout Modal */}
      {isCheckoutOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '480px',
            width: '100%',
            position: 'relative',
            boxShadow: 'var(--shadow-heavy)'
          }}>
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#4d5f57'
              }}
            >
              &times;
            </button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '6px', color: '#0c3e26' }}>Premium Subscription</h3>
            <p style={{ color: '#4d5f57', fontSize: '0.9rem', marginBottom: '24px' }}>
              You are subscribing to the <strong>{selectedPlan?.name}</strong> for <strong>₦{selectedPlan?.price.toLocaleString()}</strong>.
            </p>

            <form onSubmit={handlePaystackPayment}>
              <div className="form-group">
                <label>Your Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g., John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g., john@example.com"
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-control" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g., +234 803 123 4567"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                disabled={loading}
              >
                {loading ? 'Opening Paystack...' : `Pay ₦${selectedPlan?.price.toLocaleString()} via Paystack`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Success View */}
      {paymentSuccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            boxShadow: 'var(--shadow-heavy)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#e8f5e9',
              color: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              margin: '0 auto 24px'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', color: '#0c3e26' }}>Subscription Confirmed!</h3>
            <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
              Your payment has been successfully processed. An onboarding link has been shared via WhatsApp.
            </p>
            <button 
              onClick={() => setPaymentSuccess(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
