// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIylQ77rIF6HTvoNxKksKKVX-RTQr0Mvo",
  authDomain: "career-counseling-933c4.firebaseapp.com",
  projectId: "career-counseling-933c4",
  storageBucket: "career-counseling-933c4.appspot.com", // fixed: was ".firebasestorage.app"
  messagingSenderId: "999313969935",
  appId: "1:999313969935:web:d2387cbe06f8d68753247a",
  measurementId: "G-9Y7CBVEWRN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { app, auth, db };
