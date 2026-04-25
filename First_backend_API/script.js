function getMessage() {
  fetch("http://localhost:3000/api/message")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText =
        `Message: ${data.message} | Course: ${data.course} | Year: ${data.year}`;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function getStudent() {
  fetch("http://localhost:3000/api/student")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText =
        `Name: ${data.name} | Role: ${data.role}`;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}