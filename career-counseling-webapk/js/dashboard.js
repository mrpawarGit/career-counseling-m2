import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const dashboard = document.getElementById("dashboardContent");
const logoutBtn = document.getElementById("logoutBtn");

// Fetch user role and render dashboard accordingly
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();
  const role = userData?.role;

  if (role === "student") {
    renderStudentDashboard(userData);
  } else if (role === "counselor") {
    renderCounselorDashboard(userData);
  } else {
    dashboard.innerHTML = "<p>Unauthorized access</p>";
  }
});

function renderStudentDashboard(user) {
  dashboard.innerHTML = `
    <h2 style="text-align: center;">Welcome, ${user.fullName}</h2>
    <div class="card-grid">
      <div class="card">
      <a href="explore-careers.html" class="card-link" style="text-decoration:none;">📘 </br>Explore Career Paths </a>
      </div>
      <div class="card">
      <a href="student-booking.html" class="card-link" style="text-decoration:none;">🧑‍🏫 </br>Book Counseling Session </a>
      </div>
      <div class="card">
      <a href="assessment.html" class="card-link" style="text-decoration:none;">📝 </br>Take Assessment </a>
      </div>
      <div class="card">
        <a href="profile.html" class="card-link" style="text-decoration:none;">👤 </br>View Profile</a>
      </div>
    </div>
  `;
}

function renderCounselorDashboard(user) {
  dashboard.innerHTML = `
    <h2 style="text-align: center;">Welcome, Counselor ${user.fullName}</h2>
    <div class="card-grid">
      <div class="card">
      <a href="counselor-booking.html" class="card-link" style="text-decoration:none;">📅 </br>View Booked Sessions </a>
      </div>
      <div class="card">📂 Upload Resources</div>
      <div class="card">
      <a href="forum-moderation.html" class="card-link" style="text-decoration:none;">💬 </br>Forum Moderation </a>
      </div>
      <div class="card">
        <a href="profile.html" class="card-link" style="text-decoration:none;">👤 </br>View Profile</a>
      </div>
    </div>
  `;
}

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
