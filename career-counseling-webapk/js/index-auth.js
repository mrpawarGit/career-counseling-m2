import { auth } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const dashboardLink = document.getElementById("dashboardLink");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline-block";
      dashboardLink.style.display = "inline-block";
    } else {
      loginLink.style.display = "inline-block";
      logoutBtn.style.display = "none";
      dashboardLink.style.display = "none";
    }
  });

  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.reload(); // Or redirect to login/index
    } catch (err) {
      console.error("Logout failed", err);
    }
  });
});
