# CSF-Assessment Application

This project is a full-stack web application that allows users to:

- Explore countries using the REST Countries API
- Submit their favorite country with a reason and visitation status
- View submissions by other users for specific countries

It is built using **React** for the frontend, **Express** for the backend, **SQLite** as the database, and **Prisma ORM** for database management.

---

## 1. Features

- 🔍 **Search for Countries:** Real-time search using the REST Countries API  
- 📝 **Submit Favorite Country:** Users can share their favorite country and reasons  
- 🌍 **View Submissions:** See all user submissions per country  
- 📱 **Responsive Design:** Works across mobile and desktop devices  

---

## 2. Screenshots

### 🏠 Homepage  
Allows users to search for countries and view related data.  
![Homepage Screenshot](https://github.com/user-attachments/assets/356c9d52-d682-4062-8452-6f5a020d89ed)

---

### 📝 Form Submission  
Users can submit their favorite country through a form.  
![Form Submission Screenshot](https://github.com/user-attachments/assets/6b8430e2-a893-4256-a7b7-ef46563aea1f)

---

### 📄 Country Submissions  
Shows all submissions for a selected country.  
![Country Submissions Screenshot](https://github.com/user-attachments/assets/53c950b4-3206-4809-bfea-d17d0cd3c2b1)

---

## 3. Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/csf-assessment.git
cd csf-assessment
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory and add the following line:

```env
DATABASE_URL="file:./dev.db"
```

### Step 3: Run the Application

Start the backend and frontend servers concurrently:

```bash
npm run dev
```

---

## 4. Technologies Used
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js/Express.js
- **Database:** SQLite with Prisma ORM  
- **Build Tool:** Vite  
- **API:** REST Countries API

---

## 5. Folder Structure

```
csf-assessment/
├── prisma/            # Prisma schema and migrations
├── backend/               # Express backend logic
│   ├── routes/            # API routes
│   └── server.js          # Entry point
├── public/
├── src/              # React frontend
│   ├── components/        # Reusable React components
│   └── assets/             # Page components
├── .env                   # Environment config
├── package.json
└── README.md
```

---
