// Get references to UI elements
const output = document.getElementById("output");
const statusText = document.getElementById("status");

// Helper function to print text
function log(message) {
    output.textContent += message + "\n";
}

// Helper function to clear output
function clearOutput() {
    output.textContent = "";
}

// Helper function to update status
function setStatus(text) {
    statusText.textContent = "Status: " + text;
}

/* ==========================================================
   1) ASYNC TIMEOUT
   ========================================================== */

// This demonstrates that JavaScript does NOT wait.
// setTimeout schedules a task for later.
document.getElementById("btnTimeout").onclick = function () {

    clearOutput();
    log("Start");

    // Changed from 2000 ms to 500 ms
    setTimeout(function () {
        log("Timeout finished after 0.5 seconds");
    }, 500);

    log("End");
};

/* ==========================================================
   2) ASYNC PROMISE
   ========================================================== */

// A Promise represents a value that will arrive in the future.
function waitOneSecond() {

    // We create and return a Promise object.
    return new Promise(function (resolve) {

        // Changed from 1000 ms to 2000 ms
        setTimeout(function () {
            resolve("Promise resolved after 1 second!");
        }, 2000);
    });
}

document.getElementById("btnPromise").onclick = function () {

    clearOutput();
    setStatus("Waiting (Promise)...");

    // .then() runs AFTER the Promise is completed.
    waitOneSecond().then(function (result) {
        log(result);
        setStatus("Idle");
    });
};

/* ==========================================================
   3) ASYNC / AWAIT
   ========================================================== */

// async/await is a modern way to work with Promises.
// It makes asynchronous code look more readable.

async function runAwaitExample() {

    clearOutput();
    setStatus("Please wait, async/await running...");

    log("Before await");

    // 'await' pauses this function until the Promise resolves.
    // It does NOT freeze the browser.
    const result = await waitOneSecond();

    log("After await");
    log(result);
    setStatus("Idle");
}

document.getElementById("btnAwait").onclick = runAwaitExample;

/* ==========================================================
   4) ASYNC FETCH (REAL WORLD)
   ========================================================== */

// Fetch is used to get data from the internet (API).
// It returns a Promise.

async function runFetchExample() {

    clearOutput();
    setStatus("Loading from API...");

    try {

        // Changed URL to force HTTP error
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/999999"
        );

        // Check if HTTP status is OK (200–299)
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Convert response body to JSON (this is also async!)
        const data = await response.json();

        // Changed output
        log("ID: " + data.id);
        log("Title: " + data.title);

    } catch (error) {

        // This runs if network fails or we throw manually
        log("Error: " + error.message);

    } finally {

        // finally always runs (success or error)
        setStatus("Idle");
    }
}

document.getElementById("btnFetch").onclick = runFetchExample;