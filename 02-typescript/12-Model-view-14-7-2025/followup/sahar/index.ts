interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
}

const sahar: Student = {
  id: 1,
  firstName: "sahar",
  lastName: "shabat",
  age: 27,
  city: "holon",
};
const sahar2: Student = {
  id: 2,
  firstName: "sahar2",
  lastName: "shabat2",
  age: 227,
  city: "holon",
};

function htmlStudentTest(student: Student): string {
  return `<div class="sahar">the id is: ${student.id} <br/>
  the full name is: ${student.firstName} ${student.lastName}<br/>
  <h1>the age is: ${student.age}</h1> <br/>
  living in: ${student.city} </div>`;
}

function xxStudent(student: Student): void {
  try{
  const exp = document.getElementById("expl");
  if (!exp)throw new Error ("eerrrr")
  exp.innerHTML = htmlStudentTest(student);
  }
  catch(error){
console.error("eeeee")
  }

}

function xxStudent2(student: Student): void {
  try{
  const exp = document.getElementById("expl2");
  if (!exp)throw new Error ("eerrrr")
  exp.innerHTML = htmlStudentTest(student);
  }
  catch(error){
console.error("eeeee")
  }

}
xxStudent(sahar);
xxStudent2(sahar);
