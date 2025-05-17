document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("builder").classList.remove("hidden");
});

let eduCount = 0;
let projCount = 0;
let compCount = 0;

function addEducation() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Degree" id="eduDegree${eduCount}">
    <input placeholder="Dates (e.g. Jan 2019 - Dec 2020)" id="eduDates${eduCount}">
    <input placeholder="Location" id="eduLoc${eduCount}">
    <input placeholder="Grade" id="eduGrade${eduCount}">
  `;
  document.getElementById("educationContainer").appendChild(div);
  eduCount++;
}

function addProject() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Project Title" id="projTitle${projCount}">
    <input placeholder="Project Link" id="projLink${projCount}">
    <textarea placeholder="Project Description" id="projDesc${projCount}"></textarea>
  `;
  document.getElementById("projectContainer").appendChild(div);
  projCount++;
}

function addCompany() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Company Title" id="compTitle${compCount}">
    <input placeholder="Dates" id="compDates${compCount}">
    <textarea placeholder="Company Description" id="compDesc${compCount}"></textarea>
  `;
  document.getElementById("companyContainer").appendChild(div);
  compCount++;
}

function generateCV() {
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const guardian = document.getElementById("guardian").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const github = document.getElementById("github").value;
  const profile = document.getElementById("profile").value;
  const hobbies = document.getElementById("hobbies").value;
  const skills = document.getElementById("skills").value;
  const languages = document.getElementById("languages").value;
  const photoInput = document.getElementById("photoInput").files[0];

  let eduHTML = "";
  for (let i = 0; i < eduCount; i++) {
    const degree = document.getElementById(`eduDegree${i}`).value;
    const dates = document.getElementById(`eduDates${i}`).value;
    const loc = document.getElementById(`eduLoc${i}`).value;
    const grade = document.getElementById(`eduGrade${i}`).value;
    eduHTML += `<p><strong>${degree}</strong> (${dates})<br>${loc}<br>Grade: ${grade}</p>`;
  }

  let projHTML = "";
  for (let i = 0; i < projCount; i++) {
    const title = document.getElementById(`projTitle${i}`).value;
    const link = document.getElementById(`projLink${i}`).value;
    const desc = document.getElementById(`projDesc${i}`).value;
    if (title) {
      projHTML += `<p><strong><a href="${link}" target="_blank">${title}</a></strong><br>${desc}</p>`;
    }
  }

  let compHTML = "";
  for (let i = 0; i < compCount; i++) {
    const title = document.getElementById(`compTitle${i}`).value;
    const dates = document.getElementById(`compDates${i}`).value;
    const desc = document.getElementById(`compDesc${i}`).value;
    if (title) {
      compHTML += `<p><strong>${title}</strong> (${dates})<br>${desc}</p>`;
    }
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const imageUrl = reader.result;

    document.getElementById("resumePreview").innerHTML = `
      <div class="cv-template">
        <div class="cv-left">
          <img src="${imageUrl}" alt="Photo">
          <h2>${name}</h2>
          <h4>${title}</h4>
          <p><strong>Guardian:</strong> ${guardian}</p>
          <p>${email}<br>${phone}<br>${address}<br>GitHub: ${github}</p>
          <h3>Skills</h3><p>${skills}</p>
          <h3>Languages</h3><p>${languages}</p>
          <h3>Hobbies</h3><p>${hobbies}</p>
        </div>
        <div class="cv-right">
          <h2>Profile</h2>
          <p>${profile}</p>
          <h2>Education</h2>
          ${eduHTML}
          ${projHTML ? `<h2>Projects</h2>${projHTML}` : ""}
          ${compHTML ? `<h2>Experience</h2>${compHTML}` : ""}
        </div>
      </div>
    `;
  };

  if (photoInput) {
    reader.readAsDataURL(photoInput);
  }
}

function downloadPDF() {
  window.print();
}
