import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js'
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import SignInPage from './screens/signin.js';
import SignUpPage from './screens/signup.js'

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
