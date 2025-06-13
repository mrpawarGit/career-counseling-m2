import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const fullNameInput = document.getElementById("fullNameInput");
const interestsInput = document.getElementById("interestsInput");
const careerGoalsInput = document.getElementById("careerGoalsInput");
const expertiseInput = document.getElementById("expertiseInput");
const studentFields = document.getElementById("studentFields");
const counselorFields = document.getElementById("counselorFields");

let currentUID = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUID = user.uid;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      fullNameInput.value = data.fullName || "";
      interestsInput.value = data.interests || "";

      if (data.role === "student") {
        studentFields.style.display = "block";
        careerGoalsInput.value = data.careerGoals || "";
      } else if (data.role === "counselor") {
        counselorFields.style.display = "block";
        expertiseInput.value = data.expertise || "";
      }
    }
  } else {
    window.location.href = "login.html";
  }
});

document
  .getElementById("editProfileForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const updates = {
      fullName: fullNameInput.value.trim(),
      interests: interestsInput.value.trim(),
    };

    if (studentFields.style.display === "block") {
      updates.careerGoals = careerGoalsInput.value.trim();
    } else if (counselorFields.style.display === "block") {
      updates.expertise = expertiseInput.value.trim();
    }

    try {
      await updateDoc(doc(db, "users", currentUID), updates);
      alert("Profile updated successfully!");
      window.location.href = "profile.html";
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong. Please try again.");
    }
  });

// Logout button
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
