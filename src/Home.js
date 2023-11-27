import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from './firebaseConfig';
import Atlanta from './Atlanta';
import SanFrancisco from './SanFrancisco';
import Chat from './Chat';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

import { checkGeolocationSupport } from './geolocationUtils';
import LocationDisplay from './LocationDisplay';


function Home() {
  const [userEmail, setUserEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [chatId, setChatId] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (checkGeolocationSupport()) {
      const auth = getAuth(app);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserEmail(user.email);

          const docRef = doc(db, 'users', user.email);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            setSelectedCity(docSnapshot.data().selectedCity);
            setChatId(docSnapshot.data().selectedCity);
          }
        }
      });
    }
  }, []);

  const handleCitySelection = async (city) => {
    if (userEmail) {
      const citiesCollectionRef = collection(db, 'users');
      const userDocRef = doc(citiesCollectionRef, userEmail);
      await setDoc(userDocRef, { selectedCity: city });
      setSelectedCity(city);
      setChatId(city);
    }
  };

  useEffect(() => {
    if (userEmail && checkGeolocationSupport()) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
  }, [userEmail]);

  return (
    <Container>
      <div className="text-center">
        <h1 className="mt-4">Welcome to the Home Page</h1>
        <p>A geo-locational based chat prototype app</p>
      </div>

      {userEmail && (
        <Form>
          <FormGroup>
            <Label for="citySelect">Select a City:</Label>
            <Input
              type="select"
              name="city"
              id="citySelect"
              value={selectedCity}
              onChange={(e) => handleCitySelection(e.target.value)}
            >
              <option value="">Select a city</option>
              <option value="Atlanta">Atlanta</option>
              <option value="SanFrancisco">San Francisco</option>
            </Input>
          </FormGroup>
        </Form>
      )}

      {selectedCity === 'Atlanta' && (
        <Atlanta selectedCity={selectedCity} userEmail={userEmail} />
      )}
      {selectedCity === 'SanFrancisco' && (
        <SanFrancisco selectedCity={selectedCity} userEmail={userEmail} />
      )}
      {selectedCity && <Chat chatId={chatId} />}

      {userLocation && (
        <p>
          Your current location: {userLocation.latitude}, {userLocation.longitude}
          <LocationDisplay latitude={userLocation.latitude} longitude={userLocation.longitude} />
        </p>
      )}
    </Container>
  );
}

export default Home;
