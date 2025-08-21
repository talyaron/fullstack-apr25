async function main() {
    try {
        const numberOfStudents = await getNumberOfStudents();

        const studentElement = document.getElementById("students");
        if (!studentElement) {
            throw new Error("Can't find the element")
        } else {
            studentElement.textContent = numberOfStudents.toString();
        }

    } catch (error) {
        console.error(error, "Error, Something went wrong, Can't find number of students");
    }
}

main();


async function getNumberOfStudents() {
    try {
        const respone = await fetch("http://localhost:3000/students");
        const data = await respone.json();

        if (respone.ok) {
            setTimeout(() => {

            }, 4000)
            return data.numberOfStudents;
        } else {
            throw new Error("Error, Something went wrong with the respone");
        }
    } catch (error) {
        console.error("Error, omething went wrong with the function getNumberOfStudents");
    }
}