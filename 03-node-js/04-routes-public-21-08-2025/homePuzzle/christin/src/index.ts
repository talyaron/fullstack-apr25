import express from "express";
import { students } from "./model/studentData";
import { Student } from "./model/studentModel";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("./src/public"));

// Helper function to convert letter grades to numeric values
const gradeToNumber = (grade: string): number => {
  switch (grade.toUpperCase()) {
    case 'A': return 90;
    case 'B': return 80;
    case 'C': return 70;
    case 'D': return 60;
    case 'F': return 50;
    default: return 0;
  }
};

// Helper function to convert numeric grade back to letter
const numberToGrade = (num: number): string => {
  if (num >= 90) return 'A';
  if (num >= 80) return 'B';
  if (num >= 70) return 'C';
  if (num >= 60) return 'D';
  return 'F';
};

// API Routes

// Get total number of students
app.get(`/student/get-amount`, (_, res) => {
  try {
    if (!students || students.length === 0) {
      res.status(404).send({ error: "no students found" });
      console.error("no students found");
      return;
    }
    const studentAmount = students.length;
    res.status(200).send({ studentAmount });
  } catch (error) {
    console.error("Error occurred while fetching students count:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Get average grade of all students
app.get(`/student/get-average-grade`, (_, res) => {
  try {
    if (!students || students.length === 0) {
      res.status(404).send({ error: "no students found" });
      console.error("no students found");
      return;
    }
    
    const totalGrade = students.reduce((sum: number, student) => {
      return sum + gradeToNumber(student.grade);
    }, 0);
    
    const averageGrade = (totalGrade / students.length).toFixed(1);
    const averageGradeLetter = numberToGrade(parseFloat(averageGrade));
    
    res.status(200).send({ 
      averageGrade: parseFloat(averageGrade),
      averageGradeLetter,
      message: `Average grade is ${averageGrade} (${averageGradeLetter})`
    });
  } catch (error) {
    console.error("Error occurred while calculating average grade:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Get all students
app.get(`/student/get-students`, (_, res) => {
  try {
    if (!students || students.length === 0) {
      res.status(404).send({ error: "no students found" });
      console.error("no students found");
      return;
    }
    
    res.status(200).send({ students });
  } catch (error) {
    console.error("Error occurred while fetching students:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Get specific student by name
app.get(`/student/get-student/:name`, (req, res) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      res.status(400).send({ error: "student name is required" });
      return;
    }
    
    const student = students.find(s => 
      s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!student) {
      res.status(404).send({ error: "student not found" });
      return;
    }
    
    res.status(200).send({ student });
  } catch (error) {
    console.error("Error occurred while fetching student:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Add new student
app.post(`/student/add-student`, (req, res) => {
  try {
    const { body } = req;
    const { name, age, grade, subjects, img } = body;
    
    if (!name || !age || !grade || !subjects || !img) {
      res.status(400).send({ error: "missing student information" });
      console.error("missing student information");
      return;
    }
    
    // Check if student already exists
    const existingStudent = students.find(s => 
      s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingStudent) {
      res.status(409).send({ error: "student already exists" });
      return;
    }
    
    // Validate grade
    const validGrades = ['A', 'B', 'C', 'D', 'F'];
    if (!validGrades.includes(grade.toUpperCase())) {
      res.status(400).send({ error: "invalid grade. Use A, B, C, D, or F" });
      return;
    }
    
    const newStudent: Student = {
      name,
      age: parseInt(age),
      grade: grade.toUpperCase(),
      subjects: Array.isArray(subjects) ? subjects : [subjects],
      img
    };
    
    students.push(newStudent);
    res.status(201).send({ 
      message: "student added successfully",
      student: newStudent,
      ok: true 
    });
  } catch (error) {
    console.error("Error occurred while adding student: ", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Update student grade
app.put(`/student/update-grade/:name`, (req, res) => {
  try {
    const { name } = req.params;
    const { grade } = req.body;
    
    if (!name || !grade) {
      res.status(400).send({ error: "student name and grade are required" });
      return;
    }
    
    const validGrades = ['A', 'B', 'C', 'D', 'F'];
    if (!validGrades.includes(grade.toUpperCase())) {
      res.status(400).send({ error: "invalid grade. Use A, B, C, D, or F" });
      return;
    }
    
    const studentIndex = students.findIndex(s => 
      s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (studentIndex === -1) {
      res.status(404).send({ error: "student not found" });
      return;
    }
    
    const oldGrade = students[studentIndex].grade;
    students[studentIndex].grade = grade.toUpperCase();
    
    res.status(200).send({
      message: `Grade updated successfully from ${oldGrade} to ${grade.toUpperCase()}`,
      student: students[studentIndex],
      ok: true
    });
  } catch (error) {
    console.error("Error occurred while updating grade:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Get students by grade
app.get(`/student/get-by-grade/:grade`, (req, res) => {
  try {
    const { grade } = req.params;
    
    if (!grade) {
      res.status(400).send({ error: "grade parameter is required" });
      return;
    }
    
    const filteredStudents = students.filter(s => 
      s.grade.toLowerCase() === grade.toLowerCase()
    );
    
    if (filteredStudents.length === 0) {
      res.status(404).send({ error: `no students found with grade ${grade.toUpperCase()}` });
      return;
    }
    
    res.status(200).send({ 
      students: filteredStudents,
      count: filteredStudents.length,
      grade: grade.toUpperCase()
    });
  } catch (error) {
    console.error("Error occurred while fetching students by grade:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Get grade distribution
app.get(`/student/grade-distribution`, (_, res) => {
  try {
    if (!students || students.length === 0) {
      res.status(404).send({ error: "no students found" });
      return;
    }
    
    const distribution = students.reduce((acc: any, student) => {
      const grade = student.grade;
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {});
    
    res.status(200).send({ 
      distribution,
      totalStudents: students.length
    });
  } catch (error) {
    console.error("Error occurred while calculating grade distribution:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

// Delete student
app.delete(`/student/delete/:name`, (req, res) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      res.status(400).send({ error: "student name is required" });
      return;
    }
    
    const studentIndex = students.findIndex(s => 
      s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (studentIndex === -1) {
      res.status(404).send({ error: "student not found" });
      return;
    }
    
    const deletedStudent = students.splice(studentIndex, 1)[0];
    
    res.status(200).send({
      message: `Student ${deletedStudent.name} deleted successfully`,
      deletedStudent,
      ok: true
    });
  } catch (error) {
    console.error("Error occurred while deleting student:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Student Grade Management System initialized`);
  console.log(`👥 Currently managing ${students.length} students`);
});
