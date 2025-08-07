//Local storage

// This code snippet demonstrates how to use localStorage in TypeScript

//localstorage is a web storage API that allows you to store data in the browser
//local storage remains in the browser even after the page is closed, or the browser is restarted

//sessionStorage is similar to localStorage, but it only lasts for the duration of the page session

// This line is used to retrive an array of students from localStorage
const students: string[] = sessionStorage.getItem("students") ? JSON.parse(sessionStorage.getItem("students")!) : [];

function getStudents():boolean{
    const newStudent = prompt("Enter student name:");
    if (newStudent) {
        students.push(newStudent);
        console.log(`Student ${newStudent} added.`);
        console.log("Current students:", students);
        sessionStorage.setItem("students", JSON.stringify(students));
        return true;
    } else {
        console.log("No student name entered.");
        return false;
    }
}

while (getStudents()) {
    // Loop continues until getStudents returns false
}