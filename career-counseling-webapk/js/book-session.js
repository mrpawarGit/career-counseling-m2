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
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const studentSection = document.getElementById("studentSection");
const counselorSection = document.getElementById("counselorSection");

const slotForm = document.getElementById("slotForm");
const slotDateTime = document.getElementById("slotDateTime");
const availableSlots = document.getElementById("availableSlots");
const studentBookings = document.getElementById("studentBookings");
const createdSlots = document.getElementById("createdSlots");
const counselorBookings = document.getElementById("counselorBookings");

let currentUser = null;
let currentRole = null;

// Logout functionality
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = "login.html");

  currentUser = user;
  const userSnap = await getDoc(doc(db, "users", user.uid));
  currentRole = userSnap.data().role;

  if (currentRole === "student") {
    studentSection.classList.remove("hidden");
    loadAvailableSlots();
    loadStudentBookings();
  } else if (currentRole === "counselor") {
    counselorSection.classList.remove("hidden");
    loadCreatedSlots();
    loadCounselorBookings();
  }
});

// Counselor: Create Slot
if (slotForm) {
  slotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const slotTime = slotDateTime.value;

    await addDoc(collection(db, "sessions"), {
      counselorId: currentUser.uid,
      dateTime: slotTime,
      booked: false,
      studentId: null,
    });

    slotForm.reset();
    loadCreatedSlots();
  });
}

// Student: Book Slot
async function bookSlot(slotId) {
  await updateDoc(doc(db, "sessions", slotId), {
    booked: true,
    studentId: currentUser.uid,
  });
  loadAvailableSlots();
  loadStudentBookings();
}

// Load Available Slots for Student
async function loadAvailableSlots() {
  const q = query(collection(db, "sessions"), where("booked", "==", false));
  const snapshot = await getDocs(q);

  availableSlots.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const slot = docSnap.data();
    const div = document.createElement("div");
    div.className = "slot-card";
    div.innerHTML = `
      <p>${new Date(slot.dateTime).toLocaleString()}</p>
      <button onclick="bookSlot('${docSnap.id}')">Book</button>
    `;
    availableSlots.appendChild(div);
  });
}

window.bookSlot = bookSlot;

// Load Student Bookings
async function loadStudentBookings() {
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
}

// Load Counselor Created Slots
async function loadCreatedSlots() {
  const q = query(
    collection(db, "sessions"),
    where("counselorId", "==", currentUser.uid)
  );
  const snapshot = await getDocs(q);

  createdSlots.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const slot = docSnap.data();
    const div = document.createElement("div");
    div.className = `slot-card ${slot.booked ? "booked" : ""}`;
    div.textContent = new Date(slot.dateTime).toLocaleString();
    createdSlots.appendChild(div);
  });
}

// Load Counselor Booked Sessions
async function loadCounselorBookings() {
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
    div.innerHTML = `
      <p>${new Date(slot.dateTime).toLocaleString()}</p>
      <small>Booked by student</small>
    `;
    counselorBookings.appendChild(div);
  });
}
