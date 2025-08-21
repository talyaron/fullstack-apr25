async function main(){
    try {
        const studentCount = await getNumberOfStudents();

        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');

        studentCountElement.textContent = studentCount.toString();
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}

main();

interface StudentResponse {
    numberOfStudents: number;
    error?: string;
}

async function getNumberOfStudents():Promise<number> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students'); //get from API (on the internet)

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