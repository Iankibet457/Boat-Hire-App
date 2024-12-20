import React, { useState, useEffect } from 'react';
import './Boats.css';

function Boats({ searchQuery }) {
  const [boats, setBoats] = useState([]);
  const [editingBoatId, setEditingBoatId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    price_per_hour: '',
  });

  useEffect(() => {
    fetch('https://boats-7hqf.onrender.com/boats')
      .then(response => response.json())
      .then(data => setBoats(data))
      .catch(error => console.error('Error fetching boat data:', error));
  }, []);

  const handleEditClick = (boat) => {
    setEditingBoatId(boat.id);
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
    
    
    const currentBoat = boats.find(boat => boat.id === editingBoatId);
    
    
    const updatedData = {
      ...currentBoat, 
      ...formData,    
      capacity: Number(formData.capacity),
      price_per_hour: Number(formData.price_per_hour),
    };

    fetch(`https://boats-7hqf.onrender.com/boats/${editingBoatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(updatedBoat => {
        setBoats(boats.map(boat => (boat.id === editingBoatId ? updatedBoat : boat)));
        setEditingBoatId(null);
      })
      .catch(error => console.error('Error updating boat data:', error));
  };

  const handleDeleteClick = (boatId) => {
    fetch(`https://boats-7hqf.onrender.com/boats/${boatId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setBoats(boats.filter(boat => boat.id !== boatId));
      })
      .catch(error => console.error('Error deleting boat:', error));
  };

  const filteredBoats = boats.filter(boat => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      boat.name.toLowerCase().includes(searchLower) ||
      boat.type.toLowerCase().includes(searchLower) ||
      boat.location?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex-grid-container" style={{ paddingTop: '70px' }}>
      {boats.length === 0 ? (
        <p>Loading boats...</p>
      ) : filteredBoats.length === 0 ? (
        <p>No boats found matching your search.</p>
      ) : (
        filteredBoats.map((boat) => (
          <div key={boat.id} className="grid-item">
            {editingBoatId === boat.id ? (
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
                <button onClick={() => handleDeleteClick(boat.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Boats;
