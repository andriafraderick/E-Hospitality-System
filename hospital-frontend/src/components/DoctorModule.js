import React, { useState, useEffect } from 'react';
import { getPatients, getMedicalHistory, createMedicalHistory, getAppointments } from './api';

function DoctorModule() {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [medicalForm, setMedicalForm] = useState({
    patient: '', diagnosis: '', medications: '', allergies: '',
    treatment_history: '', doctor_name: '', visit_date: '', notes: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const patientsRes = await getPatients();
      setPatients(patientsRes.data);
      
      if (activeTab === 'records') {
        const historyRes = await getMedicalHistory();
        setMedicalHistories(historyRes.data);
      } else if (activeTab === 'appointments') {
        const appointmentsRes = await getAppointments();
        setAppointments(appointmentsRes.data);
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

  const handleMedicalSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedicalHistory(medicalForm);
      showMessage('success', 'Medical record added!');
      setMedicalForm({ patient: '', diagnosis: '', medications: '', allergies: '', treatment_history: '', doctor_name: '', visit_date: '', notes: '' });
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to add record');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card">
            <div className="module-header" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
              <h2 className="mb-0">
                <i className="bi bi-clipboard2-pulse me-3"></i>
                Doctor Portal
              </h2>
            </div>

            <div className="card-body p-4">
              <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>
                    <i className="bi bi-people me-2"></i>Patients
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
                    <i className="bi bi-file-medical me-2"></i>Add Record
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
                    <i className="bi bi-calendar-check me-2"></i>Appointments
                  </button>
                </li>
              </ul>

              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                  {message.text}
                </div>
              )}

              {/* Patients Tab */}
              {activeTab === 'patients' && (
                <div>
                  <h4 className="mb-4">Patient Records</h4>
                  <div className="row">
                    {patients.map(patient => (
                      <div key={patient.id} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{patient.first_name} {patient.last_name}</h5>
                            <p className="mb-1"><strong>Email:</strong> {patient.email}</p>
                            <p className="mb-1"><strong>Phone:</strong> {patient.phone}</p>
                            <p className="mb-1"><strong>DOB:</strong> {patient.date_of_birth}</p>
                            <p className="mb-1"><strong>Gender:</strong> {patient.gender}</p>
                            <span className="badge bg-info">{patient.blood_group || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Medical Record Tab */}
              {activeTab === 'records' && (
                <div>
                  <h4 className="mb-4">Add Medical Record</h4>
                  <form onSubmit={handleMedicalSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Select Patient *</label>
                        <select className="form-select" value={medicalForm.patient}
                          onChange={(e) => setMedicalForm({...medicalForm, patient: e.target.value})} required>
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
                        <input type="text" className="form-control" value={medicalForm.doctor_name}
                          onChange={(e) => setMedicalForm({...medicalForm, doctor_name: e.target.value})} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Diagnosis *</label>
                        <input type="text" className="form-control" value={medicalForm.diagnosis}
                          onChange={(e) => setMedicalForm({...medicalForm, diagnosis: e.target.value})} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Visit Date *</label>
                        <input type="date" className="form-control" value={medicalForm.visit_date}
                          onChange={(e) => setMedicalForm({...medicalForm, visit_date: e.target.value})} required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Medications</label>
                      <textarea className="form-control" rows="2" value={medicalForm.medications}
                        onChange={(e) => setMedicalForm({...medicalForm, medications: e.target.value})}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Allergies</label>
                      <textarea className="form-control" rows="2" value={medicalForm.allergies}
                        onChange={(e) => setMedicalForm({...medicalForm, allergies: e.target.value})}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Treatment History *</label>
                      <textarea className="form-control" rows="3" value={medicalForm.treatment_history}
                        onChange={(e) => setMedicalForm({...medicalForm, treatment_history: e.target.value})} required></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" value={medicalForm.notes}
                        onChange={(e) => setMedicalForm({...medicalForm, notes: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                      <i className="bi bi-file-medical me-2"></i>Add Medical Record
                    </button>
                  </form>

                  <hr className="my-5"/>
                  <h4 className="mb-4">Recent Medical Records</h4>
                  <div className="row">
                    {medicalHistories.map(history => (
                      <div key={history.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{history.diagnosis}</h5>
                            <p className="mb-1"><strong>Doctor:</strong> Dr. {history.doctor_name}</p>
                            <p className="mb-1"><strong>Visit:</strong> {history.visit_date}</p>
                            <p className="mb-1"><strong>Medications:</strong> {history.medications || 'N/A'}</p>
                            <p className="mb-1"><strong>Allergies:</strong> {history.allergies || 'None'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div>
                  <h4 className="mb-4">Today's Appointments</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Patient</th>
                          <th>Doctor</th>
                          <th>Department</th>
                          <th>Reason</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(appointment => (
                          <tr key={appointment.id}>
                            <td><strong>{appointment.appointment_time}</strong></td>
                            <td>{appointment.patient_name}</td>
                            <td>Dr. {appointment.doctor_name}</td>
                            <td>{appointment.department}</td>
                            <td>{appointment.reason}</td>
                            <td><span className={`badge bg-${appointment.status === 'Completed' ? 'success' : 'primary'}`}>{appointment.status}</span></td>
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

export default DoctorModule;