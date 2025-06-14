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
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("page-content").style.display = "block";
  }
}

async function simulateLoading() {
  return new Promise((res) => setTimeout(res, 700));
}
