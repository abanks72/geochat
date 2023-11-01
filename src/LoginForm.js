import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './LoginForm.css'; // Import your custom CSS file

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      // Redirect to the homepage after successful login
      window.location.href = '/'; // This will trigger a full page refresh
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <div className="login-container">
      <Form className="login-form">
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
        <Button color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
