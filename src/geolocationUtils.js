// geolocationUtils.js

export const checkGeolocationSupport = () => {
    if ('geolocation' in navigator) {
      // Geolocation is supported
      console.log('Geolocation is supported')
      return true;
    } else {
      // Geolocation is not supported
      console.error('Geolocation is not supported by your browser');
      return false;
    }
  };
  