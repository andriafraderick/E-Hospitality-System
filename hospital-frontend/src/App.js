import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PatientModule from './components/PatientModule';
import AdminModule from './components/AdminModule';
import DoctorModule from './components/DoctorModule';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)'}}>
          <div className="container-fluid px-4">
            <Link className="navbar-brand fw-bold" to="/">
              <i className="bi bi-heart-pulse-fill me-2"></i>
              E-Hospitality
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-house-door me-1"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patient">
                    <i className="bi bi-person-heart me-1"></i> Patient
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <i className="bi bi-shield-plus me-1"></i> Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor">
                    <i className="bi bi-clipboard2-pulse me-1"></i> Doctor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient" element={<PatientModule />} />
            <Route path="/admin" element={<AdminModule />} />
            <Route path="/doctor" element={<DoctorModule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;