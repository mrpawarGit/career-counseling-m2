import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// DOM Elements
const logoutBtn = document.getElementById("logoutBtn");
const slotForm = document.getElementById("slotForm");
const slotDateTime = document.getElementById("slotDateTime");
const counselorBookings = document.getElementById("counselorBookings");

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
      loadCounselorBookings();
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
});

// Counselor: Create Slot
if (slotForm) {
  slotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const slotTime = slotDateTime.value;

    try {
      await addDoc(collection(db, "sessions"), {
        counselorId: currentUser.uid,
        dateTime: slotTime,
        booked: false,
        studentId: null,
      });

      slotForm.reset();
      loadCounselorBookings();
    } catch (error) {
      console.error("Error creating slot: ", error);
    }
  });
}

// Load Counselor Booked Sessions
async function loadCounselorBookings() {
  try {
    const q = query(
      collection(db, "sessions"),
      where("counselorId", "==", currentUser.uid),
      where("booked", "==", true)
    );

    const snapshot = await getDocs(q);
    counselorBookings.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const slot = docSnap.data();
      const div = document.createElement("div");
      div.className = "slot-card booked";
      div.textContent = new Date(slot.dateTime).toLocaleString();
      counselorBookings.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading counselor bookings: ", error);
  }
}
