import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Form elements
const form = document.getElementById("editProfileForm");
const educationInput = document.getElementById("education");
const institutionInput = document.getElementById("institution");
const graduationYearInput = document.getElementById("graduationYear");
const locationInput = document.getElementById("location");
const linkedinInput = document.getElementById("linkedin");
const interestsSelect = document.getElementById("interests");
const careerGoalsInput = document.getElementById("careerGoals");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      educationInput.value = data.education || "";
      institutionInput.value = data.institution || "";
      graduationYearInput.value = data.graduationYear || "";
      locationInput.value = data.location || "";
      linkedinInput.value = data.linkedin || "";
      careerGoalsInput.value = data.careerGoals || "";

      if (Array.isArray(data.interests)) {
        [...interestsSelect.options].forEach((option) => {
          if (data.interests.includes(option.value)) {
            option.selected = true;
          }
        });
      }
    }
  } else {
    window.location.href = "login.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("User not authenticated.");
    return;
  }

  const interests = Array.from(interestsSelect.selectedOptions).map(
    (opt) => opt.value
  );

  const updatedData = {
    education: educationInput.value.trim(),
    institution: institutionInput.value.trim(),
    graduationYear: graduationYearInput.value.trim(),
    location: locationInput.value.trim(),
    linkedin: linkedinInput.value.trim(),
    interests,
    careerGoals: careerGoalsInput.value.trim(),
  };

  try {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, updatedData, { merge: true });
    alert("Profile updated successfully!");
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Error updating profile:", error.message || error);
    alert("Something went wrong while saving your profile.");
  }
});
