Anno Test App 5
Overview
Anno Test App 5 is a web application for testing annotated labelled images with color checks and label validation against predefined color sample data. It allows users to upload images, annotate them with labels and colors, validate annotations, and manage comments and errors. The project consists of a backend API and a frontend UI.

Backend: Built with Node.js, Express, TypeScript, and MongoDB (hosted on MongoDB Atlas).
Frontend: Built with Vite, React, TypeScript, React Query, Redux Toolkit, Tailwind CSS V4, and shadcn UI components.

The application supports image navigation, annotation validation, commenting, and error logging, as per the UI sketch provided.
Features

Image Upload and Display: Upload images via the backend API and display them in the frontend with navigation (< and > buttons).
Annotation Validation: Validate image annotations (label and color) against predefined color samples (e.g., "Apple" → "Red").
Comments and Errors: Add comments for images and view validation errors.
Responsive UI: A clean and responsive interface using Tailwind CSS and shadcn components.

Tech Stack
Backend

Node.js: JavaScript runtime for the server.
Express: Web framework for building the API.
TypeScript: Adds type safety to JavaScript.
MongoDB (Atlas): Cloud database for storing images, annotations, comments, and errors.
Mongoose: ODM for MongoDB.
Multer: Middleware for handling file uploads.

Frontend

Vite: Fast build tool for modern web projects.
React: JavaScript library for building the UI.
TypeScript: Type-safe JavaScript.
React Query: Data fetching and state management.
Redux Toolkit: State management for navigation.
Tailwind CSS V4: Utility-first CSS framework.
shadcn UI: Reusable UI components.

Project Structure
anno-test-app-5/
├── backend/ # Backend project
│ ├── src/
│ │ ├── controllers/ # API route handlers
│ │ ├── middleware/ # File upload middleware
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API routes
│ │ ├── server.ts # Main server entry point
│ │ └── seed.ts # Script to seed predefined color samples
│ ├── uploads/ # Directory for uploaded images (excluded from Git)
│ ├── package.json
│ └── .env # Environment variables (excluded from Git)
├── frontend/ # Frontend project
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── lib/ # API functions
│ │ ├── store/ # Redux Toolkit setup
│ │ └── ui/ # shadcn UI components
│ ├── package.json
│ └── vite.config.ts
├── .gitignore # Git ignore file
└── README.md # This file

Prerequisites

Node.js: v16 or higher.
MongoDB Atlas: A MongoDB Atlas account and cluster for the database.
Git: For cloning the repository.
Postman: (Optional) For testing API endpoints.

Setup Instructions

1. Clone the Repository
   git clone https://github.com/nagArjun-009/anno-test-app-5.git
   cd anno-test-app-5

2. Backend Setup

Navigate to the Backend Directory:
cd backend

Install Dependencies:
npm install

Set Up Environment Variables:

Create a .env file in the backend directory:echo "PORT=8000" > .env
echo "MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/annotation_db?retryWrites=true&w=majority" >> .env

Replace <username> and <password> with your MongoDB Atlas credentials.

Seed Predefined Color Samples:

Run the seed script to populate the ColorSample collection:npx ts-node-dev src/seed.ts

This adds sample data like:
Label: "Apple", Color: "Red"
Label: "Sky", Color: "Blue"
Label: "Lemon", Color: "Yellow"

Run the Backend Server:
npx ts-node-dev src/server.ts

The server will run on http://localhost:8000.

3. Frontend Setup

Navigate to the Frontend Directory:
cd ../frontend

Install Dependencies:
npm install

Run the Frontend Development Server:
npm run dev

The frontend will typically run on http://localhost:5173 (or another port if 5173 is in use).

4. Upload Images (Optional)

Use Postman to upload images to the backend:
Request:POST http://localhost:8000/api/images/upload
Content-Type: multipart/form-data

Add a field named image and select an image file (e.g., apple.jpg).

After uploading, the images will be available for annotation in the frontend.

API Documentation
The backend provides the following API endpoints:
Images

GET /api/imagesFetch all images.Response:
[
{ "_id": "someImageId", "filename": "apple.jpg", "path": "uploads/1234567890.jpg", ... }
]

GET /api/images/:idFetch a specific image by ID.Response:
{ "\_id": "someImageId", "filename": "apple.jpg", "path": "uploads/1234567890.jpg", ... }

POST /api/images/uploadUpload an image.Request: multipart/form-data with field image.Response:
{ "\_id": "someImageId", "filename": "apple.jpg", "path": "uploads/1234567890.jpg", ... }

Annotations

POST /api/images/validateValidate an annotation (label and color) against predefined color samples.Request:{
"imageId": "someImageId",
"label": "Apple",
"color": "Red"
}

Response (Success):{
"message": "Validation successful",
"annotation": { "\_id": "someAnnotationId", "imageId": "someImageId", "label": "Apple", "color": "Red", ... }
}

Response (Error):{
"message": "Validation failed",
"error": { "error": "Color mismatch. Expected: Red, Got: Green", ... }
}

Comments

POST /api/images/commentAdd a comment for an image.Request:
{
"imageId": "someImageId",
"reviewerId": "reviewer1",
"comment": "Looks good!"
}

Response:
{ "\_id": "someCommentId", "imageId": "someImageId", "reviewerId": "reviewer1", "comment": "Looks good!", ... }

GET /api/images/comments/:imageIdFetch comments for an image.Response:
[
{ "_id": "someCommentId", "imageId": "someImageId", "reviewerId": "reviewer1", "comment": "Looks good!", ... }
]

Errors

GET /api/images/errors/:imageIdFetch validation errors for an image.Response:[
{ "_id": "someErrorId", "imageId": "someImageId", "annotationId": "someAnnotationId", "error": "Color mismatch...", ... }
]

Usage

Start the Backend and Frontend:
Follow the setup instructions above to run both servers.

Upload Images:
Use Postman to upload images to http://localhost:8000/api/images/upload.

Access the Frontend:
Open http://localhost:5173 (or the port shown by Vite).
Navigate through images using the < and > buttons.
Enter a label and color, then click "Validate" to check against predefined color samples.
Add comments and view errors in the respective sections.

Future Improvements

Add file upload functionality to the frontend.
Implement user authentication for reviewers.
Improve error handling with toast notifications in the frontend.
Deploy the application (e.g., backend to Render, frontend to Vercel).
Set up CI/CD with GitHub Actions for automated testing and deployment.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Last updated: May 19, 2025, 12:18 AM IST
