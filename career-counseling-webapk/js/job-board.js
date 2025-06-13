// js/job-board.js
import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const jobsList = document.getElementById("jobsList");
const JOBS_API =
  "https://career-counseling-933c4-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json";

let currentUser = null;
let currentUserRole = null;

// Fetch jobs from Realtime DB
async function fetchJobs() {
  try {
    const res = await fetch(JOBS_API);
    const data = await res.json();
    if (!data) {
      jobsList.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    const jobs = Object.values(data);
    renderJobs(jobs);
  } catch (err) {
    jobsList.innerHTML = "<p>Error loading jobs. Please try again later.</p>";
    console.error("Job fetch error:", err);
  }
}

// Render jobs and conditionally show Apply button
function renderJobs(jobs) {
  jobsList.innerHTML = "";
  jobs.forEach((job) => {
    const jobDiv = document.createElement("div");
    jobDiv.className = "job-card";
    jobDiv.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Type:</strong> ${job.type || "N/A"}</p>
      <p><strong>Salary:</strong> ${job.salary || "N/A"}</p>
      <p>${job.description || ""}</p>
      ${
        currentUser && currentUserRole === "student" && job.applyUrl
          ? `<a href="${job.applyUrl}" target="_blank" class="btn btn-primary">Apply</a>`
          : ""
      }
    `;
    jobsList.appendChild(jobDiv);
  });
}

// Check auth and get role if logged in
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.style.display = "none"; // Hide by default

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  currentUserRole = null;

  if (user) {
    logoutBtn.style.display = "inline-block"; // Show logout button

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        currentUserRole = userDoc.data().role;
      }
    } catch (err) {
      console.error("Failed to fetch user role:", err);
    }
  }

  fetchJobs();
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
});
