import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaLock, FaWhatsapp, FaCreditCard, FaUniversity, FaCopy } from 'react-icons/fa';

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
  const [paymentMethod, setPaymentMethod] = useState('paystack'); // 'paystack' | 'transfer'
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isTransferBooking, setIsTransferBooking] = useState(false);

  // Auto scroll to confirmation card on success
  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }, [success]);

  // Fixed Price in Naira: ₦10,000
  const price = 10000;

  const bankDetails = {
    bankName: 'Premium Trust Bank',
    accountName: 'Eagle Medical Services Ltd',
    accountNumber: '0010254981'
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Generate dynamic date slots (excluding Sundays)
  const getNextAvailableDates = () => {
    const dates = [];
    let current = new Date();
    while (dates.length < 7) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0) { // Exclude Sunday
        dates.push(new Date(current));
      }
    }
    return dates;
  };

  const availableDates = getNextAvailableDates();

  const availableTimeSlots = [
    '09:00 AM - 09:45 AM',
    '11:00 AM - 11:45 AM',
    '02:00 PM - 02:45 PM',
    '04:00 PM - 04:45 PM',
    '06:00 PM - 06:45 PM'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookSlot = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time slot for your consultation.');
      return;
    }

    if (paymentMethod === 'transfer') {
      // Handle Bank Transfer Flow
      const refId = 'TRANS-BOOK-' + Math.floor(Math.random() * 1000000 + 1);
      setBookingRef(refId);
      setIsTransferBooking(true);
      setSuccess(true);

      const booking = {
        id: refId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: selectedDate,
        time: selectedTime,
        history: formData.history,
        purpose: formData.purpose,
        price: price,
        reference: refId,
        paymentMethod: 'Bank Transfer',
        status: 'Pending Transfer Verification',
        createdAt: new Date().toLocaleDateString()
      };

      const currentBookings = JSON.parse(localStorage.getItem('ehh_bookings') || '[]');
      currentBookings.unshift(booking);
      localStorage.setItem('ehh_bookings', JSON.stringify(currentBookings));

      const message = `Hello Dr. Ayeni Blessing,\n\nI have submitted an online consultation booking via Bank Transfer.\n\n*Booking Details:*\n- Name: ${formData.name}\n- Purpose: ${formData.purpose}\n- Date: ${selectedDate}\n- Time: ${selectedTime}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Fee: ₦10,000\n- Bank: Premium Trust Bank (Eagle Medical Services Ltd / 0010254981)\n\n*Brief History/Notes:*\n${formData.history || 'None provided'}\n\nI am attaching my transfer receipt/proof now. Please verify and confirm my slot. Thank you!`;
      const whatsappUrl = `https://wa.me/2347055893239?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    // Standard Paystack Inline Checkout with Live Key
    setLoading(true);

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: 'pk_live_6b284015b868eadec2433556c44025b36201115c',
        email: formData.email,
        amount: price * 100, // in kobo
        currency: 'NGN',
        metadata: {
          custom_fields: [
            { display_name: 'Patient Name', variable_name: 'patient_name', value: formData.name },
            { display_name: 'Phone Number', variable_name: 'phone_number', value: formData.phone },
            { display_name: 'Date Slot', variable_name: 'date_slot', value: selectedDate },
            { display_name: 'Time Slot', variable_name: 'time_slot', value: selectedTime },
            { display_name: 'Purpose', variable_name: 'purpose', value: formData.purpose }
          ]
        },
        callback: (response) => {
          setLoading(false);
          setBookingRef(response.reference);
          setIsTransferBooking(false);
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
            paymentMethod: 'Paystack',
            status: 'Paid',
            createdAt: new Date().toLocaleDateString()
          };

          // Save to localStorage for Admin view
          const currentBookings = JSON.parse(localStorage.getItem('ehh_bookings') || '[]');
          currentBookings.unshift(booking);
          localStorage.setItem('ehh_bookings', JSON.stringify(currentBookings));

          // Trigger WhatsApp redirection with pre-filled details
          const message = `Hello Dr. Ayeni Blessing,\n\nI have successfully booked an online consultation via Paystack.\n\n*Booking Details:*\n- Name: ${formData.name}\n- Purpose: ${formData.purpose}\n- Date: ${selectedDate}\n- Time: ${selectedTime}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Payment Ref: ${response.reference}\n- Amount Paid: ₦10,000\n\n*Brief History/Notes:*\n${formData.history || 'None provided'}\n\nPlease confirm my slot. Thank you!`;
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
      alert('Paystack SDK failed to load.');
    }
  };

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Clinical Bookings</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Book a Consultation</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Schedule a private online consultation with Dr. Ayeni Blessing to discuss your health concerns, review your health results, answer your questions, and develop a personalized health plan.
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
              <h2 style={{ fontSize: '1.8rem', color: '#0c3e26', marginBottom: '12px' }}>
                {isTransferBooking ? 'Booking Submitted (Bank Transfer)' : 'Appointment Booked Successfully!'}
              </h2>
              <p style={{ color: '#4d5f57', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                {isTransferBooking ? (
                  <>Your booking reference is <strong>{bookingRef}</strong>. Please ensure you send your transfer receipt/evidence to Dr. Ayeni on WhatsApp <strong>(+234 705 589 3239)</strong> to finalize confirmation.</>
                ) : (
                  <>Thank you! Your payment reference is <strong>{bookingRef}</strong>. An onboarding coordinator will confirm your slot.</>
                )}
              </p>
              <div style={{ padding: '16px 20px', background: '#fcfff0', borderRadius: '12px', border: '1px solid #e1e9df', marginBottom: '24px', textAlign: 'left', fontSize: '0.9rem' }}>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Patient Name:</strong> {formData.name}</p>
                <p><strong>Fee:</strong> ₦10,000 ({isTransferBooking ? 'Direct Bank Transfer' : 'Paid via Paystack'})</p>
              </div>
              
              <div style={{ background: '#f4fcf7', padding: '16px', borderRadius: '12px', border: '#c8e6c9', marginBottom: '24px', textAlign: 'left' }}>
                <p style={{ fontSize: '0.88rem', color: '#1b5e20', margin: 0 }}>
                  <strong>Need to reschedule?</strong> If this time is no longer favorable, you can contact Dr. Ayeni directly on WhatsApp Business anytime to reschedule.
                </p>
                <a 
                  href={`https://wa.me/2347055893239?text=${encodeURIComponent(`Hello Dr. Ayeni Blessing,\n\nI booked a consultation with reference ${bookingRef} for ${selectedDate} at ${selectedTime}. I would like to inquire about rescheduling to a different time.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#128c7e', borderColor: '#128c7e', marginTop: '12px', padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Message on WhatsApp Business
                </a>
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
                    <label>Select Preferred Time</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', marginTop: '8px' }}>
                      {availableTimeSlots.map((time, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedTime(time)}
                          className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
                          style={{ padding: '12px' }}
                        >
                          <FaClock style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: '#f4fcf7', padding: '16px 20px', borderRadius: '12px', border: '1px solid #c8e6c9', marginTop: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <FaWhatsapp style={{ color: '#25d366', fontSize: '1.6rem', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.88rem', color: '#1b5e20' }}>
                      <strong>Need a different time or date?</strong>
                      <p style={{ margin: '4px 0 8px', color: '#2e7d32', fontSize: '0.82rem' }}>
                        If the available schedule slots aren't convenient for you, you can reach out directly via WhatsApp to request an alternate time or reschedule anytime.
                      </p>
                      <a 
                        href="https://wa.me/2347055893239?text=Hello%20Dr.%20Ayeni%20Blessing,%20I%20am%20looking%20to%20book%20a%20private%20consultation%20and%20would%20like%20to%20inquire%20about%20a%20custom%20time%20slot."
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#128c7e', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        Chat with Dr. Ayeni on WhatsApp &rarr;
                      </a>
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
                      style={{ minHeight: '90px' }}
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div style={{ marginTop: '24px', marginBottom: '20px' }}>
                    <label style={{ fontWeight: '700', color: '#0c3e26', marginBottom: '8px', display: 'block' }}>Choose Payment Method</label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      background: '#f1f5f2',
                      padding: '6px',
                      borderRadius: '12px'
                    }}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paystack')}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: paymentMethod === 'paystack' ? '#0c3e26' : 'transparent',
                          color: paymentMethod === 'paystack' ? '#fff' : '#4d5f57',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <FaCreditCard /> Pay with Paystack
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('transfer')}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: paymentMethod === 'transfer' ? '#0c3e26' : 'transparent',
                          color: paymentMethod === 'transfer' ? '#fff' : '#4d5f57',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <FaUniversity /> Pay via Transfer
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'transfer' && (
                    <div style={{
                      background: '#fcfff0',
                      border: '1px solid #dbe6dc',
                      borderRadius: '16px',
                      padding: '18px 20px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#c9952a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Official Bank Details
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0c3e26' }}>
                          ₦10,000
                        </span>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#6d7f76', display: 'block' }}>Bank Name</span>
                        <strong style={{ fontSize: '0.95rem', color: '#0c3e26' }}>{bankDetails.bankName}</strong>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#6d7f76', display: 'block' }}>Account Name</span>
                        <strong style={{ fontSize: '0.95rem', color: '#0c3e26' }}>{bankDetails.accountName}</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e1e9df', marginTop: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#6d7f76', display: 'block' }}>Account Number</span>
                          <strong style={{ fontSize: '1.15rem', color: '#0c3e26', letterSpacing: '0.04em' }}>{bankDetails.accountNumber}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={copyAccountNumber}
                          className="btn btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <FaCopy /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      <div style={{ marginTop: '12px', background: '#f4fbf6', border: '1px solid #c8e6c9', borderRadius: '8px', padding: '10px 12px', fontSize: '0.8rem', color: '#1b5e20', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <FaWhatsapp style={{ fontSize: '1.1rem', color: '#25D366', flexShrink: 0, marginTop: '2px' }} />
                        <span>Transfer ₦10,000 to the account above and click below to send your transfer receipt to WhatsApp for confirmation.</span>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className={`btn ${paymentMethod === 'transfer' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                    disabled={loading}
                  >
                    {paymentMethod === 'transfer' ? (
                      <>
                        <FaWhatsapp /> Submit Booking & Send Receipt via WhatsApp
                      </>
                    ) : (
                      loading ? 'Opening Paystack...' : 'Pay ₦10,000 via Paystack'
                    )}
                  </button>
                </form>
              </div>

              <div className="booking-sidebar">
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#0c3e26' }}>Booking Summary</h3>
                
                <div style={{ flexGrow: 1 }}>
                  <div style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #e1e9df' }}>
                    <p style={{ fontSize: '0.85rem', color: '#4d5f57', textTransform: 'uppercase', fontWeight: '700' }}>Practitioner</p>
                    <h4 style={{ fontSize: '1.1rem', marginTop: '4px' }}>Dr. Ayeni Blessing O.</h4>
                    <p style={{ fontSize: '0.82rem', color: '#4d5f57' }}>MBChB, MPH, MWACP</p>
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

                <div style={{ background: '#f4fcf7', padding: '16px', borderRadius: '12px', border: '1px solid #c8e6c9', marginBottom: '16px', fontSize: '0.85rem', color: '#1b5e20' }}>
                  <strong>Direct WhatsApp Support</strong>
                  <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#2e7d32' }}>
                    Have questions about dates, times, or need to reschedule?
                  </p>
                  <a 
                    href="https://wa.me/2347055893239?text=Hello%20Dr.%20Ayeni%20Blessing,%20I%20have%20an%20inquiry%20regarding%20consultation%20booking/rescheduling."
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#128c7e', fontWeight: '700', marginTop: '8px', textDecoration: 'none', fontSize: '0.82rem' }}
                  >
                    <FaWhatsapp style={{ fontSize: '1rem' }} /> Contact Dr. Ayeni on WhatsApp
                  </a>
                </div>

                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e1e9df', fontSize: '0.8rem', color: '#4d5f57', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaLock style={{ color: '#287a43', fontSize: '1.2rem', flexShrink: 0 }} />
                  <span>Secure Paystack online checkout or direct bank transfer available.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
