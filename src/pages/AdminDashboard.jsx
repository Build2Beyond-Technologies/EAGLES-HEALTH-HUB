import React, { useState, useEffect } from 'react';
import { FaUserMd, FaBook, FaCalendarCheck, FaUsers, FaEnvelope, FaPen, FaTrash, FaPlus, FaLock } from 'react-icons/fa';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data lists
  const [bookings, setBookings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [speakingEnquiries, setSpeakingEnquiries] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Blog creation/edit form state
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null if creating, contains blog object if editing
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Nutrition',
    tag: '',
    readTime: '5 min read',
    author: 'Dr. Ayeni Blessing'
  });

  // Load data from localStorage on mount
  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('ehh_bookings') || '[]'));
    setSubscriptions(JSON.parse(localStorage.getItem('ehh_subscriptions') || '[]'));
    setSpeakingEnquiries(JSON.parse(localStorage.getItem('ehh_speaking_enquiries') || '[]'));
    setContactMessages(JSON.parse(localStorage.getItem('ehh_contact_messages') || '[]'));
    setBlogs(JSON.parse(localStorage.getItem('ehh_blogs') || '[]'));
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin123') {
      setAuthorized(true);
    } else {
      alert('Incorrect passcode. Hint: Use 1234');
    }
  };

  const handleStatusChange = (listName, id, newStatus) => {
    let list = [];
    let key = '';

    if (listName === 'bookings') {
      list = [...bookings];
      key = 'ehh_bookings';
    } else if (listName === 'subscriptions') {
      list = [...subscriptions];
      key = 'ehh_subscriptions';
    } else if (listName === 'speaking') {
      list = [...speakingEnquiries];
      key = 'ehh_speaking_enquiries';
    } else if (listName === 'contacts') {
      list = [...contactMessages];
      key = 'ehh_contact_messages';
    }

    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      if (listName === 'bookings') setBookings(list);
      else if (listName === 'subscriptions') setSubscriptions(list);
      else if (listName === 'speaking') setSpeakingEnquiries(list);
      else if (listName === 'contacts') setContactMessages(list);

      localStorage.setItem(key, JSON.stringify(list));
    }
  };

  const handleDeleteItem = (listName, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    let list = [];
    let key = '';

    if (listName === 'bookings') {
      list = bookings.filter(item => item.id !== id);
      key = 'ehh_bookings';
      setBookings(list);
    } else if (listName === 'subscriptions') {
      list = subscriptions.filter(item => item.id !== id);
      key = 'ehh_subscriptions';
      setSubscriptions(list);
    } else if (listName === 'speaking') {
      list = speakingEnquiries.filter(item => item.id !== id);
      key = 'ehh_speaking_enquiries';
      setSpeakingEnquiries(list);
    } else if (listName === 'contacts') {
      list = contactMessages.filter(item => item.id !== id);
      key = 'ehh_contact_messages';
      setContactMessages(list);
    }

    localStorage.setItem(key, JSON.stringify(list));
  };

  // Blog actions
  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Nutrition',
      tag: 'Nutrition',
      readTime: '5 min read',
      author: 'Dr. Ayeni Blessing'
    });
    setIsBlogFormOpen(true);
  };

  const handleOpenEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tag: blog.tag || blog.category,
      readTime: blog.readTime || '5 min read',
      author: blog.author || 'Dr. Ayeni Blessing'
    });
    setIsBlogFormOpen(true);
  };

  const handleBlogFormChange = (e) => {
    setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value });
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    let updatedBlogs = [...blogs];

    if (editingBlog) {
      // Edit mode
      const idx = updatedBlogs.findIndex(b => b.id === editingBlog.id);
      if (idx !== -1) {
        updatedBlogs[idx] = {
          ...editingBlog,
          ...blogFormData,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
    } else {
      // Create mode
      const newBlog = {
        id: 'blog-' + Math.floor(Math.random() * 1000000 + 1),
        ...blogFormData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      updatedBlogs.unshift(newBlog);
    }

    setBlogs(updatedBlogs);
    localStorage.setItem('ehh_blogs', JSON.stringify(updatedBlogs));
    setIsBlogFormOpen(false);
    alert('Blog post saved successfully! Refresh page/change tab to view.');
  };

  const handleDeleteBlog = (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    const updatedBlogs = blogs.filter(b => b.id !== blogId);
    setBlogs(updatedBlogs);
    localStorage.setItem('ehh_blogs', JSON.stringify(updatedBlogs));
  };

  if (!authorized) {
    return (
      <div style={{ paddingTop: '150px', pb: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: '#fcfff0' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e1e9df', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-medium)' }}>
          <FaLock style={{ fontSize: '3rem', color: '#c9952a', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#0c3e26', marginBottom: '8px' }}>Admin Authorization</h2>
          <p style={{ color: '#4d5f57', fontSize: '0.85rem', marginBottom: '24px' }}>Please enter passcode to access Eagles Health Hub admin files.</p>
          <form onSubmit={handleUnlock}>
            <input 
              type="password" 
              className="form-control" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
              placeholder="Passcode (Hint: 1234)" 
              required
              style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', marginBottom: '20px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', background: '#fcfff0' }} className="animate-fade-in-up">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', color: '#0c3e26' }}>Eagles Admin Control Panel</h1>
            <p style={{ color: '#4d5f57', fontSize: '0.9rem' }}>Welcome, Dr. Ayeni Blessing. Manage consultation calendars, subscriptions, and educational articles.</p>
          </div>
          <button onClick={() => setAuthorized(false)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Logout</button>
        </div>

        {/* Dashboard Panels */}
        <div className="admin-layout">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <h3 style={{ color: '#fff', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Navigation</h3>
            <button onClick={() => setActiveTab('bookings')} className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}><FaCalendarCheck /> Appointments ({bookings.length})</button>
            <button onClick={() => setActiveTab('subscriptions')} className={`admin-tab-btn ${activeTab === 'subscriptions' ? 'active' : ''}`}><FaUsers /> Premium Subs ({subscriptions.length})</button>
            <button onClick={() => setActiveTab('speaking')} className={`admin-tab-btn ${activeTab === 'speaking' ? 'active' : ''}`}><FaUserMd /> Speaking ({speakingEnquiries.length})</button>
            <button onClick={() => setActiveTab('contacts')} className={`admin-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}><FaEnvelope /> Inquiries ({contactMessages.length})</button>
            <button onClick={() => setActiveTab('blogs')} className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}><FaBook /> Manage Blog ({blogs.length})</button>
          </div>

          {/* Main Content Area */}
          <div className="admin-content">
            
            {/* BOOKINGS VIEW */}
            {activeTab === 'bookings' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', borderBottom: '2px solid #e1e9df', paddingBottom: '12px' }}>Consultation Bookings</h3>
                {bookings.length === 0 ? (
                  <p style={{ color: '#4d5f57', padding: '30px 0' }}>No consultation appointments recorded yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Patient Name</th>
                          <th>Schedule Slot</th>
                          <th>Purpose</th>
                          <th>Phone & Email</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.id}>
                            <td><strong>{b.name}</strong></td>
                            <td>{b.date} at {b.time}</td>
                            <td><span style={{ fontSize: '0.8rem', background: '#e1e9df', padding: '4px 8px', borderRadius: '4px' }}>{b.purpose}</span></td>
                            <td>
                              <div style={{ fontSize: '0.8rem' }}>{b.phone}</div>
                              <div style={{ fontSize: '0.75rem', color: '#4d5f57' }}>{b.email}</div>
                            </td>
                            <td><span className="badge-status paid">{b.status}</span></td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleStatusChange('bookings', b.id, 'Completed')} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}>Complete</button>
                                <button onClick={() => handleDeleteItem('bookings', b.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#d32f2f', borderColor: '#d32f2f', borderRadius: '4px' }}><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SUBSCRIPTIONS VIEW */}
            {activeTab === 'subscriptions' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', borderBottom: '2px solid #e1e9df', paddingBottom: '12px' }}>Premium Subscribers</h3>
                {subscriptions.length === 0 ? (
                  <p style={{ color: '#4d5f57', padding: '30px 0' }}>No premium membership registrations recorded yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Subscriber</th>
                          <th>Tier</th>
                          <th>Amount</th>
                          <th>Sub Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((s) => (
                          <tr key={s.id}>
                            <td>
                              <strong>{s.name}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#4d5f57' }}>{s.phone} | {s.email}</div>
                            </td>
                            <td><span style={{ fontSize: '0.8rem', background: '#c9952a', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{s.plan}</span></td>
                            <td>₦{s.price.toLocaleString()}</td>
                            <td>{s.date}</td>
                            <td><span className="badge-status paid">{s.status}</span></td>
                            <td>
                              <button onClick={() => handleDeleteItem('subscriptions', s.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#d32f2f', borderColor: '#d32f2f', borderRadius: '4px' }}><FaTrash /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SPEAKING REQUESTS VIEW */}
            {activeTab === 'speaking' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', borderBottom: '2px solid #e1e9df', paddingBottom: '12px' }}>Speaking Engagements Requests</h3>
                {speakingEnquiries.length === 0 ? (
                  <p style={{ color: '#4d5f57', padding: '30px 0' }}>No outreach/speaking engagement enquiries recorded yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Organization</th>
                          <th>Contact Person</th>
                          <th>Type</th>
                          <th>Date & Audience</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speakingEnquiries.map((se) => (
                          <tr key={se.id}>
                            <td><strong>{se.orgName}</strong></td>
                            <td>
                              {se.contactPerson}
                              <div style={{ fontSize: '0.75rem', color: '#4d5f57' }}>{se.phone} | {se.email}</div>
                            </td>
                            <td>{se.eventType}</td>
                            <td>
                              <div style={{ fontSize: '0.8rem' }}>Date: {se.date || 'TBD'}</div>
                              <div style={{ fontSize: '0.75rem', color: '#4d5f57' }}>Audience: {se.expectedAudience}</div>
                            </td>
                            <td>
                              <span className={`badge-status ${se.status === 'Approved' ? 'paid' : 'pending'}`}>{se.status}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleStatusChange('speaking', se.id, 'Approved')} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}>Approve</button>
                                <button onClick={() => handleDeleteItem('speaking', se.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#d32f2f', borderColor: '#d32f2f', borderRadius: '4px' }}><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* CONTACT MESSAGES VIEW */}
            {activeTab === 'contacts' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', borderBottom: '2px solid #e1e9df', paddingBottom: '12px' }}>General Inquiries & Messages</h3>
                {contactMessages.length === 0 ? (
                  <p style={{ color: '#4d5f57', padding: '30px 0' }}>No general contact messages recorded yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Sender</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactMessages.map((m) => (
                          <tr key={m.id}>
                            <td>
                              <strong>{m.name}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#4d5f57' }}>{m.phone} | {m.email}</div>
                            </td>
                            <td><strong>{m.subject}</strong></td>
                            <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{m.message}</td>
                            <td><span className={`badge-status ${m.status === 'Responded' ? 'paid' : 'pending'}`}>{m.status}</span></td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleStatusChange('contacts', m.id, 'Responded')} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}>Mark Responded</button>
                                <button onClick={() => handleDeleteItem('contacts', m.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#d32f2f', borderColor: '#d32f2f', borderRadius: '4px' }}><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* BLOG MANAGEMENT VIEW */}
            {activeTab === 'blogs' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e1e9df', paddingBottom: '12px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0c3e26', margin: 0 }}>Blog Post Management</h3>
                  <button onClick={handleOpenCreateBlog} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <FaPlus style={{ marginRight: '6px' }} /> Create New Post
                  </button>
                </div>

                {blogs.length === 0 ? (
                  <p style={{ color: '#4d5f57', padding: '30px 0' }}>No custom blog posts found. (The default articles are always loaded on client frontend).</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Article Title</th>
                          <th>Category</th>
                          <th>Date Added</th>
                          <th>Author</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((post) => (
                          <tr key={post.id}>
                            <td><strong>{post.title}</strong></td>
                            <td><span style={{ fontSize: '0.8rem', background: '#e1e9df', padding: '4px 8px', borderRadius: '4px' }}>{post.category}</span></td>
                            <td>{post.date}</td>
                            <td>{post.author}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleOpenEditBlog(post)} className="btn btn-outline" style={{ padding: '6px', fontSize: '0.8rem', borderRadius: '4px' }}><FaPen /></button>
                                <button onClick={() => handleDeleteBlog(post.id)} className="btn btn-outline" style={{ padding: '6px', fontSize: '0.8rem', color: '#d32f2f', borderColor: '#d32f2f', borderRadius: '4px' }}><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* CREATE/EDIT BLOG POST MODAL */}
      {isBlogFormOpen && (
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
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: 'var(--shadow-heavy)'
          }}>
            <button 
              onClick={() => setIsBlogFormOpen(false)}
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#0c3e26' }}>
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>

            <form onSubmit={handleSaveBlog}>
              <div className="form-group">
                <label>Article Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  value={blogFormData.title} 
                  onChange={handleBlogFormChange} 
                  required 
                  placeholder="e.g., Understanding Nitric Oxide & Arterial Health" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    name="category" 
                    className="form-control" 
                    value={blogFormData.category} 
                    onChange={handleBlogFormChange}
                  >
                    <option value="Nutrition">Nutrition</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Lifestyle Medicine">Lifestyle Medicine</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tag / Badge Text</label>
                  <input 
                    type="text" 
                    name="tag" 
                    className="form-control" 
                    value={blogFormData.tag} 
                    onChange={handleBlogFormChange} 
                    placeholder="e.g., Vascular compliance" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Author Display Name</label>
                  <input 
                    type="text" 
                    name="author" 
                    className="form-control" 
                    value={blogFormData.author} 
                    onChange={handleBlogFormChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Reading Time</label>
                  <input 
                    type="text" 
                    name="readTime" 
                    className="form-control" 
                    value={blogFormData.readTime} 
                    onChange={handleBlogFormChange} 
                    required 
                    placeholder="e.g., 5 min read" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Brief Excerpt (Shown on grid cards)</label>
                <input 
                  type="text" 
                  name="excerpt" 
                  className="form-control" 
                  value={blogFormData.excerpt} 
                  onChange={handleBlogFormChange} 
                  required 
                  placeholder="A short one-sentence summary of the article..." 
                />
              </div>

              <div className="form-group">
                <label>Full Content (Markdown/Rich Text Support)</label>
                <textarea 
                  name="content" 
                  className="form-control" 
                  value={blogFormData.content} 
                  onChange={handleBlogFormChange} 
                  required 
                  placeholder="Write the full body of the article here. Support linebreaks..." 
                  style={{ minHeight: '200px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button type="submit" className="btn btn-secondary" style={{ flexGrow: 1 }}>
                  Save Blog Post
                </button>
                <button type="button" onClick={() => setIsBlogFormOpen(false)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
