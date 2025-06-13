import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const forumContainer = document.getElementById("forumPosts");
const API_URL =
  "https://authenticationauthorizat-95a91-default-rtdb.asia-southeast1.firebasedatabase.app/forums.json";
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;
let currentUserRole = null;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  const loginLink = document.getElementById("loginLink");
  if (user) {
    loginLink.style.display = "none";
    try {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        currentUserRole = userSnap.data().role;
        if (currentUserRole === "counselor") {
          fetchPosts();
        } else {
          forumContainer.innerHTML =
            "<p>Access Denied. Only counselors can moderate.</p>";
        }
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  } else {
    loginLink.style.display = "inline-block";
    forumContainer.innerHTML = "<p>Please login to view posts.</p>";
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.style.display = user ? "inline-block" : "none";
    logoutBtn.onclick = async (e) => {
      e.preventDefault();
      await signOut(auth);
      window.location.href = "index.html";
    };
  }
});

async function fetchPosts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!data) {
      forumContainer.innerHTML = "<p>No posts available.</p>";
      return;
    }

    const posts = Object.entries(data);
    forumContainer.innerHTML = "";

    posts.forEach(([id, post]) => {
      const postDiv = document.createElement("div");
      postDiv.className = "forum-post";

      const timestamp = new Date(post.timestamp).toLocaleString();
      postDiv.innerHTML = `
        <h3>${post.question}</h3>
        <p><strong>By:</strong> ${post.author} (${post.role}) | ${timestamp}</p>
        <button class="delete-btn" data-id="${id}">Delete🗑️</button>
      `;
      forumContainer.appendChild(postDiv);
    });
  } catch (err) {
    forumContainer.innerHTML = "<p>Error loading posts.</p>";
    console.error(err);
  }
}

// Delete post
forumContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `https://authenticationauthorizat-95a91-default-rtdb.asia-southeast1.firebasedatabase.app/forums/${id}.json`,
        { method: "DELETE" }
      );
      if (res.ok) {
        fetchPosts();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      alert("Error deleting post.");
      console.error(err);
    }
  }
});
