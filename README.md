# 🎵 iTunes Track Feedback App

This project was created as part of the Canadian Sheep Federation Software Developer Internship Assessment 2025. It includes a **RESTful API** and a **web application** that allows users to search songs via the iTunes API, rate them, and view feedback submitted by others.

---

## 📦 Features

- Search songs using the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)
- Submit ratings and comments for tracks
- View all submitted feedback
- Simple RESTful backend with SQLite database
- Clean, responsive frontend UI

---

## 🛠️ Technologies Used

| Layer     | Stack                        |
|-----------|------------------------------|
| Backend   | Node.js, Express.js, SQLite3 |
| Frontend  | HTML, CSS, Vanilla JavaScript |
| Public API| iTunes Search API            |
| Dev Tools | VSCode, Postman, Git         |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/itunes-feedback-app.git
cd itunes-feedback-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the API Server

```bash
node index.js
```

Server will start at: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Frontend

The frontend is served statically from the `/public` directory via Express. To access it:

- Open [http://localhost:3000](http://localhost:3000)
- Use the search bar to find songs
- Submit ratings and comments
- Scroll down to view all previous feedback

---

## 📋 API Endpoints

### `POST /form`
Create a new feedback entry.

**Request Body:**
```json
{
  "username": "Swet",
  "trackId": "123456789",
  "rating": 5,
  "comment": "Great song!"
}
```

### `GET /form`
Returns all feedback entries.

### `GET /form/:id`
Returns a single feedback entry by ID.

---

## 🧠 Extension Ideas

- Add authentication to track user ratings
- Link feedback entries to actual iTunes metadata via `trackId`
- Display song names in the feedback section using caching or backend joins
- Filter or search existing feedback
- Add input validation and rating limits

---

## 🚢 Deployment Considerations

- **Backend**: Can be deployed to platforms like [Render](https://render.com/), [Railway](https://railway.app/), or Heroku.
- **Database**: For production, consider using hosted MongoDB or PostgreSQL instead of SQLite.
- **Frontend**: Can be served by the Express app, or separately via [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

---

## 📎 Folder Structure

```
├── db.js                # Database setup and schema
├── index.js             # Express server and API routes
├── database.sqlite      # SQLite database file
├── public/
│   ├── index.html       # Web UI
│   ├── app.js           # Client-side JS (search + feedback logic)
│   └── style.css        # Stylesheet
```


---

## 🧑‍💻 Author

**Swet Patel**  
Software Developer Intern Applicant  
[GitHub Profile](https://github.com/SwtPtl)

---

## 📜 License

This project is open-source and available for educational/demo purposes.
