//Data

interface Student {
  id: number;
  name: string;
  scores: Array<number>;
  imageUrl?: string; // Optional property for image URL
}

const aardvark: Student = {
  id: 1,
  name: "Aardvark",
  scores: [90, 80, 85, 98],
  imageUrl: "./Animal.jpg", // Example image URL
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
            <p>Average Score: ${student.scores}</p>
        </div>
    `;
}

function renderStudents(student: Student): void {
  try {
    const studentRoot = document.getElementById("myDiv");
    if (!studentRoot) throw new Error("studentRoot element not found");

    studentRoot.innerHTML = htmlStudent(student);
  } catch (error) {
    console.error("Error rendering student:", error);
  }
}

renderStudents(aardvark);
