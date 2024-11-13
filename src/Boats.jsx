import React, { useState, useEffect } from 'react';
import './Boats.css';

function Boats() {
  const [boats, setBoats] = useState([]);
  const [editingBoatId, setEditingBoatId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    price_per_hour: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/boats')
      .then(response => response.json())
      .then(data => setBoats(data))
      .catch(error => console.error('Error fetching boat data:', error));
  }, []);

  const handleEditClick = (boat) => {
    setEditingBoatId(boat.boat_id);
    setFormData({
      name: boat.name,
      type: boat.type,
      capacity: boat.capacity,
      price_per_hour: boat.price_per_hour,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      capacity: Number(formData.capacity),
      price_per_hour: Number(formData.price_per_hour),
    };

    fetch(`http://localhost:3000/boats/${editingBoatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedBoat => {
        setBoats(boats.map(boat => (boat.boat_id === editingBoatId ? updatedBoat : boat)));
        setEditingBoatId(null);
      })
      .catch(error => console.error('Error updating boat data:', error));
  };

  return (
    <div className="flex-grid-container">
      {boats.length === 0 ? (
        <p>Loading boats...</p>
      ) : (
        boats.map((boat) => (
          <div key={boat.boat_id} className="grid-item">
            {editingBoatId === boat.boat_id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="Capacity"
                />
                <input
                  type="number"
                  name="price_per_hour"
                  value={formData.price_per_hour}
                  onChange={handleInputChange}
                  placeholder="Price per hour"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingBoatId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <img src={boat.image_url} alt={boat.name} />
                <h2>{boat.name}</h2>
                <p>Type: {boat.type}</p>
                <p>Capacity: {boat.capacity} people</p>
                <p>Price per hour: ${boat.price_per_hour}</p>
                <button onClick={() => handleEditClick(boat)}>Edit</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Boats;
