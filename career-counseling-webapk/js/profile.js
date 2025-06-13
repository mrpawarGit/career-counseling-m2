import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const fullName = document.getElementById("fullName");
const role = document.getElementById("role");
const emailEl = document.getElementById("email");
const educationEl = document.getElementById("education");
const institutionEl = document.getElementById("institution");
const graduationYearEl = document.getElementById("graduationYear");
const locationEl = document.getElementById("location");
const linkedinEl = document.getElementById("linkedin");
const interestsEl = document.getElementById("interests");
const careerGoalsEl = document.getElementById("careerGoals");
const editBtn = document.getElementById("editBtn");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      fullName.textContent = data.fullName;
      role.textContent = data.role;
      emailEl.textContent = user.email;
      educationEl.textContent = data.education || "N/A";
      institutionEl.textContent = data.institution || "N/A";
      graduationYearEl.textContent = data.graduationYear || "N/A";
      locationEl.textContent = data.location || "N/A";
      linkedinEl.href = data.linkedin || "#";
      linkedinEl.textContent = data.linkedin ? "View Profile" : "N/A";
      interestsEl.textContent = data.interests?.join(", ") || "N/A";
      careerGoalsEl.textContent = data.careerGoals || "N/A";
    } else {
      alert("No profile data found. Please complete your profile.");
      window.location.href = "edit-profile.html";
    }
  } else {
    window.location.href = "login.html";
  }
});

editBtn.addEventListener("click", () => {
  window.location.href = "edit-profile.html";
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
