import React, { useState, useEffect } from 'react';
import { FaSearch, FaBookOpen, FaUser, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  const defaultPosts = [
    {
      id: 'default-1',
      title: 'The Six Pillars of Lifestyle Medicine: Your Health Blueprint',
      excerpt: 'Discover how daily habits in nutrition, movement, stress relief, and sleep form the foundation of clinical disease reversal.',
      content: `Lifestyle Medicine represents a paradigm shift in modern healthcare. Rather than managing chronic symptoms with life-long drug therapies, it utilizes six evidence-based lifestyle behaviors to prevent, treat, and reverse common diagnoses.\n\n### The Six Key Pillars:\n\n1. **Whole-Food, Plant-Predominant Nutrition:** Incorporating fiber-dense fruits, vegetables, beans, and whole grains while dropping processed meats and refined sugars.\n2. **Regular Physical Activity:** Engaging in consistent aerobic and resistance exercises to stimulate skeletal muscle glucose uptake and vascular elasticity.\n3. **Restorative Sleep Hygiene:** Aiming for 7–9 hours of sleep each night to help repair tissues and regulate hormonal rhythms.\n4. **Mindfulness & Stress Management:** Reducing baseline cortisol levels through breathing exercises, meditation, and healthy coping structures.\n5. **Healthy Relationships:** Actively connecting with family and health communities to boost accountability and reduce cortisol levels.\n6. **Substance Avoidance:** Dropping high-risk inputs like tobacco and excessive alcohol consumption.\n\nBy executing these six core adjustments, you can restore natural vascular compliance and metabolic functions, directly reducing the triggers for chronic illnesses.`,
      category: 'Nutrition',
      author: 'Dr. Ayeni Blessing',
      date: 'July 5, 2026',
      readTime: '5 min read',
      tag: 'Lifestyle Medicine'
    },
    {
      id: 'default-2',
      title: 'Dietary Sodium and Vascular Compliance: Reversing Hypertension',
      excerpt: 'Learn the direct physiological links between table salt and arterial stiffness, and how a potassium-dense diet relaxes blood vessels.',
      content: `Hypertension (high blood pressure) is often referred to as a "silent killer" because it damages blood vessels silently over decades. One of the primary physiological drivers of high blood pressure is arterial stiffness and fluid retention, heavily impacted by dietary sodium.\n\n### The Sodium-Potassium Balance:\n\nWhen we consume high levels of refined sodium (found in table salt, bouillon cubes, and packaged foods), our kidneys retain excess water to maintain mineral concentrations. This elevates blood volume, putting higher hydraulic pressure on our blood vessel walls.\n\nSimultaneously, high sodium and low potassium lead to stiffening of the endothelial lining of our arteries. Endothelial cells lose their ability to produce nitric oxide—the natural chemical that instructs blood vessels to dilate and relax.\n\n### Reversing the Damage:\n\n1. **Sodium Reduction:** Limit salt addition to foods and avoid processed canned foods.\n2. **Elevated Potassium Intake:** Increase consumption of bananas, sweet potatoes, leafy green vegetables, and avocados. Potassium stimulates the kidneys to excrete sodium and directly relaxes vascular smooth muscle cells.\n3. **Aerobic Exercise:** Regular walks or cardio work trigger natural nitric oxide release, softening vascular walls within weeks.\n\nRestoring vascular compliance through lifestyle changes can reduce systolic blood pressure by 10-15 mmHg, frequently lowering clinical medication requirements under supervision.`,
      category: 'Hypertension',
      author: 'Dr. Ayeni Blessing',
      date: 'July 1, 2026',
      readTime: '6 min read',
      tag: 'Hypertension'
    },
    {
      id: 'default-3',
      title: 'Reversing Insulin Resistance: Beyond Just Cutting Sugars',
      excerpt: 'A clinical explanation of why intracellular lipid buildup blocks insulin signaling, and how fiber and resistance training clear the block.',
      content: `Type 2 Diabetes is primarily driven by a condition known as insulin resistance. While many believe diabetes is simply a "sugar problem" caused by eating glucose, the clinical root of insulin resistance is actually related to cellular fat storage and muscle metabolism.\n\n### The Mechanism of Insulin Resistance:\n\nWhen we consume excess fats and refined carbohydrates, fatty acid metabolites build up inside our skeletal muscle cells (a condition called *intramyocellular lipids*). This microscopic fat accumulation blocks the internal signaling pathway of the insulin receptor.\n\nWhen insulin binds to the cell, the signal to open glucose doors (GLUT4 transporters) is blocked. As a result, glucose remains locked out of cells, elevating blood sugar levels, while the pancreas pumps out more insulin to force the doors open.\n\n### Reversing the Block:\n\n1. **High Dietary Fiber:** Dietary fibers bind to bile acids, slowing glucose entry and reducing fat absorption, which helps lower intramyocellular lipid levels.\n2. **Resistance Exercise:** Contracting muscles pull glucose out of the blood stream *without* using insulin. This provides a direct, drug-free method to clear circulating glucose and burn intracellular fat deposits.\n3. **Circadian Sleep Rhythms:** Sleep deprivation raises morning cortisol, which immediately blocks insulin actions. Prioritizing 8 hours of sleep restores hormonal insulin sensitivity.\n\nPartnering dietary adjustments with regular physical movement targets the root cellular causes of Type 2 Diabetes, supporting stable blood sugar levels.`,
      category: 'Diabetes',
      author: 'Dr. Ayeni Blessing',
      date: 'June 28, 2026',
      readTime: '7 min read',
      tag: 'Diabetes'
    }
  ];

  // Fetch blogs from localStorage + default blogs
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('ehh_blogs') || '[]');
    setBlogPosts([...storedBlogs, ...defaultPosts]);
  }, []);

  const categories = ['All', 'Nutrition', 'Hypertension', 'Diabetes', 'Lifestyle Medicine'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ paddingTop: '90px' }} className="animate-fade-in-up">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #051f12 0%, #0c3e26 100%)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag" style={{ color: '#c9952a' }}>Health Resources</span>
          <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Health Education Hub</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto' }}>
            Evidence-based medical resources, health tips, and lifestyle medicine tutorials curated by Dr. Ayeni Blessing.
          </p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: '#fcfff0' }}>
        <div className="container">
          
          {/* Filters Area */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '20px', 
            marginBottom: '40px',
            background: '#fff',
            padding: '20px 30px',
            borderRadius: '16px',
            border: '1px solid #e1e9df'
          }}>
            {/* Category selection */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: '1.5px solid',
                    borderColor: selectedCategory === cat ? '#287a43' : '#e1e9df',
                    background: selectedCategory === cat ? '#287a43' : 'transparent',
                    color: selectedCategory === cat ? '#fff' : '#4d5f57',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fdfdfd', border: '1.5px solid #e1e9df', padding: '10px 16px', borderRadius: '50px', width: '100%', maxWidth: '300px' }}>
              <FaSearch style={{ color: '#4d5f57', fontSize: '0.9rem' }} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#16221d' }}
              />
            </div>
          </div>

          {/* Grid of articles */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: '16px', border: '1px solid #e1e9df' }}>
              <p style={{ color: '#4d5f57', fontSize: '1.1rem' }}>No articles match your search criteria. Check back later!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <div key={post.id} className="blog-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#0c3e26', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '4rem' }}>
                    <FaBookOpen />
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-tag">{post.tag || post.category}</span>
                    <h3 className="blog-title" style={{ color: '#0c3e26' }}>{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #e1e9df', paddingTop: '16px' }}>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="btn btn-outline"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '50px' }}
                      >
                        Read Full Article
                      </button>
                      <span style={{ fontSize: '0.75rem', color: '#4d5f57' }}>{post.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Expanded Article Modal */}
      {selectedPost && (
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
            maxWidth: '800px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: 'var(--shadow-heavy)'
          }}>
            <button 
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                cursor: 'pointer',
                color: '#4d5f57'
              }}
            >
              &times;
            </button>
            
            <span style={{ 
              display: 'inline-block', 
              background: '#fcfff0', 
              color: '#287a43', 
              fontSize: '0.75rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              padding: '6px 14px', 
              borderRadius: '50px', 
              border: '1px solid #e1e9df',
              marginBottom: '16px'
            }}>
              {selectedPost.tag || selectedPost.category}
            </span>

            <h2 style={{ fontSize: '2rem', color: '#0c3e26', marginBottom: '16px', lineHeight: '1.3' }}>{selectedPost.title}</h2>
            
            <div style={{ display: 'flex', gap: '20px', color: '#4d5f57', fontSize: '0.8rem', marginBottom: '30px', borderBottom: '1px solid #e1e9df', paddingBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser /> {selectedPost.author || 'Dr. Ayeni Blessing'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaCalendarAlt /> {selectedPost.date || 'July 2026'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaClock /> {selectedPost.readTime || '5 min read'}</span>
            </div>

            <div style={{ 
              fontSize: '1.05rem', 
              lineHeight: '1.8', 
              color: '#16221d', 
              whiteSpace: 'pre-line'
            }}>
              {selectedPost.content}
            </div>

            <div style={{ marginTop: '40px', borderTop: '1px solid #e1e9df', paddingTop: '24px', textAlign: 'center' }}>
              <button onClick={() => setSelectedPost(null)} className="btn btn-primary" style={{ padding: '10px 24px' }}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
