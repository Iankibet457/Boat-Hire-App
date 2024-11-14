import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about-container">
      <h1>About Boat Rental</h1>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>We are dedicated to providing exceptional boating experiences for everyone, from seasoned sailors to first-time adventurers. Our commitment to safety, quality, and customer satisfaction sets us apart in the marine leisure industry.</p>
        </section>

        <section className="history">
          <h2>Our Story</h2>
          <p>Founded in 2020, Boat Rental began with a simple vision: making the joy of boating accessible to all. What started as a small fleet of three boats has grown into a comprehensive collection of vessels suitable for every occasion.</p>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <ul>
            <li>Safety First - Rigorous maintenance and safety protocols</li>
            <li>Customer Focus - Personalized service for every client</li>
            <li>Environmental Responsibility - Eco-friendly practices</li>
            <li>Quality Assurance - Top-condition fleet</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About