import React, { useState, useEffect } from 'react'
import './index.css'

// Featured images for the hero section
const featuredImages = [
  '/assets/gallery/Bright.jpg',
  '/assets/gallery/Sun.jpg',
  '/assets/gallery/Bright_1.jpg'
]

// Categorized Product Images
const productImages = [
  '3mm_d2.webp', 'All_in_1.webp', 'barbed1.jpg', 'barbed_single.jpg', 'Plastic_Green.jpg',
  'Short_D3.webp', 'Steel_pvc_cated.jpg', 'weldmess_GI.jpg', 'wire-mesh.jpg', 'Green_cover.jpg'
]

// Categorized Project Images
const projectImages = [
  'Barbed_site.jpg', 'Barbed_site1.webp', 'Bright.jpg', 'Bright_1.jpg', 'D1.jpg',
  'Greenish.jpg', 'Labour.jpg', 'Pic_1.jpg', 'Site_D1.jpg', 'Sun.jpg', 'Water.jpg'
]

function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('')
  const [ratings, setRatings] = useState([])
  const [newRating, setNewRating] = useState({ name: '', rating: 5, comment: '' })
  const [ratingStatus, setRatingStatus] = useState('')

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings')
      const data = await response.json()
      setRatings(data)
    } catch (err) {
      console.error('Error fetching ratings:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    
    // Prepare WhatsApp message
    const whatsappNumber = '919443399456'
    const text = `*New Inquiry from Modern Chain Link Website*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      
      if (data.status === 'success') {
        setStatus('Success! Opening WhatsApp for direct contact...')
        setTimeout(() => {
          window.open(whatsappUrl, '_blank')
          setFormData({ name: '', phone: '', message: '' })
          setStatus('Message sent successfully. Thank you!')
        }, 1000)
      } else {
        setStatus('Redirecting to WhatsApp...')
        window.open(whatsappUrl, '_blank')
      }
    } catch (error) {
      console.error('API Error:', error)
      setStatus('Redirecting to WhatsApp...')
      window.open(whatsappUrl, '_blank')
    }
  }

  const handleRatingSubmit = async (e) => {
    e.preventDefault()
    setRatingStatus('Submitting...')
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRating)
      })
      const data = await response.json()
      if (data.status === 'success') {
        setRatingStatus('Rating added! Thank you.')
        setNewRating({ name: '', rating: 5, comment: '' })
        fetchRatings()
      }
    } catch (err) {
      setRatingStatus('Error submitting rating.')
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#" className="logo">
            Modern Chain Link Company
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#ratings">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="tel:9443399456" className="btn btn-primary">Call Now</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="badge-row">
              <span className="badge">Tiruchengode's Best Fencing</span>
              <span className="badge-gold">8+ Years Experience</span>
            </div>
            <h1>Secure Your Property with <span>Unmatched Strength</span></h1>
            <p>Leading manufacturers of GI Chain Link and Barbed Wire. We provide expert fencing solutions for all kinds of <strong>Farms</strong>, specializing in durable installations for **Poultry Farms**.</p>
            <div className="hero-btns">
              <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
              <a href="#products" className="btn btn-outline">View Materials</a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/assets/gallery/Bright.jpg" alt="Featured Installation" className="hero-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800' }} />
          </div>
        </div>
      </section>

      <section className="expertise-strip">
        <div className="container expertise-flex">
          <div className="exp-item">
            <span className="icon">🚜</span>
            <div>
              <h4>All Farm Types</h4>
              <p>Custom solutions for agriculture, boundaries, and estates.</p>
            </div>
          </div>
          <div className="exp-item highlight">
            <span className="icon">🐔</span>
            <div>
              <h4>Poultry Specialists</h4>
              <p>Trusted by many large poultry farms for secure netting.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="icon">🏗️</span>
            <div>
              <h4>Industrial Grade</h4>
              <p>Heavy duty GI and PVC coated options available.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Our High-Quality Products</h2>
            <p>Durable fencing materials built for longevity and maximum security.</p>
          </div>
          <div className="gallery-grid">
            {productImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img 
                  src={`/assets/gallery/${img}`} 
                  alt={img} 
                  loading="lazy" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="gallery-section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Recent Projects</h2>
            <p>Success stories and installations from across Tiruchengode and surrounds.</p>
          </div>
          <div className="gallery-grid">
            {projectImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img 
                  src={`/assets/gallery/${img}`} 
                  alt={img} 
                  loading="lazy" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ratings" className="ratings-section">
        <div className="container">
          <div className="section-header">
            <h2>Verified Customer Ratings</h2>
            <p>See why our customers trust Modern Chain Link Company.</p>
          </div>
          <div className="ratings-flex">
            <div className="reviews-list">
              {ratings.map((r) => (
                <div key={r.id} className="review-card">
                  <div className="review-top">
                    <h4>{r.name}</h4>
                    <span className="stars">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
              {ratings.length === 0 && <p className="no-reviews">No reviews yet. Share your experience!</p>}
            </div>
            <div className="rating-form card">
              <h3>Submit Your Feedback</h3>
              <form onSubmit={handleRatingSubmit}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={newRating.name}
                  onChange={(e) => setNewRating({...newRating, name: e.target.value})}
                  required 
                />
                <select 
                  value={newRating.rating}
                  onChange={(e) => setNewRating({...newRating, rating: parseInt(e.target.value)})}
                >
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
                <textarea 
                  placeholder="Your Message" 
                  rows="3"
                  value={newRating.comment}
                  onChange={(e) => setNewRating({...newRating, comment: e.target.value})}
                ></textarea>
                <button type="submit" className="btn btn-primary full-width">Post Rating</button>
                {ratingStatus && <p className="rating-status">{ratingStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-flex card">
            <div className="contact-text">
              <h2>Contact Our Team</h2>
              <p>For site visits and bulk fencing inquiries.</p>
              <div className="details">
                <p><strong>📍</strong> 3/59B, Vayalangadu, Vittampalayam Emappalli, TN</p>
                <p><strong>📞</strong> <a href="tel:9443399456">94433 99456</a>, <a href="tel:9080024505">90800 24505</a></p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
              <textarea 
                placeholder="Message" 
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
              <button type="submit" className="btn btn-accent full-width">Submit Inquiry</button>
              {status && <p className="status">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer-v2">
        <p>&copy; 2026 Modern Chain Link Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
