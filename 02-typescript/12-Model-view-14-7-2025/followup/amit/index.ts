type Student = {
    id: string,
    name: string,
    age: number,
    avrageScore: number,
    img?: string,
    description?: string,
};

const amit: Student = {
    id: "1",
    name: "Amit Reuveni",
    age: 24,
    avrageScore: 90,
    img: "https://picsum.photos/200/300",
    description: "Top student with high average and passion for learning.",
};


const omer: Student = {
    id: "2",
    name: "Omer Cohen",
    age: 35,
    avrageScore: 92.5,
    img: "https://picsum.photos/400/500",
};





function htmlStudent(student: Student) {
    return `
    <div class="student">
    ${student.img ? `<img src="${student.img}" alt="${student.name}" />` : ""}
    <h2> Name : ${student.name}</h2>
    <p> Age : ${student.age}</p>
    <p> Avrage score : ${student.avrageScore}</p>
    ${student.description ? `<p> Description: ${student.description}</p>` : ""}
    </div>
    `;
}



function newStudent(student: Student) {
    try {
        const greet = document.getElementById("student-root");
        if (!greet) throw new Error;

        greet.innerHTML += htmlStudent(student);

    } catch (error) {
        console.error("Opps, Something went wrong!");
    }
}

newStudent(amit);
newStudent(omer);