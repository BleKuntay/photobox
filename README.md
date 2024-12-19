# PhotoBox

![Node.js](https://img.shields.io/badge/Node.js-v16.17.1-green)
![NestJS](https://img.shields.io/badge/NestJS-v9.0.0-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14-blue)
![GCP](https://img.shields.io/badge/Google%20Cloud-Storage-orange)

## About the Project

PhotoBox is a full-stack web application designed to manage photo files efficiently. Users can:

- Upload photos and organize them into folders.
- Rename, delete, and download photos securely.
- Ensure photo access is restricted to the respective user account.
- Designed with a secure backend using NestJS and PostgreSQL.
- Google Cloud Storage is used for storing photos.

This project

## Built With

- **Frontend**: React.JS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Cloud**: Google Cloud
- **Styling**: TailwindCSS

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
- **Node.js**: v16.x or later
- **PostgreSQL**: v14.x
- **Google Cloud Storage** credentials (service account JSON)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BleKuntay/photobox.git
   cd photobox
   ```
2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
3. Configure environment variables:
   - Create a .env file in the backend folder.
