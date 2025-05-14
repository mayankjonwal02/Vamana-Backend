
# 🧪 Vamana Backend

The **Vamana Backend** is a robust, Dockerized REST API service developed using **Express.js**, created as part of a collaborative initiative between **IIT Jodhpur** and **AIIA Delhi (All India Institute of Ayurveda)**. The project aims to modernize traditional Ayurvedic research and practice through secure, scalable, and interoperable software solutions.

---

## 🔍 Project Overview

**Vamana** is an Ayurvedic therapeutic procedure. This backend system powers the data management, workflow orchestration, and analytics for digitalizing clinical and research data related to Vamana therapy. It is designed to serve a frontend application, research dashboards, and mobile interfaces.

---

## 🏗️ Tech Stack

- **Node.js / Express.js** – Core backend framework for REST API
- **MongoDB / PostgreSQL** *(based on configuration)* – For secure and scalable data storage
- **Docker** – Containerization for consistent deployment across environments
- **JWT** – Optional user authentication mechanism
- **Swagger / Postman** – For API documentation and testing

---

## 🐳 Dockerized Setup

Run the backend in a containerized environment using Docker for consistency across development and production.

### 🛠️ Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### 🧾 Docker Commands

```bash
# Build the Docker image
docker build -t vamana-backend .

# Run the container
docker run -p 5000:5000 vamana-backend
````

Or use Docker Compose:

```bash
docker-compose up --build
```

---

## 📁 Project Structure

```
vamana-backend/
├── src/
│   ├── routes/           # All API route definitions
│   ├── controllers/      # Business logic for each route
│   ├── models/           # MongoDB/PostgreSQL schemas
│   ├── middleware/       # Auth, logging, etc.
│   └── index.js          # Entry point of the Express server
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🌐 API Endpoints

A few example endpoints:

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/patients`    | Fetch all patient records   |
| POST   | `/api/patients`    | Create a new patient entry  |
| GET    | `/api/vamana/logs` | Fetch Vamana therapy logs   |
| POST   | `/api/vamana/logs` | Submit a new therapy record |

➡️ API documentation can be accessed via Swagger (if integrated) or through a provided Postman collection.

---

## 🏛️ Institutional Collaboration

This project is a result of academic and clinical collaboration between:

* **Indian Institute of Technology (IIT) Jodhpur** – Tech development & AI integration
* **All India Institute of Ayurveda (AIIA), New Delhi** – Clinical expertise, data provisioning & validation

Together, the institutions aim to digitize Ayurvedic protocols for scalable and scientific exploration.

---

## 🔒 Security & Privacy

* Implements secure practices for handling patient and clinical data
* JWT authentication for authorized access *(optional)*
* HTTPS recommended for production deployments
* Follows data compliance standards in healthcare IT

---

## 📌 Future Enhancements

* Integration with national health data systems (ABDM)
* Advanced analytics and report generation
* Real-time dashboards for doctors and researchers
* AI-driven insights on Vamana outcomes
* Mobile app connectivity

---

## 🧑‍💻 Developed By

**Mayank Jonwal**
B.Tech AI & Data Science, IIT Jodhpur
Collaborating with AIIA, New Delhi

[LinkedIn](https://www.linkedin.com/in/mayankjonwal) • [GitHub](https://github.com/<your-username>)

---

## 📄 License

This project is currently under institutional collaboration and not yet open-source. For access or partnership inquiries, please contact the project leads at **IIT Jodhpur** or **AIIA Delhi**.


