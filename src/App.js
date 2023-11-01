import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <div>
      <Router>
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  {user.email && <span className="nav-link">Welcome, {user.email}</span>}
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
