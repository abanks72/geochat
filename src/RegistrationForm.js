import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Import necessary functions
import { app } from './firebaseConfig';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';


function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    const auth = getAuth(app);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful');
      window.location.href = '/login'; // Replace with your desired route

    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  return (
    <Container className="mt-5">
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" onClick={handleRegistration}>
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
