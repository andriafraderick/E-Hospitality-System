import React, { useState, useEffect } from 'react';
import { getAdministrators, createAdministrator, getFacilities, createFacility, getDoctors, createDoctor } from './api';

function AdminModule() {
  const [activeTab, setActiveTab] = useState('users');
  const [administrators, setAdministrators] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [adminForm, setAdminForm] = useState({
    full_name: '', email: '', phone: '', department: '', role: ''
  });

  const [facilityForm, setFacilityForm] = useState({
    facility_name: '', location: '', department: '', capacity: '', current_occupancy: '0', status: 'Available'
  });

  const [doctorForm, setDoctorForm] = useState({
    full_name: '', email: '', phone: '', specialization: '', department: '', 
    experience_years: '', available_days: '', available_time: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const response = await getAdministrators();
        setAdministrators(response.data);
      } else if (activeTab === 'facilities') {
        const response = await getFacilities();
        setFacilities(response.data);
      } else if (activeTab === 'doctors') {
        const response = await getDoctors();
        setDoctors(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdministrator(adminForm);
      showMessage('success', 'Administrator added!');
      setAdminForm({ full_name: '', email: '', phone: '', department: '', role: '' });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to add administrator');
    }
  };

  const handleFacilitySubmit = async (e) => {
    e.preventDefault();
    try {
      await createFacility(facilityForm);
      showMessage('success', 'Facility added!');
      setFacilityForm({ facility_name: '', location: '', department: '', capacity: '', current_occupancy: '0', status: 'Available' });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to add facility');
    }
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDoctor(doctorForm);
      showMessage('success', 'Doctor added!');
      setDoctorForm({ full_name: '', email: '', phone: '', specialization: '', department: '', experience_years: '', available_days: '', available_time: '' });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to add doctor');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card">
            <div className="module-header" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
              <h2 className="mb-0">
                <i className="bi bi-shield-plus me-3"></i>
                Admin Panel
              </h2>
            </div>

            <div className="card-body p-4">
              <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    <i className="bi bi-people me-2"></i>User Management
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'facilities' ? 'active' : ''}`} onClick={() => setActiveTab('facilities')}>
                    <i className="bi bi-building me-2"></i>Facilities
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
                    <i className="bi bi-person-badge me-2"></i>Doctors
                  </button>
                </li>
              </ul>

              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                  {message.text}
                </div>
              )}

              {/* User Management Tab */}
              {activeTab === 'users' && (
                <div>
                  <h4 className="mb-4">Add Administrator</h4>
                  <form onSubmit={handleAdminSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-control" value={adminForm.full_name} 
                          onChange={(e) => setAdminForm({...adminForm, full_name: e.target.value})} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input type="email" className="form-control" value={adminForm.email}
                          onChange={(e) => setAdminForm({...adminForm, email: e.target.value})} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Phone *</label>
                        <input type="tel" className="form-control" value={adminForm.phone}
                          onChange={(e) => setAdminForm({...adminForm, phone: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Department *</label>
                        <input type="text" className="form-control" value={adminForm.department}
                          onChange={(e) => setAdminForm({...adminForm, department: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Role *</label>
                        <input type="text" className="form-control" value={adminForm.role}
                          onChange={(e) => setAdminForm({...adminForm, role: e.target.value})} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-warning btn-lg">
                      <i className="bi bi-person-plus me-2"></i>Add Administrator
                    </button>
                  </form>

                  <hr className="my-5"/>
                  <h4 className="mb-4">Administrators</h4>
                  <div className="row">
                    {administrators.map(admin => (
                      <div key={admin.id} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{admin.full_name}</h5>
                            <p className="mb-1"><strong>Email:</strong> {admin.email}</p>
                            <p className="mb-1"><strong>Phone:</strong> {admin.phone}</p>
                            <p className="mb-1"><strong>Department:</strong> {admin.department}</p>
                            <span className="badge bg-warning">{admin.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities Tab */}
              {activeTab === 'facilities' && (
                <div>
                  <h4 className="mb-4">Add Facility</h4>
                  <form onSubmit={handleFacilitySubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Facility Name *</label>
                        <input type="text" className="form-control" value={facilityForm.facility_name}
                          onChange={(e) => setFacilityForm({...facilityForm, facility_name: e.target.value})} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Location *</label>
                        <input type="text" className="form-control" value={facilityForm.location}
                          onChange={(e) => setFacilityForm({...facilityForm, location: e.target.value})} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Department *</label>
                        <input type="text" className="form-control" value={facilityForm.department}
                          onChange={(e) => setFacilityForm({...facilityForm, department: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Capacity *</label>
                        <input type="number" className="form-control" value={facilityForm.capacity}
                          onChange={(e) => setFacilityForm({...facilityForm, capacity: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Status *</label>
                        <select className="form-select" value={facilityForm.status}
                          onChange={(e) => setFacilityForm({...facilityForm, status: e.target.value})}>
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-warning btn-lg">
                      <i className="bi bi-building-add me-2"></i>Add Facility
                    </button>
                  </form>

                  <hr className="my-5"/>
                  <h4 className="mb-4">Facilities</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Location</th>
                          <th>Department</th>
                          <th>Capacity</th>
                          <th>Occupancy</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facilities.map(facility => (
                          <tr key={facility.id}>
                            <td>{facility.facility_name}</td>
                            <td>{facility.location}</td>
                            <td>{facility.department}</td>
                            <td>{facility.capacity}</td>
                            <td>{facility.current_occupancy}</td>
                            <td><span className={`badge bg-${facility.status === 'Available' ? 'success' : 'warning'}`}>{facility.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Doctors Tab */}
              {activeTab === 'doctors' && (
                <div>
                  <h4 className="mb-4">Add Doctor</h4>
                  <form onSubmit={handleDoctorSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-control" value={doctorForm.full_name}
                          onChange={(e) => setDoctorForm({...doctorForm, full_name: e.target.value})} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input type="email" className="form-control" value={doctorForm.email}
                          onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Phone *</label>
                        <input type="tel" className="form-control" value={doctorForm.phone}
                          onChange={(e) => setDoctorForm({...doctorForm, phone: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Specialization *</label>
                        <input type="text" className="form-control" value={doctorForm.specialization}
                          onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Department *</label>
                        <input type="text" className="form-control" value={doctorForm.department}
                          onChange={(e) => setDoctorForm({...doctorForm, department: e.target.value})} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Experience (Years) *</label>
                        <input type="number" className="form-control" value={doctorForm.experience_years}
                          onChange={(e) => setDoctorForm({...doctorForm, experience_years: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Available Days *</label>
                        <input type="text" className="form-control" placeholder="Mon,Wed,Fri" value={doctorForm.available_days}
                          onChange={(e) => setDoctorForm({...doctorForm, available_days: e.target.value})} required />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Available Time *</label>
                        <input type="text" className="form-control" placeholder="9:00 AM - 5:00 PM" value={doctorForm.available_time}
                          onChange={(e) => setDoctorForm({...doctorForm, available_time: e.target.value})} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-warning btn-lg">
                      <i className="bi bi-person-plus me-2"></i>Add Doctor
                    </button>
                  </form>

                  <hr className="my-5"/>
                  <h4 className="mb-4">Medical Staff</h4>
                  <div className="row">
                    {doctors.map(doctor => (
                      <div key={doctor.id} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Dr. {doctor.full_name}</h5>
                            <p className="mb-1"><strong>Specialization:</strong> {doctor.specialization}</p>
                            <p className="mb-1"><strong>Department:</strong> {doctor.department}</p>
                            <p className="mb-1"><strong>Experience:</strong> {doctor.experience_years} years</p>
                            <p className="mb-1"><strong>Days:</strong> {doctor.available_days}</p>
                            <p className="mb-1"><strong>Time:</strong> {doctor.available_time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModule;