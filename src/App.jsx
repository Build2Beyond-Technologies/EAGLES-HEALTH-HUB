import React, { useState, useEffect } from 'react';
import { pagePaths, pageFromPath } from './navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BackToTop from './components/BackToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import LifestyleMedicine from './pages/LifestyleMedicine';
import FreeCommunity from './pages/FreeCommunity';
import PremiumMembership from './pages/PremiumMembership';
import Programs from './pages/Programs';
import BookConsultation from './pages/BookConsultation';
import SpeakingEngagement from './pages/SpeakingEngagement';
import MedicalSupplies from './pages/MedicalSupplies';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentTab, updateCurrentTab] = useState(() => pageFromPath(window.location.pathname));

  const setCurrentTab = (page) => {
    const path = pagePaths[page];
    if (!path) return;
    if (window.location.pathname !== path) window.history.pushState(null, '', path);
    updateCurrentTab(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => updateCurrentTab(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize LocalStorage lists if empty
  useEffect(() => {
    if (!localStorage.getItem('ehh_bookings')) {
      localStorage.setItem('ehh_bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('ehh_subscriptions')) {
      localStorage.setItem('ehh_subscriptions', JSON.stringify([]));
    }
    if (!localStorage.getItem('ehh_speaking_enquiries')) {
      localStorage.setItem('ehh_speaking_enquiries', JSON.stringify([]));
    }
    if (!localStorage.getItem('ehh_contact_messages')) {
      localStorage.setItem('ehh_contact_messages', JSON.stringify([]));
    }
    if (!localStorage.getItem('ehh_blogs')) {
      localStorage.setItem('ehh_blogs', JSON.stringify([]));
    }
  }, []);

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'about':
        return <About setCurrentTab={setCurrentTab} />;
      case 'lifestyle-medicine':
        return <LifestyleMedicine />;
      case 'free-community':
        return <FreeCommunity setCurrentTab={setCurrentTab} />;
      case 'premium-membership':
        return <PremiumMembership />;
      case 'programs':
        return <Programs setCurrentTab={setCurrentTab} />;
      case 'book-consultation':
        return <BookConsultation />;
      case 'speaking-engagements':
        return <SpeakingEngagement />;
      case 'medical-supplies':
        return <MedicalSupplies />;
      case 'blog':
        return <Blog />;
      case 'contact-faq':
        return <Contact />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <section className="container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
            <h1>Page not found</h1>
            <p>The page you requested does not exist.</p>
            <a href="/" className="btn btn-primary">Return Home</a>
          </section>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main style={{ flexGrow: 1 }}>
        {renderActivePage()}
      </main>
      <Footer setCurrentTab={setCurrentTab} />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
