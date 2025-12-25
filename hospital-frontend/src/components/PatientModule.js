import React, { useState, useEffect } from 'react';
import { getPatients, createPatient, getMedicalHistory, createMedicalHistory, 
         getAppointments, createAppointment, getBilling, createBilling } from './api';

function PatientModule() {
  const [activeTab, setActiveTab] = useState('register');
  const [patients, setPatients] = useState([]);
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Patient Form State
  const [patientForm, setPatientForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    address: '',
    blood_group: '',
    emergency_contact: ''
  });

  // Appointment Form State
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '',
    doctor_name: '',
    department: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    status: 'Scheduled'
  });

  // Load data when tab changes
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'register' || activeTab === 'appointments') {
        const response = await getPatients();
        setPatients(response.data);
      }
      if (activeTab === 'medical-history') {
        const response = await getMedicalHistory();
        setMedicalHistories(response.data);
      }
      if (activeTab === 'appointments') {
        const response = await getAppointments();
        setAppointments(response.data);
      }
      if (activeTab === 'billing') {
        const response = await getBilling();
        setBillings(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPatient(patientForm);
      showMessage('success', 'Patient registered successfully!');
      setPatientForm({
        first_name: '', last_name: '', email: '', phone: '',
        date_of_birth: '', gender: 'Male', address: '', blood_group: '', emergency_contact: ''
      });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to register patient. Please try again.');
    }
    setLoading(false);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(appointmentForm);
      showMessage('success', 'Appointment booked successfully!');
      setAppointmentForm({
        patient: '', doctor_name: '', department: '',
        appointment_date: '', appointment_time: '', reason: '', status: 'Scheduled'
      });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to book appointment.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card">
            <div className="module-header">
              <h2 className="mb-0">
                <i className="bi bi-person-heart me-3"></i>
                Patient Module
              </h2>
            </div>

            <div className="card-body p-4">
              {/* Tabs */}
              <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                  >
                    <i className="bi bi-person-plus me-2"></i>Register Patient
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('appointments')}
                  >
                    <i className="bi bi-calendar-check me-2"></i>Appointments
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'medical-history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('medical-history')}
                  >
                    <i className="bi bi-file-medical me-2"></i>Medical History
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'billing' ? 'active' : ''}`}
                    onClick={() => setActiveTab('billing')}
                  >
                    <i className="bi bi-receipt me-2"></i>Billing
                  </button>
                </li>
              </ul>

              {/* Message Alert */}
              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible`}>
                  <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'x-circle'} me-2`}></i>
                  {message.text}
                  <button type="button" className="btn-close" onClick={() => setMessage({type: '', text: ''})}></button>
                </div>
              )}

              {/* Register Tab */}
              {activeTab === 'register' && (
                <div>
                  <h4 className="mb-4">Register New Patient</h4>
                  <form onSubmit={handlePatientSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={patientForm.first_name}
                          onChange={(e) => setPatientForm({...patientForm, first_name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={patientForm.last_name}
                          onChange={(e) => setPatientForm({...patientForm, last_name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={patientForm.email}
                          onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={patientForm.phone}
                          onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Date of Birth *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={patientForm.date_of_birth}
                          onChange={(e) => setPatientForm({...patientForm, date_of_birth: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Gender *</label>
                        <select
                          className="form-select"
                          value={patientForm.gender}
                          onChange={(e) => setPatientForm({...patientForm, gender: e.target.value})}
                          required
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Blood Group</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., A+"
                          value={patientForm.blood_group}
                          onChange={(e) => setPatientForm({...patientForm, blood_group: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={patientForm.address}
                        onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Emergency Contact</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={patientForm.emergency_contact}
                        onChange={(e) => setPatientForm({...patientForm, emergency_contact: e.target.value})}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      <i className="bi bi-person-plus me-2"></i>
                      {loading ? 'Registering...' : 'Register Patient'}
                    </button>
                  </form>

                  {/* Patient List */}
                  <hr className="my-5"/>
                  <h4 className="mb-4">Registered Patients</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>DOB</th>
                          <th>Blood Group</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.map(patient => (
                          <tr key={patient.id}>
                            <td>{patient.first_name} {patient.last_name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.date_of_birth}</td>
                            <td><span className="badge bg-info">{patient.blood_group || 'N/A'}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div>
                  <h4 className="mb-4">Book Appointment</h4>
                  <form onSubmit={handleAppointmentSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Select Patient *</label>
                        <select
                          className="form-select"
                          value={appointmentForm.patient}
                          onChange={(e) => setAppointmentForm({...appointmentForm, patient: e.target.value})}
                          required
                        >
                          <option value="">Choose patient...</option>
                          {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>
                              {patient.first_name} {patient.last_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Doctor Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={appointmentForm.doctor_name}
                          onChange={(e) => setAppointmentForm({...appointmentForm, doctor_name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Department *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={appointmentForm.department}
                          onChange={(e) => setAppointmentForm({...appointmentForm, department: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={appointmentForm.appointment_date}
                          onChange={(e) => setAppointmentForm({...appointmentForm, appointment_date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Time *</label>
                        <input
                          type="time"
                          className="form-control"
                          value={appointmentForm.appointment_time}
                          onChange={(e) => setAppointmentForm({...appointmentForm, appointment_time: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Reason for Visit *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={appointmentForm.reason}
                        onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      <i className="bi bi-calendar-check me-2"></i>
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </form>

                  {/* Appointments List */}
                  <hr className="my-5"/>
                  <h4 className="mb-4">Scheduled Appointments</h4>
                  <div className="row">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Dr. {appointment.doctor_name}</h5>
                            <p className="mb-2"><strong>Department:</strong> {appointment.department}</p>
                            <p className="mb-2"><strong>Date:</strong> {appointment.appointment_date}</p>
                            <p className="mb-2"><strong>Time:</strong> {appointment.appointment_time}</p>
                            <p className="mb-2"><strong>Reason:</strong> {appointment.reason}</p>
                            <span className={`badge bg-${appointment.status === 'Completed' ? 'success' : 'primary'}`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical History Tab */}
              {activeTab === 'medical-history' && (
                <div>
                  <h4 className="mb-4">Medical History Records</h4>
                  <div className="row">
                    {medicalHistories.map(history => (
                      <div key={history.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{history.diagnosis}</h5>
                            <p className="mb-2"><strong>Doctor:</strong> Dr. {history.doctor_name}</p>
                            <p className="mb-2"><strong>Visit Date:</strong> {history.visit_date}</p>
                            <p className="mb-2"><strong>Medications:</strong> {history.medications || 'N/A'}</p>
                            <p className="mb-2"><strong>Allergies:</strong> {history.allergies || 'None'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div>
                  <h4 className="mb-4">Billing Information</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Invoice #</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Paid</th>
                          <th>Status</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billings.map(billing => (
                          <tr key={billing.id}>
                            <td><strong>{billing.invoice_number}</strong></td>
                            <td>{billing.service_description}</td>
                            <td>${billing.amount}</td>
                            <td>${billing.amount_paid}</td>
                            <td>
                              <span className={`badge bg-${billing.payment_status === 'Paid' ? 'success' : 'warning'}`}>
                                {billing.payment_status}
                              </span>
                            </td>
                            <td>{billing.due_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default PatientModule;