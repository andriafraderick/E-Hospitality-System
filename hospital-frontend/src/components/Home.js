import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <div className="text-center mb-5">
            <h1 className="display-3 fw-bold text-white mb-4">
              <i className="bi bi-hospital me-3"></i>
              E-Hospitality System
            </h1>
            <p className="lead text-white fs-4">
              Complete Healthcare Management Solution
            </p>
          </div>

          <div className="row g-4 mt-4">
            {/* Patient Module Card */}
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-person-heart" style={{fontSize: '4rem', color: '#667eea'}}></i>
                  </div>
                  <h3 className="card-title mb-3">Patient Module</h3>
                  <p className="card-text mb-4">
                    Register patients, manage medical history, book appointments, handle billing and access health resources.
                  </p>
                  <Link to="/patient" className="btn btn-primary w-100">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Access Portal
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin Module Card */}
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-shield-plus" style={{fontSize: '4rem', color: '#f5576c'}}></i>
                  </div>
                  <h3 className="card-title mb-3">Admin Module</h3>
                  <p className="card-text mb-4">
                    Manage users, facilities, appointments, doctors and oversee all hospital operations.
                  </p>
                  <Link to="/admin" className="btn btn-warning w-100">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Access Panel
                  </Link>
                </div>
              </div>
            </div>

            {/* Doctor Module Card */}
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-clipboard2-pulse" style={{fontSize: '4rem', color: '#38ef7d'}}></i>
                  </div>
                  <h3 className="card-title mb-3">Doctor Module</h3>
                  <p className="card-text mb-4">
                    Access patient records, add medical history, view appointments and manage treatments.
                  </p>
                  <Link to="/doctor" className="btn btn-success w-100">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Access Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="stat-card">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Available Support</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure & Private</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
                <span className="stat-number">Fast</span>
                <span className="stat-label">Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;