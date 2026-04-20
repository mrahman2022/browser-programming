console.log("Portfolio page JavaScript loaded successfully.");

const pageTitle = document.title;
const userName = "Mahfuzur Rahaman";
let currentTheme = "light";
let clickCount = 0;
const today = new Date();

console.log("Page title:", pageTitle);
console.log("User name:", userName);
console.log("Today's date:", today);

const themeButton = document.getElementById("theme-button");
const contactButton = document.getElementById("contact-button");
const statusMessage = document.getElementById("status-message");

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    if (currentTheme === "light") {
        currentTheme = "dark";
    } else {
        currentTheme = "light";
    }

    clickCount++;

    console.log("Theme changed to:", currentTheme);
    console.log("Total clicks:", clickCount);

    statusMessage.textContent =
        "Current theme: " + currentTheme + " | Total clicks: " + clickCount;
}

function showContactInfo() {
    clickCount++;

    alert("Email: mahfuzur_rahaman@outlook.com\nLinkedIn: linkedin.com/in/md-mahfuzur-rahaman-b4b6b22a7");

    console.log("Contact button clicked.");
    console.log("Total clicks:", clickCount);

    statusMessage.textContent =
        "Contact information shown. Total clicks: " + clickCount;
}

themeButton.addEventListener("click", toggleTheme);
contactButton.addEventListener("click", showContactInfo);

statusMessage.textContent =
    "Today is: " + today.toDateString() + " | Current theme: " + currentTheme;