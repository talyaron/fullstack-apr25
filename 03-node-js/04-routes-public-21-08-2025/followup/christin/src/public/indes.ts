async function main(){
    try {
        const studentPassword = await getNumberOfStudents();

        const studentNumberElement = document.getElementById('password');
        if (!studentPNumberElement) throw new Error('Student password element not found');

        studentNumberElement.textContent = studentNumber.toString();
    } catch (error) {
        console.error('Error occurred while fetching student number:', error);
    }
}

main();

interface StudentResponse {
    numberOfStudents: string;
    error?: string;
}

async function getNumberOfStudents():Promise<string> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students'); //get from API (on the internet)

        const data: StudentResponse = await response.json() as StudentResponse; // Parse the JSON response to data object, that was returned from the server

        if (data.error) throw new Error(data.error);

        return data.numberOfStudents;
    } catch (error) {
        console.error('Error occurred while fetching student number:', error);
        throw error;
    }
}   