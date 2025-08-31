// main controller
async function main(){
    try {
      // Fetch and display the number of students
        const studentCounter = await getNumberOfStudents();
        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');
        studentCountElement.textContent = studentCounter.toString();

        const classAverage = await getClassAverage();
        displayClassAverage(classAverage);

      // Fetch and display all students
        const students = await getAllStudents();
        if (students.length > 0) {
            renderStudentList(students);
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}
 
main();

////////////////
//All services//
////////////////

interface StudentResponse { //for saftey on code
    numberOfStudents: number;
    error?: string;
}

async function getNumberOfStudents():Promise<number> {
  try {
      const response = await fetch('http://localhost:3010/students/number-of-students');

      const data: StudentResponse = await response.json() as StudentResponse; // Parse the JSON response to data object, thatwas returned from the server


      if (response.ok) {
          return data.numberOfStudents;
      } else {
          throw new Error(data.error || 'Unknown error');
      }
  } catch (error) {
      console.error('Error occurred while fetching student count:',error);
      return 0; // Return 0 or handle the error as needed
  }
}
 
///////////////////////
interface Student {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    grade: number;
    averageGrade?: number;
}

interface StudentsResponse {
    students?: Student[];
    error?: string;
}
async function getAllStudents(): Promise<Student[]> {
  try {
    const response = await fetch('http://localhost:3010/students/get-all-students');

    const data: StudentsResponse = await response.json() as StudentsResponse;

    if (response.ok) {

      if (data.students && data.students.length > 0) {
        return data.students;
      } else {
          throw new Error('No students found');
      }
    } else {
        throw new Error(data.error || 'Unknown error');
    }
        } catch (error) {
        console.error('Error occurred while fetching all students:', error);
        return [];
    }
}
//view
function renderStudentList(students: Student[]) {
    const listContainer = document.getElementById('list-of-students');
    if (!listContainer) throw new Error('List container not found');

    // Clear existing content
    listContainer.innerHTML = '';

    // Render each student
    students.forEach(student => {
        const studentElement = document.createElement('div');
        studentElement.className = 'student';
        studentElement.innerHTML = `
            <h2>${student.firstName} ${student.lastName}</h2>
            <p>Age: ${student.age}</p>
            <p>Email: ${student.email}</p>
            <p>Grade: ${student.grade}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}
///////////////////////

interface ClassAverageResponse {
    classAverage?: number;
    error?: string;
}

async function getClassAverage(): Promise<number> {
    try {
        const response = await fetch('http://localhost:3010/students/calculateAverageGrades');
        
        const data: ClassAverageResponse = await response.json() as ClassAverageResponse;
        
        if (response.ok) {
            if (data.classAverage !== undefined) {
                return data.classAverage;
            } else {
                throw new Error('Class average not available');
            }
        } else {
            throw new Error(data.error || 'Unknown error');
        }
        
    } catch (error) {
        console.error('Error occurred while calculating class average:', error);
        return 0; 
    }
}

function displayClassAverage(classAverage: number) {
    const averageContainer = document.getElementById('class-average');
    if (!averageContainer) {
        // אם האלמנט לא קיים, צור אותו
        const container = document.createElement('div');
        container.id = 'class-average';
        container.className = 'class-average-display';
        container.innerHTML = `
            <h2>ממוצע הכיתה</h2>
            <p class="average-score">${classAverage.toFixed(2)}</p>
        `;
        
        // הוסף לתחילת הדף
        const body = document.body;
        body.insertBefore(container, body.firstChild);
    } else {
        // עדכן את הערך הקיים
        const scoreElement = averageContainer.querySelector('.average-score');
        if (scoreElement) {
            scoreElement.textContent = classAverage.toFixed(2);
        }
    }
}