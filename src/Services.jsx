import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      
      <div className="services-grid">
        <div className="service-card">
          <h3>Hourly Rentals</h3>
          <p>Perfect for quick adventures and day trips. Choose from our fleet of boats for a few hours of fun on the water.</p>
          <ul>
            <li>Flexible scheduling</li>
            <li>Various boat types available</li>
            <li>Basic safety equipment included</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Special Events</h3>
          <p>Make your special occasion unforgettable with our luxury yacht rentals for events.</p>
          <ul>
            <li>Wedding celebrations</li>
            <li>Corporate events</li>
            <li>Birthday parties</li>
          </ul>
        </div>
       
      </div>
    </div>
  );
}

export default Services;
