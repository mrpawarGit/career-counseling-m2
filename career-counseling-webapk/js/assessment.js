// js/assessment.js
import { auth, db } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("assessmentForm");
const resultDiv = document.getElementById("assessmentResult");

let currentUser = null;

// Ensure user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }
});

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Gather answers
    const answers = [
      form.q1.value,
      form.q2.value,
      form.q3.value,
    ];

    // Simple scoring
    const counts = { tech: 0, people: 0, creative: 0 };
    answers.forEach((ans) => counts[ans]++);

    // Determine result
    let result;
    if (counts.tech >= 2) result = "Technology & Engineering";
    else if (counts.people >= 2) result = "People & Counseling";
    else if (counts.creative >= 2) result = "Creative & Design";
    else result = "A mix of interests! Explore more career paths.";

    // Show result
    resultDiv.innerHTML = `<h4>Your Suggested Career Path: ${result}</h4>`;

    // Save to Firestore under "assessments" collection
    if (currentUser) {
      try {
        await setDoc(doc(db, "assessments", currentUser.uid), {
          answers,
          result,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error saving assessment:", err);
      }
    }
    form.reset();
  });
}
