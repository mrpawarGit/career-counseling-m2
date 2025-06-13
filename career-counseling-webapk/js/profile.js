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
const studentOnly = document.getElementById("studentOnly");
const counselorOnly = document.getElementById("counselorOnly");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      fullNameEl.textContent = data.fullName || "N/A";
      emailEl.textContent = user.email;
      roleEl.textContent = data.role || "N/A";
      interestsEl.textContent = data.interests || "N/A";

      if (data.role === "student") {
        studentOnly.style.display = "block";
      } else if (data.role === "counselor") {
        counselorOnly.style.display = "block";
      }
    } else {
      console.log("No user profile found");
    }
  } else {
    window.location.href = "login.html";
  }
});

document.getElementById("editBtn").addEventListener("click", () => {
  window.location.href = "edit-profile.html";
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
