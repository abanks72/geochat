import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app, db } from './firebaseConfig';
import Atlanta from './Atlanta';
import SanFrancisco from './SanFrancisco';
import Chat from './Chat';
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function Home() {
  const [userEmail, setUserEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [chatId, setChatId] = useState('');

  useEffect(() => {
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
  }, []);

  const handleLogout = () => {
    const auth = getAuth(app);

    signOut(auth)
      .then(() => {
        setUserEmail('');
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  const handleCitySelection = async (city) => {
    if (userEmail) {
      const citiesCollectionRef = collection(db, 'users');
      const userDocRef = doc(citiesCollectionRef, userEmail);
      await setDoc(userDocRef, { selectedCity: city });
      setSelectedCity(city);
      setChatId(city);
    }
  };

  return (
    <Container>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {userEmail ? (
            <>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Welcome, {userEmail}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>

      <h1 className="mt-4">Welcome to the Home Page</h1>

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
    </Container>
  );
}

export default Home;
