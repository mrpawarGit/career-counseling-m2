// forum.js
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
const newQuestionSection = document.getElementById("newQuestionSection");
const questionForm = document.getElementById("questionForm");
const logoutBtn = document.getElementById("logoutBtn");
const API_URL = "https://authenticationauthorizat-95a91-default-rtdb.asia-southeast1.firebasedatabase.app/forums.json";

let currentUser = null;
let currentUserRole = null;

// Fetch forum posts
async function fetchPosts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!data) {
      forumContainer.innerHTML = "<p>No posts yet.</p>";
      return;
    }
    const posts = Object.entries(data);
    renderPosts(posts);
  } catch (err) {
    forumContainer.innerHTML = "<p>Error loading forum posts.</p>";
    console.error(err);
  }
}

// Render forum posts and replies
function renderPosts(posts) {
  forumContainer.innerHTML = "";
  posts.forEach(([id, post]) => {
    const postDiv = document.createElement("div");
    postDiv.className = "forum-post";
    const timestamp = new Date(post.timestamp).toLocaleString();

    // Replies HTML
    const repliesHTML = post.replies ? renderReplies(post.replies) : "<p>No replies yet.</p>";

    // Only counselors can reply
    let replySection = "";
    if (currentUser && currentUserRole === "counselor") {
      replySection = `
        <textarea class="reply-textarea" data-postid="${id}" rows="2" placeholder="Write a reply..."></textarea>
        <button class="reply-btn" data-postid="${id}">Reply</button>
      `;
    }

    postDiv.innerHTML = `
      <h3>${post.question}</h3>
      <p><strong>By:</strong> ${post.author} (${post.role}) | ${timestamp}</p>
      <div class="replies">
        <h4>Replies</h4>
        ${repliesHTML}
      </div>
      ${replySection}
      <hr />
    `;

    forumContainer.appendChild(postDiv);
  });
}

// Render replies
function renderReplies(repliesObj) {
  return Object.values(repliesObj)
    .map(
      (reply) => `
      <div class="reply">
        <p><strong>${reply.author}:</strong> ${reply.message}</p>
        <small>${new Date(reply.timestamp).toLocaleString()}</small>
      </div>
    `
    )
    .join("");
}

// Submit a reply (event delegation)
forumContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("reply-btn")) {
    const postId = e.target.getAttribute("data-postid");
    const textarea = forumContainer.querySelector(`.reply-textarea[data-postid="${postId}"]`);
    const message = textarea.value.trim();

    if (!message) {
      alert("Reply cannot be empty.");
      return;
    }

    const reply = {
      author: currentUser.displayName || currentUser.email,
      message,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch(
        `https://authenticationauthorizat-95a91-default-rtdb.asia-southeast1.firebasedatabase.app/forums/${postId}/replies.json`,
        {
          method: "POST",
          body: JSON.stringify(reply),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        textarea.value = "";
        fetchPosts(); // Refresh posts
      } else {
        throw new Error("Failed to post reply.");
      }
    } catch (err) {
      console.error("Reply error:", err);
      alert("Failed to post reply. Try again.");
    }
  }
});

// Handle new question submission (students only)
if (questionForm) {
  questionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const questionInput = document.getElementById("questionInput");
    const question = questionInput.value.trim();
    if (!question) {
      alert("Question cannot be empty.");
      return;
    }
    const post = {
      author: currentUser.displayName || currentUser.email,
      question,
      role: currentUserRole,
      timestamp: Date.now(),
    };
    try {
      const response = await fetch(
        "https://authenticationauthorizat-95a91-default-rtdb.asia-southeast1.firebasedatabase.app/forums.json",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        questionInput.value = "";
        fetchPosts();
      } else {
        throw new Error("Failed to post question.");
      }
    } catch (err) {
      console.error("Question post error:", err);
      alert("Failed to post question. Try again.");
    }
  });
}

// Check authentication and role

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  currentUserRole = null;
  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    if (user) {
      loginLink.style.display = "none";
      // Or: loginLink.remove();
    } else {
      loginLink.style.display = "inline-block";
    }
  }

  if (user) {
    try {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        currentUserRole = userSnap.data().role;
      }
    } catch (err) {
      console.error("User role fetch error:", err);
    }
  }

  // Show/hide "Ask a Question" section for students
  if (newQuestionSection) {
    newQuestionSection.style.display = user && currentUserRole === "student" ? "block" : "none";
  }

  // Show/hide logout button
  if (logoutBtn) {
    logoutBtn.style.display = user ? "inline-block" : "none";
    logoutBtn.onclick = async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        window.location.href = "index.html";
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
  }

  fetchPosts();
});
