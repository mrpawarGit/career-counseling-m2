import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// DOM Elements
const logoutBtn = document.getElementById("logoutBtn");
const availableSlots = document.getElementById("availableSlots");
const studentBookings = document.getElementById("studentBookings");

let currentUser = null;

// Logout Functionality
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error signing out: ", error);
  }
});

// Authentication State Observer
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;
  try {
    const userSnap = await getDoc(doc(db, "users", user.uid));
    if (userSnap.exists) {
      loadAvailableSlots();
      loadStudentBookings();
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
});

// Student: Book Slot
async function bookSlot(slotId) {
  try {
    await updateDoc(doc(db, "sessions", slotId), {
      booked: true,
      studentId: currentUser.uid,
    });
    loadAvailableSlots();
    loadStudentBookings();
  } catch (error) {
    console.error("Error booking slot: ", error);
  }
}

// Load Available Slots for Student
async function loadAvailableSlots() {
  try {
    const q = query(collection(db, "sessions"), where("booked", "==", false));
    const snapshot = await getDocs(q);

    availableSlots.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const slot = docSnap.data();
      if (slot.counselorId !== currentUser.uid) {
        const div = document.createElement("div");
        div.className = "slot-card";
        div.innerHTML = `
          <p>${new Date(slot.dateTime).toLocaleString()}</p>
          <button onclick="bookSlot('${docSnap.id}')">Book</button>
        `;
        availableSlots.appendChild(div);
      }
    });
  } catch (error) {
    console.error("Error loading available slots: ", error);
  }
}

// Load Student Bookings
async function loadStudentBookings() {
  try {
    const q = query(
      collection(db, "sessions"),
      where("studentId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);

    studentBookings.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const slot = docSnap.data();
      const div = document.createElement("div");
      div.className = "slot-card booked";
      div.textContent = new Date(slot.dateTime).toLocaleString();
      studentBookings.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading student bookings: ", error);
  }
}

// Expose bookSlot function to the global scope
window.bookSlot = bookSlot;
