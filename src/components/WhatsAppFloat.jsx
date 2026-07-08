import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/2347055893239?text=Hello%20Dr.%20Ayeni%20Blessing,%20I%20am%20visiting%20the%20Eagles%20Health%20Hub%20website%20and%20would%20like%20to%20make%20an%20enquiry.";

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-btn"
      aria-label="Chat on WhatsApp"
      title="Chat with Dr. Ayeni on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
