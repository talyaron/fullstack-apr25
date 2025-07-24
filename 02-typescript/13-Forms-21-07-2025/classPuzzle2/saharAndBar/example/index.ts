//Data

interface Student {
  id: number;
  name: string;
  avgScore: number;
  imageUrl?: string; // Optional property for image URL
}

const student: Student = {
  id: 1,
  name: "Amit Reuveni",
  avgScore: 92,
  imageUrl: "./amit.jpeg", // Example image URL
};

//View functions
function htmlStudent(student: Student): string {
  return `
        <div class="student">
            ${
              student.imageUrl
                ? `<img src="${student.imageUrl}" alt="${student.name}" />`
                : ""
            }
            <h2>${student.name}</h2>
            <p>Average Score: ${student.avgScore}</p>
        </div>
    `;
}

function renderStudents(student: Student): void {
  try {
    const studentRoot = document.getElementById("studentRoot");
    if (!studentRoot) throw new Error("studentRoot element not found");

    studentRoot.innerHTML = htmlStudent(student);
  } catch (error) {
    console.error("Error rendering student:", error);
  }
}

function inputUrl(event) {
  try {
    const inputUrlVal = event.target.value;
    console.log(inputUrlVal);
    student.imageUrl = inputUrlVal;
  } catch (error) {}
  renderStudents(student);
}

function inputName(event) {
  try {
    const userNameStudent = event.target.value;
    console.log(userNameStudent);
    student.name = userNameStudent;
    console.log(student.name);
  } catch (error) {}
  renderStudents(student);
}

function inputAvgScore(event) {
  try {
    const userAvgScore = event.target.value;
    console.log(userAvgScore);
    student.avgScore = userAvgScore;
    console.log(student.avgScore);
  } catch (error) {}
  renderStudents(student);
}

renderStudents(student);
