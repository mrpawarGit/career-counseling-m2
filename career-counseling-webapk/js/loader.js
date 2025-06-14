document.addEventListener("DOMContentLoaded", () => {
  fetch("loader.html")
    .then((res) => res.text())
    .then((html) => {
      document.body.insertAdjacentHTML("afterbegin", html);
      initPage();
    });
});

async function initPage() {
  try {
    await simulateLoading();
  } finally {
    const loader = document.getElementById("loader-wrapper");
    const content = document.getElementById("page-content");

    if (loader) loader.style.display = "none";
    if (content) content.style.display = "block";
  }
}

async function simulateLoading() {
  return new Promise((res) => setTimeout(res, 700));
}
