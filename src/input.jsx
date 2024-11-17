import { useState } from 'react';

const Input = ({ boats, setBoats }) => {
  const [addFormData, setAddFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    price_per_hour: '',
    image_url: '',
  });

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

    fetch('https://boats-7hqf.onrender.com/boats', {
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
    <div className="flex-grid-container" style={{ paddingTop: '70px' }}>
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
    </div>
  );
};

export default Input;
