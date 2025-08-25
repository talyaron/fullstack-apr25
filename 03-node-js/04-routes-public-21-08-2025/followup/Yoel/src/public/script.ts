async function main(){
    try {
        const studentPassword = await getPasswordOfStudents();

        const studentPasswordElement = document.getElementById('password');
        if (!studentPasswordElement) throw new Error('Student password element not found');

        studentPasswordElement.textContent = studentPassword.toString();
    } catch (error) {
        console.error('Error occurred while fetching student password:', error);
    }
}

main();

interface StudentResponse {
    passwordOfStudents: string;
    error?: string;
}

async function getPasswordOfStudents():Promise<string> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students'); //get from API (on the internet)

        const data: StudentResponse = await response.json() as StudentResponse; // Parse the JSON response to data object, that was returned from the server


        if (response.ok) {
            return data.passwordOfStudents;
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
        return ""; 
    }
}