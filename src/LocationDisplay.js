import React, { useEffect, useState } from 'react';

function LocationDisplay({ latitude, longitude }) {
  const [locality, setLocality] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        if (!response.ok) {
          throw new Error('Error fetching locality');
        }

        const data = await response.json();

        // Extract locality information from the response
        const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;

        setLocality(city);
      } catch (error) {
        console.error('Error fetching locality:', error.message);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <div>
      {locality ? (
        <p>Your current locality: {locality}</p>
      ) : (
        <p>Fetching locality...</p>
      )}
    </div>
  );
}

export default LocationDisplay;