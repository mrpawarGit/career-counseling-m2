//cs/theme.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.innerText = savedTheme === "dark" ? "🌙" : "☀️";
    toggleBtn.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      toggleBtn.innerText = newTheme === "dark" ? "🌙" : "☀️";
    });
  }
});
