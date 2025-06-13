
# 🎓 Career Counseling Platform - Web App

A full-featured, responsive **Career Counseling Web Application** built using **HTML, CSS, JavaScript, and Firebase**. This platform helps students explore career options, take assessments, connect with counselors, participate in forums, and access career-related resources — all in one place.

---

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (DOM, Fetch API)
- **Backend & Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Other Concepts**: Debouncing, Throttling, LocalStorage, Modular JS

---

## ✨ Features

### 👥 Authentication & Roles
- User registration & login using Firebase Auth
- Role-based access: **Student** and **Counselor**

### 🧠 Career Assessment
- Category-based interest quizzes (Tech, People, Creative)
- Results saved to Firestore and used for recommendations

### 🧑‍🏫 Counselor Matching & Booking
- Students get matched to counselors based on interests
- Counselors can create/manage available time slots
- Students can view and book counseling sessions

### 💬 Community Forum
- Forum for students to ask questions or start discussions
- Counselors can moderate and delete inappropriate posts

### 💼 Job Board
- Browse job listings and internships
- Filter by job type or location

### 📊 Dynamic Dashboard
- Role-specific views and content
- Real-time data updates and display

---

## 📁 Project Structure

```
career-counseling-platform/
│
├── css/
│   └── style.css, dashboard.css, etc.
├── js/
│   └── firebase-config.js, auth.js, dashboard.js, ...
├── images/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── forum.html
├── assessment.html
├── profile.html
├── job-board.html
└── book-session.html
```

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/mrpawarGit/career-counseling-m2.git
   cd career-counseling-webapk
   ```

2. **Set up Firebase**
   - Create a project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** and **Firestore**
   - Replace credentials in `js/firebase-config.js`

3. **Open in browser**
   - Launch `index.html` using Live Server or by double-clicking.

---

## 📌 Status

✅ MVP Completed  
🔄 Actively working on enhancements:  
- Resume upload & file manager  
- Chat with counselor  
- Progress reports & analytics  

---



