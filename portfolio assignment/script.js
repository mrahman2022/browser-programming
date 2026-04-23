const themeToggle = document.getElementById("theme-toggle");
const lastUpdated = document.getElementById("last-updated");

let isDark = false;

const savedTheme = localStorage.getItem("portfolio_theme");

if (savedTheme === "dark") {
    isDark = true;
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", function () {
    isDark = !isDark;

    if (isDark) {
        document.body.classList.add("dark");
        localStorage.setItem("portfolio_theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("portfolio_theme", "light");
    }
});

const today = new Date();
const formattedDate =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

lastUpdated.textContent = "Last updated: " + formattedDate;