import React from 'react';
import './PhotoViewer.css';

const PhotoViewer = ({ photo, handleBan, isBanned }) => {
  if (!photo) return <p>No cat image available at the moment.</p>;

  const breed = photo.breeds && photo.breeds.length > 0 ? photo.breeds[0].name : 'Unknown';
  const origin = photo.breeds && photo.breeds.length > 0 ? photo.breeds[0].origin : 'Unknown';

  if (isBanned(photo)) {
    return <p>This cat is banned based on your preferences.</p>;
  }

  return (
    <div className="photo-container">
      <p><strong>Name:</strong> {photo.breeds && photo.breeds.length > 0 ? photo.breeds[0].name : 'No name available'}</p>
      <p><strong>Breed:</strong> {breed}</p>
      <p><strong>Origin:</strong> {origin}</p>
      <img src={photo.url} alt="Random Cat" style={{ width: '500px' }} />
      <div className="buttons">
        {breed !== 'Unknown' && <button onClick={() => handleBan('breeds', breed)}>Ban this Breed</button>}
        {origin !== 'Unknown' && <button onClick={() => handleBan('origins', origin)}>Ban this Origin</button>}
      </div>
    </div>
  );
};

export default PhotoViewer;
