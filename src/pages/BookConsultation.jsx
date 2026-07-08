import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaLock } from 'react-icons/fa';

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    history: '',
    purpose: 'Hypertension Check'
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

  // Helper to generate next 7 available days (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    while (count < 10) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0) { // Exclude Sunday
        dates.push(new Date(today));
        count++;
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookSlot = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }
    if (!selectedTime) {
      alert('Please select a time slot.');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out your contact details.');
      return;
    }

    setLoading(true);

    const price = 10000; // ₦10,000

    if (window.PaystackPop) {
      const reference = 'EHH-BOOK-' + Math.floor(Math.random() * 1000000000 + 1);
      const handler = window.PaystackPop.setup({
        key: 'pk_test_352a08bf24ddb16eb1dffafd367edc7b37e49f8e', // standard test key
        email: formData.email,
        amount: price * 100, // in kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Customer Name", variable_name: "customer_name", value: formData.name },
            { display_name: "Phone Number", variable_name: "phone_number", value: formData.phone },
            { display_name: "Appointment Date", variable_name: "appointment_date", value: selectedDate },
            { display_name: "Appointment Time", variable_name: "appointment_time", value: selectedTime }
          ]
        },
        callback: (response) => {
          setLoading(false);
          setBookingRef(response.reference);
          setSuccess(true);

          const booking = {
            id: response.reference,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: selectedDate,
            time: selectedTime,
            history: formData.history,
            purpose: formData.purpose,
            price: price,
            reference: response.reference,
            status: 'Paid',
            createdAt: new Date().toLocaleDateString()
          };

          // Save to localStorage for Admin view
          const currentBookings = JSON.parse(localStorage.getItem('ehh_bookings') || '[]');
          currentBookings.unshift(booking);
          localStorage.setItem('ehh_bookings', JSON.stringify(currentBookings));

          // Trigger WhatsApp redirection with pre-filled details
          const message = `Hello Dr. Ayeni Blessing,\n\nI have successfully booked an online consultation.\n\n*Booking Details:*\n- Name: ${formData.name}\n- Purpose: ${formData.purpose}\n- Date: ${selectedDate}\n- Time: ${selectedTime}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Payment Ref: ${response.reference}\n\n*Brief History/Notes:*\n${formData.history || 'None provided'}\n\nPlease confirm my slot. Thank you!`;
          const whatsappUrl = `https://wa.me/2347055893239?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        },
        onClose: () => {
          setLoading(false);
          alert('Payment cancelled.');
        }
      });
      handler.openIframe();
    } else {
      setLoading(false);
      alert('Paystack SDK failed to load. Please verify your internet connection and refresh.');
    }
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Clinical Bookings</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Book a Consultation</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Schedule a private, online video/teleconsultation with Dr. Ayeni Blessing to review your diagnostic markers and construct a personalized plan.
          </p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: '#fcfff0' }}>
        <div className="container">
          {success ? (
            <div style={{ background: '#fff', border: '1px solid #e1e9df', borderRadius: '24px', padding: '50px', textAlign: 'center', maxWidth: '600px', margin: '0 auto', boxShadow: 'var(--shadow-medium)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e8f5e9', color: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', margin: '0 auto 24px' }}>
                ✓
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#0c3e26', marginBottom: '12px' }}>Appointment Booked Successfully!</h2>
              <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Thank you! Your payment reference is <strong>{bookingRef}</strong>. An onboarding coordinator will confirm your slot.
              </p>
              <div style={{ padding: '16px 20px', background: '#fcfff0', borderRadius: '12px', border: '1px solid #e1e9df', marginBottom: '30px', textAlign: 'left', fontSize: '0.9rem' }}>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Patient Name:</strong> {formData.name}</p>
                <p><strong>Fee Paid:</strong> ₦10,000</p>
              </div>
              <button 
                onClick={() => {
                  setSuccess(false);
                  setSelectedDate('');
                  setSelectedTime('');
                  setFormData({ name: '', email: '', phone: '', history: '', purpose: 'Hypertension Check' });
                }} 
                className="btn btn-primary"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="booking-container">
              {/* Form Grid */}
              <div className="booking-main">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Consultation Details</h3>
                <form onSubmit={handleBookSlot}>
                  <div className="form-group">
                    <label>Select Consultation Date</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginTop: '8px' }}>
                      {availableDates.map((date, idx) => {
                        const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedDate(date.toLocaleDateString())}
                            className={`slot-btn ${selectedDate === date.toLocaleDateString() ? 'selected' : ''}`}
                            style={{ padding: '12px' }}
                          >
                            <FaCalendarAlt style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                            {dateString}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '24px' }}>
                    <label>Select Time Slot</label>
                    <div className="slots-grid">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
                        >
                          <FaClock style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e1e9df', margin: '30px 0' }} />

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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                  </div>

                  <div className="form-group">
                    <label>Primary Purpose of Consultation</label>
                    <select 
                      name="purpose" 
                      className="form-control" 
                      value={formData.purpose} 
                      onChange={handleInputChange}
                    >
                      <option value="Hypertension Check">Hypertension Support & Management</option>
                      <option value="Diabetes Control">Diabetes Control & Reversal</option>
                      <option value="Weight Management">Weight Management / Obesity</option>
                      <option value="General Lifestyle Audit">General Lifestyle & Preventive Medicine Audit</option>
                      <option value="Other">Other Chronic Disease Focus</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Brief Medical History / Notes (Optional)</label>
                    <textarea 
                      name="history" 
                      className="form-control" 
                      value={formData.history} 
                      onChange={handleInputChange} 
                      placeholder="Share current medications, recent bp/sugar readings, or key symptoms..."
                      style={{ minHeight: '100px' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-secondary" 
                    style={{ width: '100%', padding: '14px', marginTop: '20px' }}
                    disabled={loading}
                  >
                    {loading ? 'Opening Paystack...' : 'Pay ₦10,000 & Book Consultation'}
                  </button>
                </form>
              </div>

              {/* Sidebar Booking Summary */}
              <div className="booking-sidebar">
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#0c3e26' }}>Booking Summary</h3>
                
                <div style={{ flexGrow: 1 }}>
                  <div style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #e1e9df' }}>
                    <p style={{ fontSize: '0.85rem', color: '#4d5f57', textTransform: 'uppercase', fontWeight: '700' }}>Practitioner</p>
                    <h4 style={{ fontSize: '1.1rem', marginTop: '4px' }}>Dr. Ayeni Blessing</h4>
                    <p style={{ fontSize: '0.82rem', color: '#4d5f57' }}>Preventive Healthcare & Lifestyle Medicine</p>
                  </div>

                  <div style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #e1e9df' }}>
                    <p style={{ fontSize: '0.85rem', color: '#4d5f57', textTransform: 'uppercase', fontWeight: '700' }}>Schedule Slot</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: '#0c3e26' }}>
                      {selectedDate ? `${selectedDate} at ${selectedTime || '(select time)'}` : '(select date & time)'}
                    </p>
                  </div>

                  <div style={{ paddingBottom: '20px', marginBottom: '20px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#4d5f57', textTransform: 'uppercase', fontWeight: '700' }}>Consultation Fee</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '4px', color: '#287a43' }}>₦10,000</p>
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e1e9df', fontSize: '0.8rem', color: '#4d5f57', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaLock style={{ color: '#287a43', fontSize: '1.2rem', flexShrink: 0 }} />
                  <span>Secure 256-bit payment encryption powered by Paystack checkout.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
