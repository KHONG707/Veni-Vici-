import React from 'react';
import './BanList.css';

const BanList = ({ banList, handleUnban }) => {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <h3>Banned Breeds</h3>
      {banList.breeds.length === 0 ? (
        <p>No banned breeds.</p>
      ) : (
        <ul>
          {banList.breeds.map((breed, index) => (
            <li key={index} onClick={() => handleUnban('breeds', breed)}>
              {breed}
            </li>
          ))}
        </ul>
      )}
      <h3>Banned Origins</h3>
      {banList.origins.length === 0 ? (
        <p>No banned origins.</p>
      ) : (
        <ul>
          {banList.origins.map((origin, index) => (
            <li key={index} onClick={() => handleUnban('origins', origin)}>
              {origin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BanList;
