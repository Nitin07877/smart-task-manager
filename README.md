#  Task Manager App

A full-stack task management system with role-based access, project handling, and real-time task tracking.

---

##  Overview

This application allows teams to manage projects and tasks efficiently.  
Admins can create projects and assign tasks to members, while members can update task progress and track their work.

---

##  Features

- User Authentication (Login / Signup)
-  Role-based access (Admin & Member)
-  Project creation and management
-  Task assignment to specific users
-  Task status updates (Todo, In Progress, Done)
-  Dashboard analytics (Total, Completed, Pending, Overdue)
-  Member-specific task visibility
-  Modern UI with responsive design

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

---

##  Folder Structure
smart-task-manager/
│
├── client/ # Frontend (React)
│ ├── src/
│ │ ├── components/ # Layout & reusable components
│ │ ├── pages/ # Dashboard, Tasks, Projects, Users, Auth
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Backend (Node + Express)
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth middleware
│ ├── config/ # DB connection
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md
