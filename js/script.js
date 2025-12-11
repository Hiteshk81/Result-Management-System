const form = document.getElementById("resultForm");
const showBtn = document.getElementById("showResultsBtn");
const resultsSection = document.getElementById("resultsSection");
const tableBody = document.querySelector("#resultTable tbody");

// Load records only when user clicks SHOW RESULTS
showBtn.addEventListener("click", function () {
  resultsSection.classList.remove("hidden");
  loadResults();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const marks = document.getElementById("marks").value.trim();

  let valid = true;

  // Clear Errors
  document.getElementById("nameError").textContent = "";
  document.getElementById("rollError").textContent = "";
  document.getElementById("marksError").textContent = "";

  // Validation
  if (!name) { document.getElementById("nameError").textContent = "Name is required"; valid = false; }
  if (!roll) { document.getElementById("rollError").textContent = "Roll number is required"; valid = false; }
  if (marks === "") {
    document.getElementById("marksError").textContent = "Marks are required";
    valid = false;
  } else if (marks < 0 || marks > 100) {
    document.getElementById("marksError").textContent = "Marks must be between 0 and 100";
    valid = false;
  }

  if (!valid) return;

  const data = { name, roll, marks };
  saveToDB(data);

  alert("Result Added Successfully!");

  form.reset();
});

// Save to LocalStorage
function saveToDB(record) {
  let results = JSON.parse(localStorage.getItem("results")) || [];
  results.push(record);
  localStorage.setItem("results", JSON.stringify(results));
}

// Load & Display Results
function loadResults() {
  tableBody.innerHTML = "";
  const results = JSON.parse(localStorage.getItem("results")) || [];

  results.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.name}</td>
      <td>${r.roll}</td>
      <td>${r.marks}</td>
    `;
    tableBody.appendChild(row);
  });
}
