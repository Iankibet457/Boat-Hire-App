import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Boats from './Boats';
import Footer from './Footer';
import About from './About';
import Services from './Services.jsx';
import './App.css';
import './Header.css';
import './Footer.css';
import './Boats.css';
import Input from './input.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    fetchBoats();
  }, []);

  const fetchBoats = () => {
    fetch('http://localhost:3000/boats')
      .then(response => response.json())
      .then(data => setBoats(data))
      .catch(error => console.error('Error fetching boat data:', error));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={
          <>
            <Input boats={boats} setBoats={setBoats} />
            <Boats boats={boats} setBoats={setBoats} searchQuery={searchQuery} />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
