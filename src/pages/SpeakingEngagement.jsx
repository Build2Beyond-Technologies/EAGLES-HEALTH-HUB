import React, { useState } from 'react';
import { FaSchool, FaHospital, FaChurch, FaBuilding, FaCheckCircle, FaUserClock } from 'react-icons/fa';

export default function SpeakingEngagement() {
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: 'Workplace Wellness',
    expectedAudience: '50-100',
    date: '',
    topicDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const enquiry = {
      id: 'SE-' + Math.floor(Math.random() * 1000000 + 1),
      ...formData,
      status: 'Pending Review',
      createdAt: new Date().toLocaleDateString()
    };

    // Save to localStorage for Admin view
    const currentEnquiries = JSON.parse(localStorage.getItem('ehh_speaking_enquiries') || '[]');
    currentEnquiries.unshift(enquiry);
    localStorage.setItem('ehh_speaking_enquiries', JSON.stringify(currentEnquiries));

    // Redirect to WhatsApp
    const message = `Hello Dr. Ayeni Blessing,\n\nI would like to request a speaking engagement / wellness outreach.\n\n*Event Details:*\n- Organization: ${formData.orgName}\n- Contact Person: ${formData.contactPerson}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Event Type: ${formData.eventType}\n- Expected Audience: ${formData.expectedAudience}\n- Proposed Date: ${formData.date || 'TBD'}\n\n*Topic Details / Specific Requests:*\n${formData.topicDetails || 'None'}`;
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
          <span className="section-tag" style={{ color: '#c9952a' }}>Public Health Advocacy</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Speaking & Seminars</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Invite Dr. Ayeni Blessing to deliver clinical lifestyle medicine lectures, wellness seminars, and workplace health campaigns.
          </p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Custom Outreaches</span>
            <h2 className="section-title">Health Education That Transforms Communities</h2>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Dr. Ayeni Blessing regularly partners with organizations, schools, churches, corporate bodies, and community associations to raise wellness awareness and manage chronic diseases early.
            </p>
            <p style={{ color: '#4d5f57', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Presentations are highly interactive, evidence-based, and tailored to the demographic's unique requirements.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FaBuilding style={{ color: '#287a43' }} /> <span>Corporate Wellness</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FaChurch style={{ color: '#287a43' }} /> <span>Faith Groups Outreaches</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FaSchool style={{ color: '#287a43' }} /> <span>School Seminars</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FaHospital style={{ color: '#287a43' }} /> <span>Medical Outreaches</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#fcfff0', padding: '40px', borderRadius: '24px', border: '1px solid #e1e9df' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <FaCheckCircle style={{ color: '#287a43', fontSize: '3.5rem', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', marginBottom: '8px' }}>Request Submitted!</h3>
                <p style={{ fontSize: '0.9rem', color: '#4d5f57', marginBottom: '20px' }}>
                  Your request has been logged and forwarded to Dr. Ayeni's WhatsApp coordinator. We will reply to verify scheduling details shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-outline" style={{ padding: '8px 20px' }}>Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0c3e26', borderBottom: '1px solid #e1e9df', paddingBottom: '10px' }}>Speaking Request Form</h3>
                
                <div className="form-group">
                  <label>Organization / Community Name</label>
                  <input 
                    type="text" 
                    name="orgName" 
                    className="form-control" 
                    value={formData.orgName} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g., Eagle Corp or St. Paul Church" 
                  />
                </div>

                <div className="form-group">
                  <label>Contact Person Name</label>
                  <input 
                    type="text" 
                    name="contactPerson" 
                    className="form-control" 
                    value={formData.contactPerson} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g., Jane Smith" 
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
                      placeholder="e.g., info@corp.com" 
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

                <div className="form-group">
                  <label>Type of Engagement</label>
                  <select 
                    name="eventType" 
                    className="form-control" 
                    value={formData.eventType} 
                    onChange={handleInputChange}
                  >
                    <option value="Workplace Wellness">Workplace Wellness Seminars</option>
                    <option value="Community Medical Outreach">Community Medical Outreaches</option>
                    <option value="School Health Talks">School / Youth Health Lectures</option>
                    <option value="Church Wellness Seminar">Church / Religious Health Seminars</option>
                    <option value="Conference Keynote">Conference Keynotes</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Expected Audience Size</label>
                    <select 
                      name="expectedAudience" 
                      className="form-control" 
                      value={formData.expectedAudience} 
                      onChange={handleInputChange}
                    >
                      <option value="Under 50">Under 50 People</option>
                      <option value="50-100">50 - 100 People</option>
                      <option value="100-300">100 - 300 People</option>
                      <option value="Over 300">Over 300 People</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Proposed Date (Optional)</label>
                    <input 
                      type="date" 
                      name="date" 
                      className="form-control" 
                      value={formData.date} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Topic Details & Specific Objectives</label>
                  <textarea 
                    name="topicDetails" 
                    className="form-control" 
                    value={formData.topicDetails} 
                    onChange={handleInputChange} 
                    placeholder="Provide details about what you'd like Dr. Ayeni to cover..." 
                    style={{ minHeight: '80px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-secondary" 
                  style={{ width: '100%', padding: '12px' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Request via WhatsApp'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
