import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Components/Footer';
import { BookingPage } from './pages/BookingPage';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow mt-4 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book/:id" element={<BookingPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
