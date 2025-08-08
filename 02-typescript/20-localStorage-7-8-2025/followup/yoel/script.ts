const student: string[] = localStorage.getItem("student")
  ? JSON.parse(localStorage.getItem("student")!)
  : [];

function getStudent(): boolean {
  const newStudent = prompt("Enter student name :");
  if (newStudent) {
    student.push(newStudent);
    console.log(`${newStudent} has joined`);
    console.log(`There are ${student.length} students registered`);
    localStorage.setItem("student", JSON.stringify(student));
    
    return true;
  } else {
    if (student.length > 0){
    console.log(`Students : ${student}`);
    return false;
    }
    else
    return false;
  }
}

while (getStudent()){//loop//
    }
