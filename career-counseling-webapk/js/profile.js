// js/profile.js
import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const fullNameEl = document.getElementById("fullName");
const emailEl = document.getElementById("email");
const roleEl = document.getElementById("role");
const interestsEl = document.getElementById("interests");
const editBtn = document.getElementById("editBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Load profile data
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        fullNameEl.textContent = data.fullName || "N/A";
        emailEl.textContent = user.email;
        roleEl.textContent = data.role || "N/A";
        interestsEl.textContent = data.interests || "N/A";
      } else {
        console.log("No user profile found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    window.location.href = "login.html";
  }
});

// Edit button click
if (editBtn) {
  editBtn.addEventListener("click", () => {
    window.location.href = "edit-profile.html";
  });
}

// Logout and redirect to index.html
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
}
