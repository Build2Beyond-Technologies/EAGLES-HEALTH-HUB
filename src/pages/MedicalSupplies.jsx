import React, { useState } from 'react';
import { FaWhatsapp, FaMedkit, FaCheckCircle, FaHeartbeat } from 'react-icons/fa';

export default function MedicalSupplies() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    supplyType: 'Blood Pressure Monitor',
    quantity: '1',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const suppliesList = [
    {
      name: 'Digital Blood Pressure Monitor',
      desc: 'Clinically validated, upper-arm blood pressure monitors. Vital for patients on the Hypertension Support Track to record readings accurately at home.',
      features: ['One-touch measurement', 'Irregular heartbeat detection', 'Store up to 90 readings']
    },
    {
      name: 'Blood Glucose Testing Kit (Glucometer)',
      desc: 'Complete blood sugar monitoring systems including testing meter, lancing device, sterile lancets, and test strips. Critical for the Diabetes Support Track.',
      features: ['5-second test time', 'Tiny blood sample size', 'Hypo/Hyperglycemic indicators']
    },
    {
      name: 'Digital Body Composition Scale',
      desc: 'High-precision scales that calculate body weight, body fat index (BMI), muscle mass, and visceral fat percentages. Helps track obesity intervention metrics.',
      features: ['Bluetooth synchronization', 'Visceral fat tracking', 'Multi-user memory']
    },
    {
      name: 'Pulse Oximeter & Thermometer',
      desc: 'Fingertip pulse oximeter for tracking blood oxygen saturation and heart rate indicators alongside premium non-contact infrared thermometers.',
      features: ['HD OLED display', 'Instant temperature reading', 'High-temperature alarm signals']
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const request = {
      id: 'MS-' + Math.floor(Math.random() * 1000000 + 1),
      ...formData,
      status: 'Awaiting Quote',
      createdAt: new Date().toLocaleDateString()
    };

    // Save to localStorage for Admin view
    const currentRequests = JSON.parse(localStorage.getItem('ehh_supplies_requests') || '[]');
    currentRequests.unshift(request);
    localStorage.setItem('ehh_supplies_requests', JSON.stringify(currentRequests));

    // Redirect to WhatsApp
    const message = `Hello Dr. Ayeni Blessing,\n\nI would like to request assistance in sourcing medical supplies / devices.\n\n*Request Details:*\n- Item: ${formData.supplyType}\n- Quantity: ${formData.quantity}\n- Customer Name: ${formData.name}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n\n*Additional Notes:*\n${formData.notes || 'None'}`;
    const whatsappUrl = `https://wa.me/2347055893239?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Equipment Sourcing</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Medical Supplies Assistance</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            We assist individuals, families, and organizations in sourcing certified, high-quality medical devices and home health monitoring equipment.
          </p>
        </div>
      </div>

      {/* Main Info */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Home Care Devices</span>
            <h2 className="section-title">Why Monitor Health at Home?</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Lifestyle Medicine focuses on daily habits and physiological indicators. Tracking blood pressure levels, blood glucose levels, and weight markers at home gives Dr. Ayeni critical clinical data to tailor adjustments to your plan.
            </p>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              We vet global manufacturers to source reliable, accurate devices at wholesale costs, ensuring you avoid counterfeit products in the local market.
            </p>

            <div style={{ background: '#fcfff0', padding: '24px', borderRadius: '16px', border: '1px solid #e1e9df' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0c3e26', fontWeight: '700', marginBottom: '8px' }}>
                <FaMedkit />
                <span>Specialized Sourcing Service</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4d5f57', lineHeight: '1.6' }}>
                If you have a specific clinical device need that is not listed here (e.g., CPAP machines, compression stockings, nebulizers), submit an inquiry. We will assist and guide you appropriately.
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', color: '#0c3e26' }}>Standard Vetted Monitoring Equipment</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {suppliesList.map((item, idx) => (
                <div key={idx} style={{ background: '#fcfff0', border: '1px solid #e1e9df', borderRadius: '16px', padding: '20px' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#0c3e26', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaHeartbeat style={{ color: '#287a43', fontSize: '0.9rem' }} />
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#4d5f57', marginBottom: '12px', lineHeight: '1.5' }}>{item.desc}</p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {item.features.map((f, fIdx) => (
                      <span key={fIdx} style={{ fontSize: '0.75rem', background: '#fff', padding: '3px 8px', borderRadius: '6px', border: '1px solid #e1e9df', color: '#287a43', fontWeight: '600' }}>{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Form */}
      <section style={{ padding: '80px 0', background: '#fcfff0', borderTop: '1px solid #e1e9df' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-tag">Place an Inquiry</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Request Device Assistance</h2>
            <p className="section-sub">Fill out the details. We will check availability, generate a quotation, and send it to you via WhatsApp.</p>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e1e9df', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-medium)' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <FaCheckCircle style={{ color: '#287a43', fontSize: '3.5rem', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', marginBottom: '8px' }}>Inquiry Forwarded!</h3>
                <p style={{ fontSize: '0.9rem', color: '#4d5f57', marginBottom: '20px' }}>
                  Your request for sourcing assistance has been submitted. A WhatsApp representative will confirm availability and shipping timelines.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-outline" style={{ padding: '8px 20px' }}>Order More Items</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
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
                      placeholder="e.g., john@example.com" 
                    />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp Number</label>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Select Device Needed</label>
                    <select 
                      name="supplyType" 
                      className="form-control" 
                      value={formData.supplyType} 
                      onChange={handleInputChange}
                    >
                      <option value="Blood Pressure Monitor">Upper Arm Blood Pressure Monitor</option>
                      <option value="Blood Glucose Glucometer Kit">Glucometer Testing Kit</option>
                      <option value="Replacement Test Strips">Glucometer Test Strips Only</option>
                      <option value="Body Composition Weight Scale">Body Composition Weight Scale</option>
                      <option value="Fingertip Pulse Oximeter">Pulse Oximeter & Heart Monitor</option>
                      <option value="Other Sourcing Requirement">Other Special Sourcing Requirement</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input 
                      type="number" 
                      name="quantity" 
                      min="1"
                      className="form-control" 
                      value={formData.quantity} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Specific Brand / Model Requirements (Optional)</label>
                  <textarea 
                    name="notes" 
                    className="form-control" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="Specify CPAP sizes, Glucometer brands or specific monitor needs..." 
                    style={{ minHeight: '80px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-secondary" 
                  style={{ width: '100%', padding: '12px' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Request Quote via WhatsApp'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
