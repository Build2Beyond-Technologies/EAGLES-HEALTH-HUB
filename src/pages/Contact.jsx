import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is Lifestyle Medicine?',
      a: 'Lifestyle Medicine is a clinical specialty that uses evidence-based lifestyle changes (such as high-nutrition diets, active movement, restorative sleep, stress relief, and community links) to prevent, treat, and in many cases reverse chronic conditions like high blood pressure and type 2 diabetes.'
    },
    {
      q: 'How does the Premium Membership differ from the Free Community?',
      a: 'The Free Community is open to all for general health updates, articles, and wellness bulletins. The Premium Membership is a structured clinical program that unlocks the 14-Day Lifestyle Transformation Challenge, dedicated Hypertension and Diabetes tracks, weekly Zoom meetings (Mondays 7:00 PM - 7:30 PM), and personal accountability check-lists.'
    },
    {
      q: 'How do I book and pay for consultations?',
      a: 'You can select a date and time slot directly on our "Book Consultation" page. The fee is ₦10,000. Payment is completed securely online via Paystack (cards, transfers, or USSD). On confirmation, you will receive booking details and a WhatsApp coordinate link.'
    },
    {
      q: 'Can I pay via manual bank transfer?',
      a: 'Yes! If you prefer manual bank transfers, please click the floating WhatsApp button to chat with our billing team. They will provide our corporate account details and manually register your slot or subscription.'
    },
    {
      q: 'Are home monitoring medical devices included in the membership?',
      a: 'Home monitoring devices (like Blood Pressure monitors and glucometers) are sourced separately. We assist members in sourcing verified, clinical-quality devices at wholesale prices to support their support tracks.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const contactMsg = {
      id: 'MSG-' + Math.floor(Math.random() * 1000000 + 1),
      ...formData,
      status: 'Unread',
      createdAt: new Date().toLocaleDateString()
    };

    // Save to localStorage for Admin view
    const currentMsgs = JSON.parse(localStorage.getItem('ehh_contact_messages') || '[]');
    currentMsgs.unshift(contactMsg);
    localStorage.setItem('ehh_contact_messages', JSON.stringify(currentMsgs));

    // Forwards details to WhatsApp
    const textMsg = `Hello Dr. Ayeni Blessing,\n\nI have sent a contact message via the Eagles Health Hub website.\n\n*Contact Details:*\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Subject: ${formData.subject}\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/2347055893239?text=${encodeURIComponent(textMsg)}`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  const toggleFaq = (idx) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Get in Touch</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Contact & FAQs</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Have questions about subscriptions, bookings, or sourcing equipment? Contact Dr. Ayeni's team or review our frequently asked questions.
          </p>
        </div>
      </div>

      {/* Main Info */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          
          {/* Details & Form */}
          <div>
            <span className="section-tag">Direct Contacts</span>
            <h2 className="section-title">We are Here to Help</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Have clinical inquiries, partnerships requests, or require billing support? Feel free to contact our administrative desk via WhatsApp, email, or by filling out the adjacent contact form.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: '#fcfff0', padding: '16px', borderRadius: '12px', border: '1px solid #e1e9df', color: '#287a43', fontSize: '1.5rem', display: 'flex' }}>
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0c3e26' }}>WhatsApp Direct</h4>
                  <p style={{ fontSize: '0.9rem', color: '#4d5f57' }}>+234 705 589 3239</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: '#fcfff0', padding: '16px', borderRadius: '12px', border: '1px solid #e1e9df', color: '#287a43', fontSize: '1.5rem', display: 'flex' }}>
                  <FaEnvelope />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0c3e26' }}>Email Address</h4>
                  <p style={{ fontSize: '0.9rem', color: '#4d5f57' }}>info@eaglesmedicalservices.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: '#fcfff0', padding: '16px', borderRadius: '12px', border: '1px solid #e1e9df', color: '#287a43', fontSize: '1.5rem', display: 'flex' }}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0c3e26' }}>Mailing Headquarters</h4>
                  <p style={{ fontSize: '0.9rem', color: '#4d5f57' }}>Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#fcfff0', padding: '40px', borderRadius: '24px', border: '1px solid #e1e9df', boxShadow: 'var(--shadow-medium)' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <FaCheckCircle style={{ color: '#287a43', fontSize: '3.5rem', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', marginBottom: '8px' }}>Message Forwarded!</h3>
                <p style={{ fontSize: '0.9rem', color: '#4d5f57', marginBottom: '20px' }}>
                  Thank you! Your message has been logged. We will redirect you to WhatsApp to complete your conversation immediately.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-outline" style={{ padding: '8px 20px' }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0c3e26', borderBottom: '1px solid #e1e9df', paddingBottom: '10px' }}>Contact Form</h3>
                
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="form-control" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="e.g., +234..." 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Inquiry Subject</label>
                  <select 
                    name="subject" 
                    className="form-control" 
                    value={formData.subject} 
                    onChange={handleInputChange}
                  >
                    <option value="General Inquiry">General Information Enquiry</option>
                    <option value="Subscription Help">Premium Subscription Assistance</option>
                    <option value="Booking Support">Consultation Booking Support</option>
                    <option value="Device Sourcing">Medical Supplies/Device Sourcing</option>
                    <option value="Partnerships">Media or Partnership Inquiries</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    name="message" 
                    className="form-control" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Write details of your enquiry here..." 
                    style={{ minHeight: '100px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-secondary" 
                  style={{ width: '100%', padding: '12px' }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message via WhatsApp'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Have a quick question? Review our standard diagnostic, booking, and membership FAQs.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`} onClick={() => toggleFaq(idx)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <FaChevronDown className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
