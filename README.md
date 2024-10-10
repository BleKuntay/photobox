# PhotoBox

PhotoBox is a photo storage application with a web-based UI and a backend API to manage and store photos. This project is divided into two main parts: the UI and the API.

## Folder Structure
- `PhotoBox-UI/` - Contains the source code for the user interface (frontend) of the application.
- `PhotoBox-API/` - Contains the source code for the backend server and API that supports the application's functionality.

## Key Features
- **UI**: An intuitive user interface to upload, view, and manage photos.
- **API**: Backend API for performing CRUD (Create, Read, Update, Delete) operations on photos.

## Technologies Used
- **Frontend**: [React/Tailwind/DaisyUI]
- **Backend**: [Node.js/Express/Prisma]
- **Database**: [PostgreSQL]

## Installation and Usage

### Prerequisites
- Node.js version 14 or newer
- Git
- A compatible database (e.g., PostgreSQL or MySQL)

### Installation Steps
1. Clone this repository:
``` bash
   git clone https://github.com/BleKuntay/PhotoBox.git
   cd PhotoBox
```
2. Install UI:
``` bash
    cd PhotoBox-UI
    npm install
    npm start
```
3. Install API:
``` bash
    cd ../PhotoBox-API
    npm install
    npm run dev
```
