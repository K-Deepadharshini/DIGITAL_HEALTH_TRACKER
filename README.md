🏥 Digital Health Tracker

A Digital Health Tracker is a web-based application that allows users to securely store, manage, and access their medical records in one place.
The platform also provides QR-based emergency access to vital health information, helping doctors and caregivers respond faster in critical situations.

📌 Problem Statement
Most individuals lack a single, secure platform to manage their:
Medical records,
Prescriptions,
Test reports,
Allergies,
Vaccination history
In emergencies, missing or inaccessible records can delay treatment and risk lives. Health data is often scattered across hospitals or locked in paper files, making access and sharing difficult.

💡 Solution
The Digital Health Tracker bridges this gap by offering:
A centralized system to store all health records,
Secure login with consent-based data sharing,
Emergency QR code for instant access to vital medical information,
Easy upload and retrieval of medical documents.

🎯 Objectives
Digitally store and manage personal health records,
Improve emergency response using QR-based health access,
Track medications, vaccinations, and appointments,
Ensure secure authentication and user privacy,
Provide a responsive and user-friendly interface,
Build a scalable system for future healthcare integrations.

🚀 Features
✅ User Registration & Login
✅ Health Profile Management
✅ Upload & View Medical Records (PDF / Images)
✅ QR Code Generation for Emergency Access
✅ Secure & Consent-Based Data Sharing
✅ Notifications & Reminders
✅ Doctor Consultation (Future Scope)

🛠️ Tech Stack
Frontend
HTML,
CSS,
React.js.

Backend
Node.js,
Express.js.

Database
MongoDB

Algorithms Used
Unique User ID Generation,
QR Code Generation linked to health records,
Secure retrieval of health data via QR scan.

Project Structure

DIGITAL-HEALTH-TRACKER
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── dedupController.js
│   │   ├── qrController.js
│   │   └── recordController.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── uploadMiddleware.js
│   ├── models
│   │   ├── User.js
│   │   └── Record.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── dedup.js
│   │   ├── qr.js
│   │   ├── qrRoutes.js
│   │   ├── recordRoutes.js
│   │   ├── records.js
│   │   └── Routes.js
│   ├── utils
│   │   ├── dedupHelper.js
│   │   ├── pdfGenerator.js
│   │   └── qrHelper.js
│   ├── uploads
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── QRCodeDisplay.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HealthProfile.jsx
│   │   │   ├── Emergency.jsx
│   │   │   ├── About.jsx
│   │   │   └── FormPage.jsx
│   │   ├── services
│   │   │   ├── api.js
│   │   │   ├── recordService.js
│   │   │   └── userService.js
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
screenshots/
<img width="1280" height="625" alt="image" src="https://github.com/user-attachments/assets/161fa63c-3eb1-439a-8a6e-e1cb162b969d" />
<img width="1280" height="636" alt="image" src="https://github.com/user-attachments/assets/1a7b648d-ffa6-49f5-aafa-68f9f635b654" />
<img width="1280" height="634" alt="image" src="https://github.com/user-attachments/assets/d82f4496-252e-461b-b430-b7b6d006251a" />
<img width="979" height="792" alt="image" src="https://github.com/user-attachments/assets/8de0913c-3853-4363-a02e-fd4756b78484" />
<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/c02aed7c-5962-43bc-b066-6f795170a9fe" />
<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/d8358421-717b-4dfd-85a7-9fc72a203486" />

Developed by Deepadharshini K



