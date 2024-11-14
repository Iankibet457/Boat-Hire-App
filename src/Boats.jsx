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
  const [addFormData, setAddFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    price_per_hour: '',
    image_url: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/boats')
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
      .then(response => response.json())
      .then(updatedBoat => {
        setBoats(boats.map(boat => (boat.id === editingBoatId ? { ...boat, ...updatedBoat } : boat)));
        setEditingBoatId(null);
      })
      .catch(error => console.error('Error updating boat data:', error));
  };

  const handleDeleteClick = (boatId) => {
    fetch(`http://localhost:3000/boats/${boatId}`, {
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

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newBoat = {
      ...addFormData,
      capacity: Number(addFormData.capacity),
      price_per_hour: Number(addFormData.price_per_hour),
    };

    fetch('http://localhost:3000/boats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoat),
    })
      .then(response => response.json())
      .then(addedBoat => {
        setBoats([...boats, addedBoat]);
        setAddFormData({
          name: '',
          type: '',
          capacity: '',
          price_per_hour: '',
          image_url: '',
        });
      })
      .catch(error => console.error('Error adding boat:', error));
  };

  return (
    <div className="flex-grid-container">
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          value={addFormData.name}
          onChange={handleAddInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="type"
          value={addFormData.type}
          onChange={handleAddInputChange}
          placeholder="Type"
          required
        />
        <input
          type="number"
          name="capacity"
          value={addFormData.capacity}
          onChange={handleAddInputChange}
          placeholder="Capacity"
          required
        />
        <input
          type="number"
          name="price_per_hour"
          value={addFormData.price_per_hour}
          onChange={handleAddInputChange}
          placeholder="Price per hour"
          required
        />
        <input
          type="text"
          name="image_url"
          value={addFormData.image_url}
          onChange={handleAddInputChange}
          placeholder="Image URL"
          required
        />
        <button type="submit">Add Boat</button>
      </form>
      {boats.length === 0 ? (
        <p>Loading boats...</p>
      ) : (
        boats.map((boat) => (
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
