import React, { useState, useEffect } from 'react';

function Atlanta({ selectedCity, userEmail }) {
  const [locationData, setLocationData] = useState(null);

  const calculateCoordinates = () => {
    // Central point coordinates for Atlanta, Georgia
    const centralLat = 33.7490; // Atlanta's latitude
    const centralLng = -84.3880; // Atlanta's longitude

    // Radius in miles (132 square miles)
    const radiusInMiles = Math.sqrt(132);

    // Earth's radius in miles
    const earthRadiusInMiles = 3959; // Radius of Earth in miles

    // Calculate the latitude and longitude for the northernmost point
    const latitudeDistance = (radiusInMiles / earthRadiusInMiles) * (180 / Math.PI);
    const northernmostLat = centralLat + latitudeDistance;
    const northernmostLng = centralLng;

    // Calculate the latitude and longitude for the southernmost point
    const southernmostLat = centralLat - latitudeDistance;
    const southernmostLng = centralLng;

    // Calculate the latitude and longitude for the westernmost point
    const longitudeDistance = (radiusInMiles / earthRadiusInMiles) * (180 / Math.PI);
    const westernmostLat = centralLat;
    const westernmostLng = centralLng - longitudeDistance;

    // Calculate the latitude and longitude for the easternmost point
    const easternmostLat = centralLat;
    const easternmostLng = centralLng + longitudeDistance;

    setLocationData({
      central: { latitude: centralLat, longitude: centralLng },
      northernmost: { latitude: northernmostLat, longitude: northernmostLng },
      southernmost: { latitude: southernmostLat, longitude: southernmostLng },
      westernmost: { latitude: westernmostLat, longitude: westernmostLng },
      easternmost: { latitude: easternmostLat, longitude: easternmostLng },
    });
  };

  useEffect(() => {
    if (selectedCity === 'Atlanta') {
      calculateCoordinates();
    }
  }, [selectedCity]);

  return (
    <div>
      {selectedCity === 'Atlanta' && (
        <div>
          {userEmail && (
            <div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Atlanta;
