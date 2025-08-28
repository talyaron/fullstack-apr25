// main controller
async function main(){
    try {

        //add event listner on form submit
        const addStudentForm = document.getElementById("add-student");
        if(!addStudentForm) throw new Error("Form element was not found")
        addStudentForm.addEventListener("submit", handleAddStudent)

        //get studnet count from db & render to screen
        const studentCount = await getNumberOfStudents(); //sevice

        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');

        studentCountElement.textContent = studentCount.toString();

        //get average grades from db and render
        const averageGrade = await getStudentsAverage();
        const averageGradeElement = document.getElementById('students-average');
        if (!averageGradeElement) throw new Error('Average grade element not found');
        averageGradeElement.textContent = averageGrade.toString();

        //get all studnets and render
        const students = await getAllStudents();
        if (students.length > 0) {
            renderStudentList(students);
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}

main();

interface StudentResponse {
    numberOfStudents: number;
    error?: string;
}

//controler
async function handleAddStudent(e:SubmitEvent){
    try {
        e.preventDefault();
        console.log(e.target)

        const form = e.target as HTMLFormElement;
        if(!form) throw new Error("Form was not found");

        const formData = new FormData(form);

        const name = formData.get("name");
        const age = formData.get("age");
        const email = formData.get("email");
        const grade = formData.get("grade");
        const imageUrl = formData.get("imageUrl");

        console.log(name, age, grade, email, imageUrl);

       const response = await fetch("http://localhost:3000/students/add-student",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name, age, grade, email, imageUrl})
        })

        const data = await response.json()

        if(!response.ok){
          throw new Error("Error "+ data.error)  
        }

        console.log(data)

        main();


    } catch (error) {
        console.error(error)
    }
}

//services

async function getNumberOfStudents():Promise<number> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students'); //get from API (on the internet) from the server

        const data: StudentResponse = await response.json() as StudentResponse; // Parse the JSON response to data object, that was returned from the server


        if (response.ok) {
            return data.numberOfStudents;
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
        return 0; // Return 0 or handle the error as needed
    }
}

async function getStudentsAverage(): Promise<number> {
    try {
        const response = await fetch('http://localhost:3000/students/students-average');

        const data = await response.json();

        if (response.ok) {
            const averageGrade = data.averageGrade;
            if (averageGrade !== undefined) {
                return averageGrade;
            } else {
                throw new Error('Average grade not found');
            }
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
        return 0; // Return 0 or handle the error as needed
    }
}

interface Student {
    id: string;
    name: string;
    age: number;
    email: string;
    grade:string;
    imageUrl:string;
}

interface StudentsResponse {
    students?: Student[];
    error?: string;
}

async function getAllStudents(): Promise<Student[]> {
    try {
        const response = await fetch('http://localhost:3000/students/get-all-students');

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
            <img src=${student.imageUrl}
            <h2>${student.name}</h2>
            <p>Age: ${student.age}</p>
            <p>Grade ${student.grade}</p>
            <p>Email: ${student.email}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}
