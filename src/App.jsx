import React, { useState, useEffect } from 'react';
import APIService from './APIService';
import PhotoViewer from './PhotoViewer';
import BanList from './BanList';
import './App.css';

const App = () => {
  const [screen, setScreen] = useState('welcome'); // Manage welcome and cat info screens
  const [photo, setPhoto] = useState(null); // Holds the current photo data
  const [banList, setBanList] = useState({ breeds: [], origins: [] }); // Tracks banned breeds and origins
  const [error, setError] = useState(null); // Holds error messages
  const apiService = new APIService('live_H7LOBW4u2Ir8iCwWvDNOvLGYNLrBhiTmuOSLwnyX5Z6xTFQOcU7UYD8MzYR7GnFX'); // Use the provided API key

  // Fetches a random cat image with breed and origin information
  const fetchRandomPhoto = async () => {
    try {
      const randomPhoto = await apiService.fetchRandomCat();
      const breed = randomPhoto.breeds && randomPhoto.breeds.length > 0 ? randomPhoto.breeds[0].name : 'Unknown';
      const origin = randomPhoto.breeds && randomPhoto.breeds.length > 0 ? randomPhoto.breeds[0].origin : 'Unknown';

      if (banList.breeds.includes(breed) || banList.origins.includes(origin)) {
        fetchRandomPhoto();
      } else {
        setPhoto(randomPhoto);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
      setPhoto(null);
    }
  };

  // Handles banning an attribute (breed or origin) and fetching a new cat
  const handleBan = (type, attribute) => {
    setBanList((prevBanList) => ({
      ...prevBanList,
      [type]: [...prevBanList[type], attribute],
    }));

    fetchRandomPhoto();
  };

  // Handles removing an attribute from the ban list
  const handleUnban = (type, attribute) => {
    setBanList((prevBanList) => ({
      ...prevBanList,
      [type]: prevBanList[type].filter((item) => item !== attribute),
    }));
  };

  const isBanned = (photo) => {
    const breed = photo.breeds && photo.breeds.length > 0 ? photo.breeds[0].name : 'Unknown';
    const origin = photo.breeds && photo.breeds.length > 0 ? photo.breeds[0].origin : 'Unknown';
    return banList.breeds.includes(breed) || banList.origins.includes(origin);
  };

  useEffect(() => {
    if (screen === 'cat') {
      fetchRandomPhoto();
    }
  }, [screen]);

  const handleStart = () => {
    setScreen('cat');
  };

  return (
    <div className="app-container">
      {screen === 'welcome' ? (
        <div className="welcome-screen">
          <h1>Discover Random Cats</h1>
          <p>Welcome! Click the button below to discover various cats, learn their breeds, origins, and more!</p>
          <button onClick={handleStart}>Start Discovering Cats</button>
        </div>
      ) : (
        <div className="cat-info-screen">
          <div className="content">
            <h1>Cat Information</h1>
            {error && <p className="error-message">{error}</p>}
            <PhotoViewer photo={photo} handleBan={handleBan} isBanned={isBanned} />
            <button onClick={fetchRandomPhoto}>Get Another Random Cat</button>
          </div>
          <BanList banList={banList} handleUnban={handleUnban} />
        </div>
      )}
    </div>
  );
};

export default App;
