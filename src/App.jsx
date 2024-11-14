import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Boats from './Boats';
import Footer from './Footer';
import About from './About';
import Services from './Services.jsx';
import './App.css';
import './Header.css';
import './Footer.css';
import './Boats.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Boats />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
