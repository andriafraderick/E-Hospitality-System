# E-Hospitality System 🏥

A comprehensive healthcare management platform built with Django REST Framework and React. E-Hospitality provides a complete solution for managing patients, medical records, appointments, billing, and healthcare facilities.



## 🌟 Features

### Patient Module
- **Patient Registration** - Secure registration with comprehensive demographic information
- **Medical History Management** - Complete medical records tracking with diagnoses, medications, and allergies
- **Appointment Booking** - Easy-to-use appointment scheduling system
- **Billing & Payments** - Invoice management and payment processing
- **Health Education Resources** - Access to health tips and educational materials

### Admin Module
- **User Management** - Manage administrators and their permissions
- **Facility Management** - Track and manage hospital facilities and resources
- **Appointment Coordination** - Oversee all appointments across the system
- **Doctor Management** - Add and manage medical staff profiles
- **Analytics Dashboard** - Real-time statistics and insights

### Doctor Module
- **Patient Records** - Complete access to patient information and history
- **Medical Record Creation** - Add diagnoses, prescriptions, and treatment plans
- **Appointment Schedule** - View and manage daily appointments
- **E-Prescribing** - Digital prescription management

## 🎨 Design Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Animated Backgrounds** - Engaging pulse animations and smooth transitions
- **Modern Typography** - Using Poppins and Playfair Display fonts
- **Intuitive Navigation** - Easy-to-use interface with clear visual hierarchy

## 🛠️ Tech Stack

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL / SQLite
- Python 3.10+

### Frontend
- React 18.2
- React Router DOM
- Axios
- Bootstrap 5
- Custom CSS with animations

## 📋 Prerequisites

- Python 3.10 or higher
- Node.js 16 or higher
- PostgreSQL (for production) or SQLite (for development)
- Git

## 🚀 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-hospitality-system.git
   cd e-hospitality-system/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

4. **Start development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 🌐 Deployment to Render

### Backend Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` directory as the root
   - Environment: Python 3
   - Build Command: `./build.sh`
   - Start Command: `gunicorn ehospitality.wsgi:application`

2. **Add Environment Variables**
   ```
   DATABASE_URL=<your-postgresql-url>
   SECRET_KEY=<your-secret-key>
   DEBUG=False
   ALLOWED_HOSTS=.onrender.com
   CORS_ALLOWED_ORIGINS=<your-frontend-url>
   ```

3. **Create a PostgreSQL Database**
   - Add a PostgreSQL database on Render
   - Copy the Internal Database URL
   - Set it as DATABASE_URL in your web service

### Frontend Deployment

1. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Select the `frontend` directory as the root
   - Build Command: `npm run build`
   - Publish Directory: `build`

2. **Add Environment Variable**
   ```
   REACT_APP_API_URL=<your-backend-url>/api
   ```

## 📚 API Documentation

### Patient Endpoints
- `GET /api/patients/` - List all patients
- `POST /api/patients/` - Create new patient
- `GET /api/patients/{id}/` - Get patient details
- `PUT /api/patients/{id}/` - Update patient
- `DELETE /api/patients/{id}/` - Delete patient
- `GET /api/patients/{id}/medical_history/` - Get patient's medical history
- `GET /api/patients/{id}/appointments/` - Get patient's appointments
- `GET /api/patients/{id}/billings/` - Get patient's billing records

### Medical History Endpoints
- `GET /api/medical-history/` - List all medical histories
- `POST /api/medical-history/` - Create medical record
- `GET /api/medical-history/{id}/` - Get medical record details
- `PUT /api/medical-history/{id}/` - Update medical record
- `DELETE /api/medical-history/{id}/` - Delete medical record

### Appointment Endpoints
- `GET /api/appointments/` - List all appointments
- `POST /api/appointments/` - Create appointment
- `GET /api/appointments/{id}/` - Get appointment details
- `PUT /api/appointments/{id}/` - Update appointment
- `POST /api/appointments/{id}/update_status/` - Update appointment status

### Billing Endpoints
- `GET /api/billing/` - List all billings
- `POST /api/billing/` - Create billing record
- `POST /api/billing/{id}/make_payment/` - Process payment

### Health Resources Endpoints
- `GET /api/health-resources/` - List all health resources
- `GET /api/health-resources/categories/` - Get resource categories

### Admin Endpoints
- `GET /api/administrators/` - List all administrators
- `POST /api/administrators/` - Create administrator

### Facility Endpoints
- `GET /api/facilities/` - List all facilities
- `GET /api/facilities/statistics/` - Get facility statistics
- `POST /api/facilities/` - Create facility

### Doctor Endpoints
- `GET /api/doctors/` - List all doctors
- `GET /api/doctors/specializations/` - Get specializations
- `POST /api/doctors/` - Create doctor

## 🗂️ Project Structure

```
e-hospitality-system/
├── backend/
│   ├── ehospitality/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── hospital/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── build.sh
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── PatientModule.js
│   │   │   ├── AdminModule.js
│   │   │   └── DoctorModule.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🔑 Default Credentials

After creating a superuser, you can access:
- Admin Panel: `http://localhost:8000/admin`
- Username: (your created username)
- Password: (your created password)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- Andria Fraderick - Initial work

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- Bootstrap for responsive design
- All contributors who helped with the project

## 📞 Support

For support, open an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Video consultation integration
- [ ] Mobile app (React Native)
- [ ] AI-powered diagnosis assistance
- [ ] Pharmacy integration
- [ ] Laboratory results management
- [ ] Insurance claim processing
- [ ] Multi-language support

---

Made with ❤️ for better healthcare management
