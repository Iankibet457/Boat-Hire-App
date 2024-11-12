import React from 'react';
import './Boats.css';

function Boats() {
  return (
    <div className="flex-grid-container">
      <div className="grid-item">
        <img src="/img/yatch1.jpg" alt="Yacht 1" />
        <h2>Yacht 1</h2>
      </div>
      <div className="grid-item">
        <img src="/img/yatch2.jpg" alt="Yacht 2" />
        <h2>Yacht 2</h2>
      </div>
      <div className="grid-item">
        <img src="/img/yatch3.jpg" alt="Yacht 3" />
        <h2>Yacht 3</h2>
      </div>
      <div className="grid-item">
        <img src="/img/yatch4.jpg" alt="Yacht 4" />
        <h2>Yacht 4</h2>
      </div>
      <div className="grid-item">
        <img src="/img/yatch5.jpg" alt="Yacht 5" />
        <h2>Yacht 5</h2>
      </div>
      <div className="grid-item">
        <img src="/img/yatch6.jpg" alt="Yacht 6" />
        <h2>Yacht 6</h2>
      </div>
    </div>
  );
}

export default Boats;
