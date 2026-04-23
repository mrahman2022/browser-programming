const themeToggle = document.getElementById("theme-toggle");
const lastUpdated = document.getElementById("last-updated");
const loadDataBtn = document.getElementById("load-data-btn");
const apiOutput = document.getElementById("api-output");

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

// why do we use async/await?
// it makes asynchronous code easier to read and write.

// why do we check response.ok?
// to make sure the server returned a successful response before using the data.

// why do we use try/catch?
// to handle errors safely if fetching data fails.

loadDataBtn.addEventListener("click", fetchUserData);

async function fetchUserData() {
    apiOutput.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/2");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const user = await response.json();

        apiOutput.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    } catch (error) {
        apiOutput.innerHTML = `<p>Error loading data.</p>`;
    }
}